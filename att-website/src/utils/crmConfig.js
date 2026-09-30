const configuredCrmUrl = String(import.meta.env.VITE_CRM_WEB_APP_URL || "").trim();
const configuredLeadUrl = String(import.meta.env.VITE_LEADS_WEBHOOK_URL || "").trim();

export const crmWebAppUrl = configuredCrmUrl || configuredLeadUrl || "https://script.google.com/macros/s/AKfycbyFdefYwZCu7uJKjutDcLtt5RG4mSlBwAwksFCWt2mP-ayDb7OAWnv2Hl6tkka_GWWq/exec";
