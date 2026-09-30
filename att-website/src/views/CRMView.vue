<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const endpoint = (import.meta.env.VITE_CRM_WEB_APP_URL || "").trim();
const loginEmail = ref(sessionStorage.getItem("amt_crm_email") || "");
const otp = ref("");
const token = ref(sessionStorage.getItem("amt_crm_token") || "");
const user = ref(null);
const leads = ref([]);
const users = ref([]);
const spreadsheetUrl = ref("");
const selectedId = ref("");
const search = ref("");
const statusFilter = ref("all");
const editedStatus = ref("new");
const editedAssignee = ref("");
const noteText = ref("");
const busy = ref(false);
const hasLoadedLeads = ref(false);
const loginStep = ref("email");
const message = ref("");
const detailMessage = ref("");
const csvInput = ref(null);
const loginMode = computed(() => !token.value || !user.value);

const filteredLeads = computed(() => {
  const query = search.value.trim().toLowerCase();
  return leads.value.filter((lead) => {
    const matchesStatus = statusFilter.value === "all" || lead.status === statusFilter.value;
    const matchesQuery = !query || [lead.name, lead.email, lead.phone, lead.company, lead.website, lead.service, lead.industry, lead.source]
      .join(" ").toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
});
const selectedLead = computed(() => leads.value.find((lead) => lead.leadId === selectedId.value) || null);
const needsFollowUp = computed(() => leads.value.filter((lead) => ["new", "contacted"].includes(lead.status)).length);
const qualifiedCount = computed(() => leads.value.filter((lead) => lead.status === "qualified").length);
const wonCount = computed(() => leads.value.filter((lead) => lead.status === "won").length);

watch(selectedLead, (lead) => {
  if (!lead) return;
  editedStatus.value = lead.status;
  editedAssignee.value = lead.assignedEmail || "";
  detailMessage.value = "";
});

const pendingCalls = new Map();
let callbackSequence = 0;
function callBackend(method, ...args) {
  if (!endpoint) return Promise.reject(new Error("The CRM Apps Script URL is not configured."));
  return new Promise((resolve, reject) => {
    const callback = `__amortreeCrm_${Date.now()}_${callbackSequence += 1}`;
    const script = document.createElement("script");
    let expired = false;
    let cleanupTimer = 0;
    const cleanup = () => {
      window.clearTimeout(timeout);
      window.clearTimeout(cleanupTimer);
      script.remove();
      delete window[callback];
    };
    const timeout = window.setTimeout(() => {
      if (!pendingCalls.has(callback)) return;
      pendingCalls.delete(callback);
      expired = true;
      // Keep a temporary no-op global so a late Apps Script response cannot
      // throw a ReferenceError after this request has already timed out.
      window[callback] = () => cleanup();
      cleanupTimer = window.setTimeout(cleanup, 60000);
      reject(new Error("Apps Script did not respond within 45 seconds. Check the Apps Script project's Executions for this request, then retry."));
    }, 45000);
    const call = { resolve, reject, timeout, script, callback };
    pendingCalls.set(callback, call);
    const finish = (error, value) => {
      if (expired) { cleanup(); return; }
      if (!pendingCalls.has(callback)) return;
      pendingCalls.delete(callback);
      cleanup();
      if (error) reject(error); else resolve(value);
    };
    window[callback] = (payload) => {
      if (!payload?.ok) return finish(new Error(payload?.error || "CRM request failed."));
      finish(null, payload.result);
    };
    script.onerror = () => finish(new Error("Could not reach the CRM service. Check the Apps Script deployment URL and access setting."));
    const url = new URL(endpoint);
    url.searchParams.set("api", "crm");
    url.searchParams.set("method", method);
    url.searchParams.set("args", JSON.stringify(args));
    url.searchParams.set("callback", callback);
    url.searchParams.set("_", String(Date.now()));
    script.src = url.toString();
    document.head.appendChild(script);
  });
}

async function postBackend(method, ...args) {
  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action: "crm_rpc", method, args }),
  });
}

