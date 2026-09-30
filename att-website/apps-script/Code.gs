/**
 * Amortree Leads CRM — Google Apps Script backend.
 *
 * First-time setup:
 *   1. Create a standalone Apps Script project and add Code.gs + CRM.html.
 *   2. Run setupCrm() as the account that should own the CRM spreadsheet.
 *   3. Add staff to the generated "CRM Access" tab.
 *   4. Deploy as a web app, executing as the owner. The CRM UI uses
 *      JSONP RPC; public website leads use doPost().
 *
 * Keep the spreadsheet private. CRM users access it only through this
 * backend, which checks their OTP session and assigned lead on every call.
 */

const CRM = Object.freeze({
  spreadsheetProperty: "AMORTREE_CRM_SPREADSHEET_ID",
  leadsSheet: "Leads",
  accessSheet: "CRM Access",
  eventsSheet: "Events",
  sessionTtlSeconds: 21600,
  otpTtlSeconds: 300,
  otpMaxAttempts: 5,
  otpResendSeconds: 60,
  leadHeaders: [
    "Lead ID", "Created At", "Updated At", "Name", "Email", "Phone",
    "Company", "Website", "Service", "Industry", "Message", "Source", "Page",
    "Status", "Assigned Email", "Assigned Name", "Notes JSON", "Record Key",
  ],
  accessHeaders: ["Email", "Name", "Role", "Enabled"],
  eventHeaders: ["Event ID", "Timestamp", "Event", "Page", "Referrer", "Device", "Visitor ID", "Session ID", "Details JSON"],
  statuses: ["new", "contacted", "qualified", "quoted", "won", "lost"],
});

/** Create a new private spreadsheet and initialize the CRM tabs. */
function setupCrm(spreadsheetId) {
  // Trigger the email scope during the owner's initial authorization flow.
  MailApp.getRemainingDailyQuota();
  const properties = PropertiesService.getScriptProperties();
  const previousId = properties.getProperty(CRM.spreadsheetProperty) || "";
  let id = String(spreadsheetId || previousId || "").trim();
  let spreadsheet = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create("Amortree Leads CRM");
  }
  id = spreadsheet.getId();

  const leads = ensureSheet_(spreadsheet, CRM.leadsSheet, CRM.leadHeaders);
  migrateLeadIds_(leads);
  const access = ensureSheet_(spreadsheet, CRM.accessSheet, CRM.accessHeaders);
  const events = ensureSheet_(spreadsheet, CRM.eventsSheet, CRM.eventHeaders);

  let migratedLeads = 0;
  let migratedEvents = 0;
  if (previousId && previousId !== id) {
    const previous = SpreadsheetApp.openById(previousId);
    migratedLeads = migrateTabRows_(previous, spreadsheet, CRM.leadsSheet, CRM.leadHeaders);
    migratedEvents = migrateTabRows_(previous, spreadsheet, CRM.eventsSheet, CRM.eventHeaders);
    migrateLeadIds_(leads);
  }

  // The script owner is the initial administrator. Add agents in the access tab.
  const ownerEmail = normalizeEmail_(Session.getEffectiveUser().getEmail());
  if (ownerEmail && !findAccessUser_(ownerEmail, access)) {
    access.appendRow([ownerEmail, "CRM Admin", "admin", true]);
  }

  leads.setFrozenRows(1);
  access.setFrozenRows(1);
  events.setFrozenRows(1);
  spreadsheet.setSpreadsheetTimeZone(Session.getScriptTimeZone());
  properties.setProperty(CRM.spreadsheetProperty, id);
  console.log("CRM spreadsheet ready: " + spreadsheet.getUrl() + "; migrated leads=" + migratedLeads + ", events=" + migratedEvents);
  return spreadsheet.getUrl();
}

