const configuredCrmUrl = String(import.meta.env.VITE_CRM_WEB_APP_URL || "").trim();
const configuredLeadUrl = String(import.meta.env.VITE_LEADS_WEBHOOK_URL || "").trim();

export const crmWebAppUrl = configuredCrmUrl || configuredLeadUrl || "https://script.google.com/macros/s/AKfycbzh-0NAzB2Ehn1RLjMzsBKOuV0CZsDEOhC8LxWtGAL7K7RcY6vsEEt6BcoB-l7DCeV3/exec";