async function sendCode() {
  message.value = "";
  const email = loginEmail.value.trim().toLowerCase();
  if (!email) { message.value = "Enter your work email address."; return; }
  busy.value = true;
  try {
    const result = await callBackend("requestCrmOtp", email);
    if (!result.ok) throw new Error(result.message);
    loginEmail.value = email;
    sessionStorage.setItem("amt_crm_email", email);
    loginStep.value = "otp";
    message.value = result.message;
  } catch (error) { message.value = error.message; }
  finally { busy.value = false; }
}

async function verifyCode() {
  message.value = "";
  busy.value = true;
  try {
    const result = await callBackend("verifyCrmOtp", loginEmail.value.trim().toLowerCase(), otp.value.trim());
    if (!result.ok) throw new Error(result.message);
    token.value = result.token;
    user.value = result.user;
    sessionStorage.setItem("amt_crm_token", result.token);
    await refreshLeads();
  } catch (error) { message.value = error.message; }
  finally { busy.value = false; }
}

async function refreshLeads() {
  if (!token.value) return;
  busy.value = true;
  message.value = "";
  try {
    const result = await callBackend("getCrmData", token.value);
    user.value = result.user;
    leads.value = result.leads || [];
    hasLoadedLeads.value = true;
    users.value = result.users || [];
    spreadsheetUrl.value = result.spreadsheetUrl || "";
    if (!leads.value.some((lead) => lead.leadId === selectedId.value)) selectedId.value = filteredLeads.value[0]?.leadId || leads.value[0]?.leadId || "";
  } catch (error) {
    if (/session expired|access has been disabled/i.test(error.message)) signOut();
    message.value = error.message;
  } finally { busy.value = false; }
}

async function saveLead() {
  if (!selectedLead.value) return;
  detailMessage.value = "";
  busy.value = true;
  try {
    await callBackend("updateCrmLead", token.value, { leadId: selectedId.value, action: "status", status: editedStatus.value });
    if (user.value.role === "admin") {
      await callBackend("updateCrmLead", token.value, { leadId: selectedId.value, action: "assign", assignedEmail: editedAssignee.value });
    }
    await refreshLeads();
    detailMessage.value = "Changes saved.";
  } catch (error) { detailMessage.value = error.message; }
  finally { busy.value = false; }
}

async function addNote() {
  if (!selectedLead.value || !noteText.value.trim()) return;
  detailMessage.value = "";
  busy.value = true;
  try {
    await callBackend("updateCrmLead", token.value, { leadId: selectedId.value, action: "note", text: noteText.value.trim() });
    noteText.value = "";
    await refreshLeads();
    detailMessage.value = "Note added.";
  } catch (error) { detailMessage.value = error.message; }
  finally { busy.value = false; }
}

function signOut() {
  token.value = "";
  user.value = null;
  leads.value = [];
  users.value = [];
  selectedId.value = "";
  otp.value = "";
  loginStep.value = "email";
  sessionStorage.removeItem("amt_crm_token");
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const parseLine = (line) => {
    const values = []; let value = ""; let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"' && quoted && line[i + 1] === '"') { value += '"'; i += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === "," && !quoted) { values.push(value); value = ""; }
      else value += char;
    }
    values.push(value); return values;
  };
  const keys = parseLine(lines.shift()).map((key) => key.trim().toLowerCase().replace(/[^a-z0-9]+/g, ""));
  return lines.map((line) => {
    const values = parseLine(line); const row = {};
    keys.forEach((key, index) => { row[key] = values[index] || ""; });
    return {
      name: row.name || row.fullname, email: row.email, phone: row.phone || row.phonenumber,
      company: row.company || row.companyname, website: row.website || row.companywebsite,
      service: row.service || row.interest, industry: row.industry, message: row.message || row.notes,
      source: row.source || "CSV import",
    };
  }).filter((row) => row.name || row.email || row.phone);
}