/** Copy unique rows by header name; the source spreadsheet is left intact. */
function migrateTabRows_(sourceSpreadsheet, targetSpreadsheet, name, targetHeaders) {
  const source = sourceSpreadsheet.getSheetByName(name);
  const target = targetSpreadsheet.getSheetByName(name);
  if (!source || !target || source.getLastRow() < 2) return 0;

  const sourceValues = source.getDataRange().getValues();
  const sourceHeaders = sourceValues[0].map(function (value) { return String(value || "").trim(); });
  const keyHeader = targetHeaders.indexOf("Record Key") >= 0 ? "Record Key" : targetHeaders[0];
  const idColumn = sourceHeaders.indexOf(keyHeader) >= 0 ? sourceHeaders.indexOf(keyHeader) : sourceHeaders.indexOf(targetHeaders[0]);
  if (idColumn < 0) return 0;

  const targetKeyColumn = targetHeaders.indexOf("Record Key") >= 0 ? targetHeaders.indexOf("Record Key") + 1 : 1;
  const targetIds = target.getLastRow() < 2 ? new Set() : new Set(
    target.getRange(2, targetKeyColumn, target.getLastRow() - 1, 1).getValues().map(function (row) { return String(row[0] || ""); })
  );
  const additions = sourceValues.slice(1).filter(function (row) {
    const rowId = String(row[idColumn] || "");
    if (!rowId || targetIds.has(rowId)) return false;
    targetIds.add(rowId);
    return true;
  }).map(function (sourceRow) {
    return targetHeaders.map(function (header) {
      const sourceColumn = sourceHeaders.indexOf(header);
      return sourceColumn < 0 ? "" : sourceRow[sourceColumn];
    });
  });

  if (additions.length) target.getRange(target.getLastRow() + 1, 1, additions.length, targetHeaders.length).setValues(additions);
  return additions.length;
}

/** Website intake endpoint. Public by design; CRM read/write actions are not. */
function doPost(e) {
  try {
    const body = parsePostBody_(e);
    if (body.honeypot) return jsonOutput_({ ok: true });

    if (body.action === "crm_rpc") {
      return jsonOutput_({ ok: true, result: dispatchCrmRpc_(body.method, body.args || []) });
    }

    if (body.action === "lead_upsert") {
      const lead = upsertPublicLead_(body);
      return jsonOutput_({ ok: true, leadId: lead.leadId });
    }
    if (body.action === "event_append") {
      appendPublicEvent_(body);
      return jsonOutput_({ ok: true });
    }
    return jsonOutput_({ ok: false, message: "Unsupported public action." });
  } catch (error) {
    console.error("CRM intake error", error);
    return jsonOutput_({ ok: false, message: "Could not save this submission." });
  }
}

