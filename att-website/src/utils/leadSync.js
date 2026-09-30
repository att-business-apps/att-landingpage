const endpoint = (import.meta.env.VITE_LEADS_WEBHOOK_URL || "").trim();
let callbackSequence = 0;

export function createLeadId(source = "website") {
  const random = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${source}-${random}`;
}

/** Apps Script accepts a simple text/plain POST; no-cors intentionally makes
 * this best-effort because the browser cannot read the Apps Script response. */
export async function submitLead(lead) {
  if (!endpoint) {
    console.warn("Lead CRM is not configured: set VITE_LEADS_WEBHOOK_URL.");
    return false;
  }
  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "lead_upsert", ...lead }),
    });
    const receipt = await requestJsonp("checkPublicLeadReceipt", [lead.leadId]);
    return receipt?.received === true;
  } catch (error) {
    console.error("Lead CRM submission failed:", error);
    return false;
  }
}

function requestJsonp(method, args) {
  return new Promise((resolve, reject) => {
    const callback = `__amortreeCrm_${Date.now()}_${callbackSequence += 1}`;
    const script = document.createElement("script");
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.remove();
      delete window[callback];
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("CRM receipt check timed out."));
    }, 12000);
    window[callback] = (payload) => {
      cleanup();
      if (!payload?.ok) reject(new Error(payload?.error || "CRM receipt check failed."));
      else resolve(payload.result);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Could not confirm the CRM save. Check the Apps Script deployment."));
    };
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

export async function submitCrmEvent(event, details = {}) {
  if (!endpoint) return false;
  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "event_append",
        event,
        page: location.pathname + location.search,
        referrer: document.referrer || "direct",
        device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        visitor_id: localStorage.getItem("amt_vid") || "",
        session_id: sessionStorage.getItem("amt_sid") || "",
        meta: details,
      }),
    });
    return true;
  } catch (error) {
    console.error("CRM event submission failed:", error);
    return false;
  }
}