async function importCsv(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  busy.value = true;
  message.value = "";
  try {
    const rows = parseCsv(await file.text());
    if (!rows.length) throw new Error("No lead rows found. Check the CSV header and try again.");
    await postBackend("importCrmLeads", token.value, rows);
    await refreshLeads();
    message.value = `Import submitted (${rows.length} rows). Review the lead list to confirm.`;
  } catch (error) { message.value = error.message; }
  finally { busy.value = false; event.target.value = ""; }
}

onMounted(() => {
  if (token.value) {
    user.value = { email: loginEmail.value, name: loginEmail.value, role: "" };
    refreshLeads();
  }
});
onBeforeUnmount(() => {
  pendingCalls.forEach(({ reject, timeout, script, callback }) => {
    window.clearTimeout(timeout);
    // Apps Script can finish after navigation; retain a short-lived sink for
    // the JSONP callback so a late response does not throw in the console.
    window[callback] = () => {
      script.remove();
      delete window[callback];
    };
    window.setTimeout(() => {
      script.remove();
      delete window[callback];
    }, 60000);
    reject(new Error("CRM page closed."));
  });
  pendingCalls.clear();
});
</script>

<template>
  <main class="crm-page">
    <section v-if="!endpoint" class="auth-wrap">
      <div class="panel auth"><div class="brand"><span class="mark">✳</span> amortree <span class="eyebrow">CRM</span></div><h1>CRM setup needed.</h1><p>Set <code>VITE_CRM_WEB_APP_URL</code> to your deployed Apps Script <code>/exec</code> URL, then rebuild the site.</p><RouterLink class="back-link" to="/">Back to Amortree</RouterLink></div>
    </section>
    <section v-else-if="loginMode" class="auth-wrap">
      <form class="panel auth" @submit.prevent="loginStep === 'email' ? sendCode() : verifyCode()">
        <div class="brand"><span class="mark">✳</span> amortree <span class="eyebrow">CRM</span></div>
        <p class="eyebrow auth-eyebrow">Secure follow-up workspace</p><h1>{{ loginStep === 'email' ? 'Good to see you.' : 'Check your inbox.' }}</h1>
        <p>{{ loginStep === 'email' ? 'Sign in with the email address enabled by your CRM administrator.' : `Enter the six-digit code sent to ${loginEmail}.` }}</p>
        <template v-if="loginStep === 'email'"><label class="field-label" for="crm-email">Work email</label><input id="crm-email" v-model="loginEmail" class="field" type="email" autocomplete="email" placeholder="you@company.com" required></template>
        <template v-else><label class="field-label" for="crm-otp">Six-digit code</label><input id="crm-otp" v-model="otp" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="000000" required></template>
        <button class="primary full" type="submit" :disabled="busy">{{ busy ? 'Please wait…' : loginStep === 'email' ? 'Send sign-in code' : 'Verify and continue' }}</button>
        <button v-if="loginStep === 'otp'" class="text-button" type="button" @click="loginStep = 'email'; message = ''">Use a different email</button>
        <p class="message" aria-live="polite">{{ message }}</p>
      </form>
    </section>
    <div v-else class="shell">
      <header class="topbar"><div class="brand"><span class="mark">✳</span> amortree <span class="eyebrow">CRM</span></div><div class="top-actions"><a v-if="user?.role === 'admin' && spreadsheetUrl" class="quiet sheet-link" :href="spreadsheetUrl" target="_blank" rel="noopener">Open connected sheet ↗</a><span class="user-chip">{{ user?.name || user?.email }} · {{ user?.role }}</span><button class="quiet" type="button" :disabled="busy" @click="refreshLeads">↻ Refresh</button><button class="quiet" type="button" @click="signOut">Sign out</button></div></header>
      <div class="eyebrow">Follow-up workspace</div><h1 class="heading">Leads, in good hands.</h1><p class="sub">Keep every enquiry moving, with clear ownership and next steps.</p>
      <div class="cards"><div class="stat"><label>Visible leads</label><strong>{{ hasLoadedLeads ? leads.length : '—' }}</strong></div><div class="stat"><label>Need follow-up</label><strong>{{ hasLoadedLeads ? needsFollowUp : '—' }}</strong></div><div class="stat"><label>Qualified</label><strong>{{ hasLoadedLeads ? qualifiedCount : '—' }}</strong></div><div class="stat"><label>Won</label><strong>{{ hasLoadedLeads ? wonCount : '—' }}</strong></div></div>
      <div class="toolbar"><input v-model="search" class="field search" placeholder="Search name, company, email or phone…"><select v-model="statusFilter" class="field"><option value="all">All statuses</option><option v-for="status in ['new','contacted','qualified','quoted','won','lost']" :key="status" :value="status">{{ status }}</option></select><button v-if="user?.role === 'admin'" class="quiet" type="button" @click="csvInput?.click()">Import CSV</button><input ref="csvInput" class="hidden" type="file" accept=".csv,text/csv" @change="importCsv"></div>
      <div class="layout"><section class="panel"><div class="panel-head"><h2>Lead pipeline</h2><span class="count">{{ filteredLeads.length }} shown</span></div><div class="table-wrap"><table><thead><tr><th>Contact</th><th>Service / source</th><th>Stage</th><th>Owner</th><th>Added</th></tr></thead><tbody><tr v-for="lead in filteredLeads" :key="lead.leadId" class="data-row" :class="{ selected: selectedId === lead.leadId }" @click="selectedId = lead.leadId"><td><div class="lead-name">{{ lead.name || 'New enquiry' }}</div><div class="secondary">{{ lead.displayId || 'ID pending' }} · {{ lead.email || lead.phone || 'No contact details' }}</div></td><td><div>{{ lead.service || lead.industry || 'General enquiry' }}</div><div class="secondary">{{ lead.source || 'Website' }}</div></td><td><span class="badge" :class="lead.status">{{ lead.status }}</span></td><td class="agent">{{ lead.assignedName || 'Unassigned' }}</td><td>{{ formatDate(lead.createdAt) }}</td></tr></tbody></table><div v-if="!filteredLeads.length" class="empty">{{ message && !hasLoadedLeads ? 'Leads could not be loaded. Use Refresh to try again.' : 'No leads match these filters.' }}</div></div></section>
        <aside class="panel detail"><div class="panel-head"><h2>Lead details</h2><span class="count">{{ selectedLead?.source || '' }}</span></div><div v-if="!selectedLead" class="empty">Select a lead to see the conversation and follow-up details.</div><div v-else class="detail-body"><h2 class="detail-title">{{ selectedLead.name || 'New enquiry' }}</h2><div class="detail-meta">{{ selectedLead.displayId || 'ID pending' }} · Added {{ formatDate(selectedLead.createdAt) }} · updated {{ formatDate(selectedLead.updatedAt) }}</div><div class="detail-row"><label>Email</label><div><a v-if="selectedLead.email" class="link" :href="`mailto:${selectedLead.email}`">{{ selectedLead.email }}</a><span v-else>—</span></div></div><div class="detail-row"><label>Phone</label><div><a v-if="selectedLead.phone" class="link" :href="`tel:${selectedLead.phone}`">{{ selectedLead.phone }}</a><span v-else>—</span></div></div><div class="detail-row"><label>Company / website</label><div>{{ selectedLead.company || '—' }} <span v-if="selectedLead.website">· <a class="link" :href="/^https?:/.test(selectedLead.website) ? selectedLead.website : `https://${selectedLead.website}`" target="_blank" rel="noopener">{{ selectedLead.website }}</a></span></div></div><div v-if="selectedLead.industry" class="detail-row"><label>Industry</label><div>{{ selectedLead.industry }}</div></div><div class="detail-row"><label>Enquiry</label><div>{{ [selectedLead.service, selectedLead.message].filter(Boolean).join(' · ') || '—' }}</div></div>
          <label class="field-label" for="lead-status">Pipeline stage</label><select id="lead-status" v-model="editedStatus" class="field full"><option v-for="status in ['new','contacted','qualified','quoted','won','lost']" :key="status">{{ status }}</option></select>
          <template v-if="user?.role === 'admin'"><label class="field-label" for="lead-assignee">Assigned to</label><select id="lead-assignee" v-model="editedAssignee" class="field full"><option value="">Unassigned</option><option v-for="person in users" :key="person.email" :value="person.email">{{ person.name }} · {{ person.role }}</option></select></template><div v-else class="detail-row"><label>Assigned to</label><div>{{ selectedLead.assignedName || 'Unassigned' }}</div></div>
          <button class="primary full save-button" type="button" :disabled="busy" @click="saveLead">Save lead changes</button><label class="field-label">Follow-up notes</label><div v-if="selectedLead.notes?.length" class="notes"><div v-for="(note, index) in selectedLead.notes" :key="`${note.createdAt}-${index}`" class="note-item">{{ note.text }}<small>{{ note.author || note.email }} · {{ formatDate(note.createdAt) }}</small></div></div><div v-else class="secondary no-notes">No notes yet.</div><textarea v-model="noteText" class="field full note-input" placeholder="Add a call summary or next step…"></textarea><button class="quiet full note-button" type="button" :disabled="busy || !noteText.trim()" @click="addNote">Add note</button><p class="message" aria-live="polite">{{ detailMessage }}</p>
        </div></aside>
      </div><p v-if="message" class="message page-message" aria-live="polite">{{ message }}</p>
    </div>
  </main>