/** Serve the private CRM interface. */
function doGet(e) {
  if (e && e.parameter && e.parameter.api === "crm") return handleCrmJsonp_(e.parameter);
  return HtmlService.createHtmlOutputFromFile("CRM")
    .setTitle("Amortree Leads CRM")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

/** JSONP transport for the Vue CRM route (Apps Script does not expose CORS headers). */
function handleCrmJsonp_(params) {
  const callback = String(params.callback || "");
  if (!/^__amortreeCrm_[A-Za-z0-9_]{1,64}$/.test(callback)) {
    return ContentService.createTextOutput("/* Invalid CRM callback. */").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  try {
    const args = JSON.parse(params.args || "[]");
    if (!Array.isArray(args)) throw new Error("Invalid CRM request.");
    const result = dispatchCrmRpc_(String(params.method || ""), args);
    return jsonpOutput_(callback, { ok: true, result: result });
  } catch (error) {
    return jsonpOutput_(callback, { ok: false, error: String(error && error.message || "CRM request failed.") });
  }
}

/** Only expose the authenticated CRM methods through the cross-origin transport. */
function dispatchCrmRpc_(method, args) {
  if (!Array.isArray(args)) throw new Error("Invalid CRM request.");
  switch (method) {
    case "requestCrmOtp": return requestCrmOtp(args[0]);
    case "verifyCrmOtp": return verifyCrmOtp(args[0], args[1]);
    case "getCrmData": return getCrmData(args[0]);
    case "updateCrmLead": return updateCrmLead(args[0], args[1]);
    case "importCrmLeads": return importCrmLeads(args[0], args[1]);
    case "checkPublicLeadReceipt": return checkPublicLeadReceipt_(args[0]);
    default: throw new Error("Unsupported CRM request.");
  }
}

/** Confirm a public submission without returning its personal data. */
function checkPublicLeadReceipt_(leadId) {
  leadId = String(leadId || "");
  if (!/^[A-Za-z0-9_-]{16,120}$/.test(leadId)) throw new Error("Invalid lead receipt.");
  return { received: Boolean(findLeadRow_(getSheet_(CRM.leadsSheet), leadId)) };
}

function jsonpOutput_(callback, value) {
  return ContentService.createTextOutput(callback + "(" + JSON.stringify(value) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

/** Send a short-lived login code only to enabled users on CRM Access. */
function requestCrmOtp(email) {
  email = normalizeEmail_(email);
  const user = findAccessUser_(email);
  if (!user || !user.enabled) return { ok: false, message: "That email is not enabled for CRM access." };

  const cache = CacheService.getScriptCache();
  const key = "crm_otp_" + digest_(email);
  if (cache.get(key + "_cooldown")) return { ok: false, message: "Please wait a minute before requesting another code." };

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  cache.put(key, JSON.stringify({ hash: digest_(email + ":" + otp), attempts: 0 }), CRM.otpTtlSeconds);
  cache.put(key + "_cooldown", "1", CRM.otpResendSeconds);
  MailApp.sendEmail({
    to: email,
    subject: "Your Amortree CRM sign-in code",
    body: "Your Amortree CRM verification code is " + otp + ". It expires in 5 minutes. If you did not request it, you can ignore this email.",
    name: "Amortree CRM",
  });
  return { ok: true, message: "A verification code has been sent." };
}

/** Verify a one-time code and create a server-side session token. */
function verifyCrmOtp(email, otp) {
  email = normalizeEmail_(email);
  otp = String(otp || "").trim();
  const user = findAccessUser_(email);
  if (!user || !user.enabled) return { ok: false, message: "That email is not enabled for CRM access." };

  const cache = CacheService.getScriptCache();
  const key = "crm_otp_" + digest_(email);
  const stored = cache.get(key);
  if (!stored) return { ok: false, message: "That code has expired. Request a new one." };

  const record = JSON.parse(stored);
  if (record.attempts >= CRM.otpMaxAttempts) {
    cache.remove(key);
    return { ok: false, message: "Too many attempts. Request a new code." };
  }
  if (record.hash !== digest_(email + ":" + otp)) {
    record.attempts += 1;
    cache.put(key, JSON.stringify(record), CRM.otpTtlSeconds);
    return { ok: false, message: "Incorrect code. Check the email and try again." };
  }

  cache.remove(key);
  const token = Utilities.getUuid() + Utilities.getUuid();
  const session = { email: user.email, name: user.name, role: user.role, issuedAt: Date.now() };
  cache.put(sessionCacheKey_(token), JSON.stringify(session), CRM.sessionTtlSeconds);
  return { ok: true, token: token, user: { email: user.email, name: user.name, role: user.role } };
}

/** Return only the leads this authenticated user is allowed to see. */
function getCrmData(token) {
  const session = requireSession_(token);
  const leads = readLeads_().filter(function (lead) {
    return session.role === "admin" || normalizeEmail_(lead.assignedEmail) === session.email;
  });
  const response = { ok: true, user: session, leads: leads };
  if (session.role === "admin") {
    response.users = readEnabledUsers_();
    response.spreadsheetUrl = getSpreadsheet_().getUrl();
  }
  return response;
}

/** Update status, assignment, or notes with server-side authorization. */
function updateCrmLead(token, request) {
  const session = requireSession_(token);
  request = request || {};
  const leadId = String(request.leadId || "").trim();
  if (!leadId) throw new Error("A lead ID is required.");

  return withScriptLock_(function () {
    const sheet = getSheet_(CRM.leadsSheet);
    const row = findLeadRow_(sheet, leadId);
    if (!row) throw new Error("This lead no longer exists.");
    const current = leadFromRow_(sheet, row);
    assertCanAccessLead_(session, current);

    if (request.action === "status") {
      const status = String(request.status || "").toLowerCase();
      if (CRM.statuses.indexOf(status) === -1) throw new Error("Invalid lead status.");
      sheet.getRange(row, CRM.leadHeaders.indexOf("Status") + 1).setValue(status);
    } else if (request.action === "assign") {
      requireAdmin_(session);
      const assignedEmail = normalizeEmail_(request.assignedEmail);
      if (assignedEmail) {
        const assignee = findAccessUser_(assignedEmail);
        if (!assignee || !assignee.enabled || ["agent", "admin"].indexOf(assignee.role) === -1) {
          throw new Error("Choose an enabled CRM user.");
        }
        sheet.getRange(row, CRM.leadHeaders.indexOf("Assigned Email") + 1, 1, 2).setValues([[assignee.email, assignee.name]]);
      } else {
        sheet.getRange(row, CRM.leadHeaders.indexOf("Assigned Email") + 1, 1, 2).clearContent();
      }
    } else if (request.action === "note") {
      const text = String(request.text || "").trim().slice(0, 4000);
      if (!text) throw new Error("Write a note before saving.");
      const notes = current.notes || [];
      notes.push({ text: text, author: session.name || session.email, email: session.email, createdAt: new Date().toISOString() });
      sheet.getRange(row, CRM.leadHeaders.indexOf("Notes JSON") + 1).setValue(JSON.stringify(notes));
    } else {
      throw new Error("Unsupported lead update.");
    }

    sheet.getRange(row, 3).setValue(new Date());
    return { ok: true };
  });
}

/** Admin-only CSV/JSON import; normalizes imported rows into the Leads tab. */
function importCrmLeads(token, rows) {
  const session = requireSession_(token);
  requireAdmin_(session);
  if (!Array.isArray(rows) || rows.length > 500) throw new Error("Import up to 500 lead rows at a time.");
  let imported = 0;
  rows.forEach(function (row) {
    if (!row || !(row.name || row.email || row.phone)) return;
    upsertPublicLead_(Object.assign({}, row, {
      leadId: row.recordKey || row.leadId || row.id || "import-" + Utilities.getUuid(),
      source: row.source || "import",
    }));
    imported += 1;
  });
  return { ok: true, imported: imported };
}

function upsertPublicLead_(body) {
  const lead = {
    leadId: clean_(body.recordKey || body.leadId, 120) || "lead-" + Utilities.getUuid(),
    createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
    name: clean_(body.name || body.fullName, 180),
    email: clean_(body.email, 240).toLowerCase(),
    phone: clean_(body.phone || body.phoneNumber, 80),
    company: clean_(body.company || body.companyName, 180),
    website: clean_(body.website || body.companyWebsite, 500),
    service: clean_(body.service || body.interest || body.serviceLabel, 300),
    industry: clean_(body.industry, 180),
    message: clean_(body.message, 8000),
    source: clean_(body.source, 100) || "website",
    page: clean_(body.page, 500),
    status: CRM.statuses.indexOf(String(body.status || "new").toLowerCase()) >= 0 ? String(body.status || "new").toLowerCase() : "new",
  };
  if (!lead.name && !lead.email && !lead.phone) throw new Error("A name, email, or phone number is required.");

  return withScriptLock_(function () {
    const sheet = getSheet_(CRM.leadsSheet);
    const existingRow = findLeadRow_(sheet, lead.leadId);
    if (existingRow) {
      const existing = leadFromRow_(sheet, existingRow);
      const createdAt = existing.createdAt || lead.createdAt.toISOString();
      const next = [
        existing.displayId || nextLeadDisplayId_(sheet), createdAt, new Date(), lead.name || existing.name,
        lead.email || existing.email, lead.phone || existing.phone,
        lead.company || existing.company, lead.website || existing.website,
        lead.service || existing.service, lead.industry || existing.industry, lead.message || existing.message,
        lead.source || existing.source, lead.page || existing.page,
        existing.status || lead.status, existing.assignedEmail || "",
        existing.assignedName || "", JSON.stringify(existing.notes || []), lead.leadId,
      ];
      sheet.getRange(existingRow, 1, 1, next.length).setValues([next]);
    } else {
      sheet.appendRow([
        nextLeadDisplayId_(sheet), lead.createdAt, new Date(), lead.name, lead.email,
        lead.phone, lead.company, lead.website, lead.service, lead.industry, lead.message,
        lead.source, lead.page, lead.status, "", "", "[]", lead.leadId,
      ]);
    }
    return { leadId: lead.leadId, displayId: existingRow ? leadFromRow_(sheet, existingRow).displayId : sheet.getRange(sheet.getLastRow(), 1).getValue() };
  });
}

function appendPublicEvent_(body) {
  const allowed = ["whatsapp_click", "booking_click", "open_modal"];
  const event = clean_(body.event, 80);
  if (allowed.indexOf(event) === -1) return;
  withScriptLock_(function () {
    getSheet_(CRM.eventsSheet).appendRow([
      "event-" + Utilities.getUuid(), new Date(), event,
      clean_(body.page, 500), clean_(body.referrer, 1000),
      clean_(body.device, 30), clean_(body.visitor_id || body.visitorId, 120),
      clean_(body.session_id || body.sessionId, 120), JSON.stringify(body.meta || body.details || {}),
    ]);
  });
}

function readLeads_() {
  const sheet = getSheet_(CRM.leadsSheet);
  const values = sheet.getDataRange().getValues();
  return values.slice(1).filter(function (row) { return row[0]; }).map(function (row) { return leadFromValues_(row); });
}

function leadFromRow_(sheet, rowNumber) { return leadFromValues_(sheet.getRange(rowNumber, 1, 1, CRM.leadHeaders.length).getValues()[0]); }

function leadFromValues_(row) {
  let notes = [];
  try { notes = JSON.parse(row[16] || "[]"); } catch (ignore) { notes = []; }
  return {
    leadId: String(row[CRM.leadHeaders.indexOf("Record Key")] || row[0] || ""),
    displayId: String(row[0] || ""), createdAt: toIso_(row[1]), updatedAt: toIso_(row[2]),
    name: String(row[3] || ""), email: String(row[4] || ""), phone: String(row[5] || ""),
    company: String(row[6] || ""), website: String(row[7] || ""), service: String(row[8] || ""),
    industry: String(row[9] || ""), message: String(row[10] || ""), source: String(row[11] || ""), page: String(row[12] || ""),
    status: String(row[13] || "new"), assignedEmail: String(row[14] || ""),
    assignedName: String(row[15] || ""), notes: notes,
  };
}

function findLeadRow_(sheet, leadId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const keyColumn = CRM.leadHeaders.indexOf("Record Key") + 1;
  const match = sheet.getRange(2, keyColumn, lastRow - 1, 1).createTextFinder(leadId).matchEntireCell(true).findNext();
  if (match) return match.getRow();
  // Keep old workbooks usable until setupCrm() adds and populates Record Key.
  const legacyMatch = sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(leadId).matchEntireCell(true).findNext();
  return legacyMatch ? legacyMatch.getRow() : 0;
}

/** Preserve the opaque key used by forms and assign a readable #lattNN ID. */
function migrateLeadIds_(sheet) {
  const keyColumn = CRM.leadHeaders.indexOf("Record Key") + 1;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const range = sheet.getRange(2, 1, lastRow - 1, CRM.leadHeaders.length);
  const rows = range.getValues();
  let next = rows.reduce(function (max, row) {
    const match = String(row[0] || "").match(/^#latt(\d+)$/i);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  let changed = false;
  rows.forEach(function (row) {
    if (!row[0]) return;
    if (!row[keyColumn - 1]) row[keyColumn - 1] = String(row[0]);
    if (!/^#latt\d+$/i.test(String(row[0]))) {
      next += 1;
      row[0] = "#latt" + String(next).padStart(2, "0");
      changed = true;
    }
  });
  if (changed || rows.some(function (row) { return row[keyColumn - 1]; })) range.setValues(rows);
}

/** Called while the script lock is held so two submissions cannot share an ID. */
function nextLeadDisplayId_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "#latt01";
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  const max = ids.reduce(function (value, row) {
    const match = String(row[0] || "").match(/^#latt(\d+)$/i);
    return match ? Math.max(value, Number(match[1])) : value;
  }, 0);
  return "#latt" + String(max + 1).padStart(2, "0");
}

function readEnabledUsers_() {
  const sheet = getSheet_(CRM.accessSheet);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, CRM.accessHeaders.length).getValues()
    .map(function (row) { return { email: normalizeEmail_(row[0]), name: String(row[1] || row[0] || ""), role: normalizeRole_(row[2]), enabled: isEnabled_(row[3]) }; })
    .filter(function (user) { return user.email && user.enabled; });
}

function findAccessUser_(email, optionalSheet) {
  email = normalizeEmail_(email);
  if (!email) return null;
  const sheet = optionalSheet || getSheet_(CRM.accessSheet);
  if (sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, CRM.accessHeaders.length).getValues();
  for (let i = 0; i < rows.length; i += 1) {
    if (normalizeEmail_(rows[i][0]) === email) {
      return { email: email, name: String(rows[i][1] || email), role: normalizeRole_(rows[i][2]), enabled: isEnabled_(rows[i][3]) };
    }
  }
  return null;
}

function requireSession_(token) {
  token = String(token || "");
  if (!token || token.length > 200) throw new Error("Your CRM session expired. Sign in again.");
  const cached = CacheService.getScriptCache().get(sessionCacheKey_(token));
  if (!cached) throw new Error("Your CRM session expired. Sign in again.");
  const session = JSON.parse(cached);
  const user = findAccessUser_(session.email);
  if (!user || !user.enabled) {
    CacheService.getScriptCache().remove(sessionCacheKey_(token));
    throw new Error("Your CRM access has been disabled.");
  }
  return { email: user.email, name: user.name, role: user.role };
}

function assertCanAccessLead_(session, lead) {
  if (session.role === "admin") return;
  if (normalizeEmail_(lead.assignedEmail) !== session.email) throw new Error("You can only access leads assigned to you.");
}

function requireAdmin_(session) { if (session.role !== "admin") throw new Error("Only CRM admins can do that."); }
function normalizeRole_(value) { return String(value || "agent").toLowerCase().trim() === "admin" ? "admin" : "agent"; }
function isEnabled_(value) { return value === true || String(value).toLowerCase().trim() === "true" || String(value).toLowerCase().trim() === "yes" || String(value).trim() === "1"; }
function normalizeEmail_(value) { return String(value || "").trim().toLowerCase(); }
function sessionCacheKey_(token) { return "crm_session_" + digest_(token); }
function digest_(text) { return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text), Utilities.Charset.UTF_8)); }
function clean_(value, maxLength) { return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, maxLength); }
function toIso_(value) { return value instanceof Date ? value.toISOString() : String(value || ""); }
function parsePostBody_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
  if (!raw || raw.length > 50000) throw new Error("Empty or oversized request.");
  return JSON.parse(raw);
}
function jsonOutput_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty(CRM.spreadsheetProperty);
  if (!id) throw new Error("CRM is not initialized. Run setupCrm() first.");
  return SpreadsheetApp.openById(id);
}
function getSheet_(name) {
  const sheet = getSpreadsheet_().getSheetByName(name);
  if (!sheet) throw new Error("Missing CRM tab: " + name + ". Run setupCrm() again.");
  return sheet;
}
function ensureSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  else sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e4c535").setFontColor("#151515");
  return sheet;
}
function withScriptLock_(callback) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { return callback(); } finally { lock.releaseLock(); }
}
