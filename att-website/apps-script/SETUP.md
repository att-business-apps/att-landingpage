# Amortree CRM setup

The Apps Script project is the secure bridge between the website, the CRM UI, and one private Google spreadsheet. `Code.gs` handles website intake and access checks; `CRM.html` is the staff interface.

## 1. Initialize the spreadsheet

1. Create a standalone project at [script.google.com](https://script.google.com).
2. Replace the editor's `Code.gs` with this folder's `Code.gs` and add an HTML file named `CRM`, then paste in `CRM.html` (the Vue route uses `doGet` JSONP calls; the HTML file is a standalone fallback).
3. Run `setupCrm()` from a spreadsheet-bound script to initialize that active spreadsheet. For the existing spreadsheet from a standalone Apps Script project, add and run this temporary wrapper, replacing the ID with the part between `/d/` and `/edit` in the sheet URL:

   ```js
   function initializeExistingCrmSheet() {
     return setupCrm("PASTE_SPREADSHEET_ID_HERE");
   }
   ```

   Approve the requested Google Sheets and email permissions. The execution log contains the spreadsheet URL and migration counts. This adds/repairs the `Leads` and `Events` tabs, retains the target `CRM Access` roster, and copies unique lead/event rows from the previously configured CRM spreadsheet. The source spreadsheet is left intact. It also assigns readable lead IDs (`#latt01`, `#latt02`, …) to existing rows and preserves each original key in the `Record Key` column. Run setup once after updating `Code.gs` to migrate existing rows.
4. Open the `CRM Access` tab. The account that ran setup is seeded as an admin when Google provides its email. Add one row per staff member:

   | Email | Name | Role | Enabled |
   | --- | --- | --- | --- |
   | admin@yourcompany.com | CRM Admin | admin | TRUE |
   | agent@yourcompany.com | Sales Agent | agent | TRUE |

   Use `admin` or `agent`; set `Enabled` to `TRUE` or `FALSE`. Add/verify your admin email before deployment if the initial row was not seeded.

The spreadsheet owner controls its sharing. Keep the spreadsheet private and do not share it with agents; authorized people use the CRM web app instead.

## 2. Deploy the CRM web app

1. In Apps Script select **Deploy → New deployment → Web app**.
2. Set **Execute as** to the spreadsheet/script owner. Set access to **Anyone** so the sign-in screen can deliver OTPs to enabled emails; the CRM data methods require a valid server-side session and recheck the user's enabled role and assignment.
3. Deploy and copy the `/exec` URL. After changing `Code.gs` or `CRM.html`, deploy a new version of that deployment.

## 3. Connect the website

In the website build/deploy environment, set both variables to the deployed `/exec` URL:

```env
VITE_LEADS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
VITE_CRM_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

For local development, copy `.env.example` to `.env.local` and enter the same values. Restart Vite after changing either variable. Rebuild and redeploy the site. The CRM UI is a native Vue route at `/crm`; it calls the Apps Script JSONP RPC endpoint, while public lead submissions use a browser `no-cors` POST. Check the `Leads` and `Events` tabs when validating live setup.

## Workbook tabs

- **Leads** - website submissions, CRM stage, assignment, and private follow-up notes.
- **Lead ID** - human-readable sequential ID shown in the CRM; **Record Key** is the internal key used to link form submissions and CRM updates.
- **CRM Access** - staff email, display name, role, and enabled flag.
- **Events** - WhatsApp, booking, and modal click events.

Admins see every lead and can assign a lead to any enabled CRM user. Agents receive only rows assigned to their exact email; this filter is enforced in Apps Script on every read and update. An agent cannot reassign leads or import a CSV. CSV import is available to admins in the CRM UI.