</template>

<style scoped>
.crm-page{min-height:100vh;background:radial-gradient(ellipse at 15% 0%,#25210c 0,transparent 35%),#090a0d;color:#f5f6f8;font:14px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}.shell{max-width:1440px;margin:auto;padding:26px 34px 60px}.topbar{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #282b33;padding:0 0 22px;margin-bottom:28px}.brand{display:flex;align-items:center;gap:12px;font-size:20px;font-weight:750;letter-spacing:-.04em}.mark{width:38px;height:38px;border:1px solid #5b5014;border-radius:12px;display:grid;place-items:center;color:#ffd21a;font-size:20px;background:#211d0d}.eyebrow{color:#ffd21a;font-weight:800;text-transform:uppercase;letter-spacing:.14em;font-size:11px}.top-actions{display:flex;align-items:center;gap:10px}.user-chip,.quiet{font-size:12px;color:#d5d8de;background:#16191f;border:1px solid #30333c;border-radius:10px;padding:9px 12px}.user-chip{border-radius:99px}.quiet{cursor:pointer;text-decoration:none;white-space:nowrap}.quiet:hover{border-color:#666}.quiet:disabled{opacity:.5;cursor:wait}.heading{font-size:32px;letter-spacing:-.045em;margin:7px 0 3px}.sub{color:#9298a4;margin:0}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin:22px 0 18px}.stat,.panel{background:linear-gradient(145deg,#15171d,#101116);border:1px solid #282b33;border-radius:14px}.stat{padding:17px}.stat label{display:block;color:#9298a4;font-size:12px}.stat strong{display:block;font-size:27px;margin-top:8px;letter-spacing:-.04em}.stat:nth-child(1) strong{color:#74b4ff}.stat:nth-child(2) strong{color:#ffd21a}.stat:nth-child(3) strong{color:#59c77b}.stat:nth-child(4) strong{color:#eb8cdb}.toolbar{display:flex;gap:10px;margin:22px 0;flex-wrap:wrap}.field{background:#12141a;border:1px solid #30333c;color:#f1f2f4;border-radius:10px;padding:11px 13px;outline:none;font:inherit}.field:focus{border-color:#a58a10;box-shadow:0 0 0 3px #ffd21a18}.search{flex:1;min-width:210px}.primary{background:#ffd21a;color:#171407;border:0;border-radius:10px;font-weight:800;padding:11px 17px;cursor:pointer}.primary:hover{filter:brightness(1.07)}.primary:disabled{opacity:.55;cursor:wait}.full{width:100%}.layout{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(310px,.8fr);gap:16px;align-items:start}.panel{overflow:hidden}.panel-head{padding:17px 19px;border-bottom:1px solid #282b33;display:flex;align-items:center;justify-content:space-between}.panel-head h2{font-size:15px;margin:0}.count{font-size:11px;color:#9298a4}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;min-width:690px}th{text-align:left;font-size:10px;color:#858b97;text-transform:uppercase;letter-spacing:.1em;font-weight:750;padding:12px 15px;border-bottom:1px solid #282b33}td{padding:13px 15px;border-bottom:1px solid #202229;color:#daddE3;font-size:12px}.data-row{cursor:pointer}.data-row:hover,.data-row.selected{background:#1c1d1c}.lead-name{font-size:13px;color:#fff;font-weight:700}.secondary{color:#9298a4;font-size:11px;margin-top:3px}.badge{display:inline-flex;border-radius:99px;padding:4px 8px;font-weight:750;font-size:10px;text-transform:capitalize;background:#252832;color:#b9c0ce}.badge.new{background:#172c40;color:#8ec6ff}.badge.contacted{background:#32280f;color:#f2cc62}.badge.qualified{background:#173125;color:#79d79a}.badge.quoted{background:#2c2140;color:#c4a5ff}.badge.won{background:#123726;color:#72e2a1}.badge.lost{background:#351d1d;color:#ff9a93}.empty{padding:42px 20px;text-align:center;color:#9298a4}.detail{position:sticky;top:16px;min-height:300px}.detail-body{padding:18px}.detail-title{font-size:21px;letter-spacing:-.035em;margin:0 0 5px}.detail-meta{color:#9298a4;font-size:12px;margin-bottom:14px}.detail-row{padding:10px 0;border-bottom:1px solid #252730}.detail-row label{display:block;color:#848b96;text-transform:uppercase;font-weight:700;font-size:9px;letter-spacing:.12em;margin-bottom:4px}.detail-row div{overflow-wrap:anywhere}.field-label{display:block;font-size:11px;color:#aeb3bc;margin:15px 0 6px}.link{color:#74b4ff;text-decoration:none;overflow-wrap:anywhere}.link:hover{text-decoration:underline}.agent{font-size:11px;color:#c9ccd2}.save-button{margin-top:12px}.note-input{resize:vertical;min-height:80px}.note-button{margin-top:8px}.notes{display:grid;gap:8px}.note-item{border-left:2px solid #75610f;padding:8px 10px;background:#18191e;border-radius:0 7px 7px 0;font-size:12px;white-space:pre-wrap}.note-item small{display:block;color:#9298a4;margin-top:5px}.no-notes{margin:6px 0}.hidden{display:none!important}.auth-wrap{min-height:100vh;display:grid;place-items:center;padding:24px}.auth{width:min(460px,100%);padding:30px;border-radius:16px}.auth h1{font-size:30px;letter-spacing:-.05em;margin:7px 0}.auth p:not(.eyebrow){color:#9298a4;line-height:1.65}.auth-eyebrow{margin:23px 0 0}.auth .field{width:100%}.auth .primary{margin-top:14px}.text-button{display:block;margin:12px auto 0;border:0;background:none;color:#aeb3bc;cursor:pointer}.text-button:hover{color:#ffd21a}.message{min-height:20px;color:#ffd21a;font-size:12px;margin:10px 0 0}.page-message{margin-top:15px}.back-link{display:inline-block;margin-top:12px;color:#ffd21a;text-decoration:none}.auth code{color:#f5d750;background:#25220f;padding:2px 5px;border-radius:4px}
@media(max-width:900px){.shell{padding:20px}.layout{grid-template-columns:1fr}.detail{position:static}.cards{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.shell{padding:16px}.topbar{align-items:flex-start;gap:14px}.top-actions{flex-direction:column;align-items:flex-end}.user-chip{max-width:190px;text-align:right;overflow-wrap:anywhere}.heading{font-size:27px}.cards{gap:8px}.stat{padding:13px}.stat strong{font-size:23px}.auth{padding:23px}}
</style>
