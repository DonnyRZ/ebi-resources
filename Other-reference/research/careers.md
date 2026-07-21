# Careers — Research Findings (for EBI Resources website)

> **Scope:** Research notes for the EBI Resources **Careers** page. Content is scraped from the client-supplied legacy careers source and **re-branded to "EBI Resources"** for all website-facing use.
> **Branding rule:** The public website uses **"EBI Resources"** exclusively. The original source uses another company name (noted once under *Provenance* for factual traceability only); it must **never** appear in website-facing copy. See §5.
> **Fact vs inference:** Each section separates **Facts from source** (scraped verbatim/paraphrased) from **Inference / recommendation** (my synthesis for the EBI build). Do not fabricate roles, dates, salaries, or benefits.

---

## 1. Summary

- **Open roles found: 5** (all `is_open: true`, all full-time).
- The careers listing is a **JS-rendered single-page app** (Vite/React); the visible page only shows "Loading…" in raw HTML. The job data is served from a **JSON REST API** at `https://egiresources.com/api` (endpoints `/api/jobs`, `/api/jobs/{slug}`, `/api/sectors/ecosystem`). No third-party ATS (Greenhouse/Lever/Workday) or iframe embed is used — it is a **custom in-house jobs API + on-site application form**.
- The 5 roles skew heavily to **property & hospitality** (4 of 5), including one **Uzbekistan placement** (Tashkent/Samarkand) that aligns directly with EBI's real hotel/restaurant/café operations. One role is a group **HR & GA Manager**.
- Applications are submitted **on-site** via an application modal (name, email, phone, cover note, CV upload or link) — not by email. A talent team reviews and responds "within 5 business days if there's a fit."

---

## 2. General careers / employer content

### Facts from source (rebranded EGI → EBI)
- **Page eyebrow / kicker:** "Open Roles · EBI Resources"
- **Hero headline:** "Build Indonesia's next strategic chapter."
- **Hero subtitle:** "Browse our open positions across all [N] pillars. New roles open on a rolling basis as our pipelines scale."
  - *Source literally says "all 3 pillars"; the number is tied to the source company's sector taxonomy and should be re-mapped to EBI's business lines — see inference below.*
- **Filter control:** "Filter by Pillar" with an "All Pillars" tab plus one tab per business line/pillar; each tab shows a live **count** of open roles.
- **Empty state copy:** "No open roles match this filter yet. Check back soon, or browse other pillars."
- **Per-role CTA:** "View Role" → opens a job detail page at `/careers/{slug}`.
- **Job detail labels:** "What we look for" (requirements list), "Apply for this role", "Back to all roles".
- **Rolling-recruitment framing:** roles "open on a rolling basis as our pipelines scale."

### Inference / recommendation (for EBI)
- **Employer value proposition (EBI-appropriate synthesis):** Position careers around EBI's actual story — *"Bring the warmth of Indonesian hospitality to the Silk Road. Join a growing holding group building hotels, restaurants, café, and technology across Indonesia and Uzbekistan."* This keeps the "build something strategic / rolling growth" energy of the source while grounding it in EBI's real portfolio (Hotels, Restaurants, Café, IT & Technology, Travel).
- **Filter tabs (pillars) → EBI business lines.** The source's "pillars" are its own sectors. For EBI, the filter tabs should be **EBI's five business lines** (Hotels · Restaurants · Café · IT & Technology · Travel) — or a simplified **Property & Hospitality / IT & Technology / Corporate** grouping that matches how the current roles are tagged. Re-map the "3 pillars" number to however many EBI lines actually have open roles; do not import EGI's defense/minerals/aviation/pharma/media sectors.
- Keep the **rolling-basis** language — it honestly signals an early-stage, growing recruiter without over-promising a fixed number of openings.

---

## 3. Open positions (structured)

> All five below are **facts from source** (the `/api/jobs` payload), with the employer name re-branded EGI → EBI. Fields captured per the API: title (EN/ID), business line/sector, location, employment type, seniority level, short summary (EN/ID), and requirements (EN/ID). **The source provides `summary` + `requirements` only — there is no separate "key responsibilities" or free-text "how to apply" field per role;** responsibilities are implied by the summary. "How to apply" is global (see §4).

### 3.1 Hotel Marketing Manager
- **Business line (source sector):** `property-hospitality` → EBI: **Hotels / Property & Hospitality**
- **Location:** Jakarta Selatan, Jakarta Raya (South Jakarta, Indonesia)
- **Employment type:** Full-time · **Level:** Mid Level
- **Summary (EN):** Strong interpersonal skills and ability to build client relationships for our hospitality division.
- **Summary (ID):** Keterampilan interpersonal yang kuat dan kemampuan untuk membangun hubungan klien untuk divisi perhotelan kami.
- **Requirements (EN):**
  - Proven experience in hospitality marketing
  - Ability to build and manage client relationships
  - Strong communication and negotiation skills
- **Requirements (ID):** Pengalaman terbukti di pemasaran perhotelan · Kemampuan membangun dan mengelola hubungan klien · Kemampuan komunikasi dan negosiasi yang kuat
- **Slug:** `hotel-marketing-manager`

### 3.2 Chef (Placement: Uzbekistan)
- **Business line (source sector):** `property-hospitality` → EBI: **Restaurants / Café (Hospitality)**
- **Location:** Tashkent / Samarkand, Uzbekistan
- **Employment type:** Full-time · **Level:** Mid Level
- **Summary (EN):** Lead the kitchen operations for our Indonesian-themed restaurants and cafes in Uzbekistan.
- **Summary (ID):** Memimpin operasional dapur untuk restoran dan kafe bertema Indonesia kami di Uzbekistan.
- **Requirements (EN):**
  - Strong experience in authentic Indonesian cuisine
  - Willingness to be placed in Uzbekistan (Tashkent/Samarkand)
  - Ability to manage kitchen inventory and train local staff
- **Requirements (ID):** Pengalaman kuat dalam masakan otentik Indonesia · Bersedia ditempatkan di Uzbekistan (Tashkent/Samarkand) · Kemampuan mengelola inventaris dapur dan melatih staf lokal
- **Slug:** `chef-uzbekistan`
- *Note: this role maps cleanly to EBI's real Uzbekistan hospitality operations (Indonesian dining at the hotels/café in Samarkand & Tashkent).*

### 3.3 HR Manager (HR & GA Manager)
- **Business line (source sector):** `it-technology` → EBI: **Group / Corporate** (or IT & Technology). *Note: the source tags this role to `it-technology`, but that sector is not returned in the source's public "ecosystem" list (only 3 sectors are) — treat the tag as loose; functionally it is a **group-wide corporate HR role**.*
- **Location:** Jakarta Selatan, Jakarta Raya
- **Employment type:** Full-time · **Level:** Manager
- **Summary (EN):** HR & GA Manager capable of leading the team effectively across EBI Resources' diverse business lines.
- **Summary (ID):** Manajer HR & GA yang mampu memimpin tim dengan baik di berbagai lini bisnis EBI Resources.
- **Requirements (EN):**
  - Minimum 5 years experience as HR & GA Manager
  - Strong understanding of Indonesian labor laws
  - Experience in talent acquisition and performance management
- **Requirements (ID):** Minimal 5 tahun pengalaman sebagai Manajer HR & GA · Pemahaman yang kuat tentang undang-undang ketenagakerjaan Indonesia · Pengalaman dalam akuisisi talenta dan manajemen kinerja
- **Slug:** `hr-manager` · **ID title:** "Manajer HR & GA"

### 3.4 Cafe Manager
- **Business line (source sector):** `property-hospitality` → EBI: **Café (Hospitality F&B)**
- **Location:** Jakarta Selatan, Jakarta Raya
- **Employment type:** Full-time · **Level:** Mid Level
- **Summary (EN):** Oversee daily operations, ensure customer satisfaction, and drive profitability for our F&B outlets.
- **Summary (ID):** Mengawasi operasional harian, memastikan kepuasan pelanggan, dan mendorong profitabilitas untuk gerai F&B kami.
- **Requirements (EN):**
  - Prior experience managing a busy cafe or restaurant
  - Strong leadership and team management skills
  - Excellent customer service and problem-solving abilities
- **Requirements (ID):** Pengalaman sebelumnya mengelola kafe atau restoran yang sibuk · Keterampilan kepemimpinan dan manajemen tim yang kuat · Kemampuan layanan pelanggan dan pemecahan masalah yang sangat baik
- **Slug:** `cafe-manager` · **ID title:** "Manajer Kafe"

### 3.5 Project Manager (High Risk Construction)
- **Business line (source sector):** `property-hospitality` → EBI: **Property & Hospitality (development / construction)**
- **Location:** Jakarta Selatan, Jakarta Raya
- **Employment type:** Full-time · **Level:** Senior Level
- **Summary (EN):** Lead high-risk construction projects ensuring strict adherence to safety standards, budget, and timeline.
- **Summary (ID):** Memimpin proyek konstruksi risiko tinggi dengan memastikan kepatuhan ketat terhadap standar keselamatan, anggaran, dan jadwal.
- **Requirements (EN):**
  - Bachelor Degree in Civil Engineering or Architecture
  - Proven track record managing high-risk construction projects
  - Active HSE/K3 certification (Ahli K3 Konstruksi)
- **Requirements (ID):** Gelar Sarjana Teknik Sipil atau Arsitektur · Rekam jejak terbukti mengelola proyek konstruksi risiko tinggi · Sertifikasi HSE/K3 aktif (Ahli K3 Konstruksi)
- **Slug:** `project-manager-construction` · **ID title:** "Project Manager (Konstruksi Risiko Tinggi)"

### Roll-up table
| # | Role | EBI business line | Location | Type | Level |
|---|---|---|---|---|---|
| 1 | Hotel Marketing Manager | Hotels / Property & Hospitality | Jakarta Selatan, Indonesia | Full-time | Mid |
| 2 | Chef (Placement: Uzbekistan) | Restaurants / Café | Tashkent / Samarkand, Uzbekistan | Full-time | Mid |
| 3 | HR Manager (HR & GA) | Group / Corporate | Jakarta Selatan, Indonesia | Full-time | Manager |
| 4 | Cafe Manager | Café | Jakarta Selatan, Indonesia | Full-time | Mid |
| 5 | Project Manager (High Risk Construction) | Property & Hospitality (development) | Jakarta Selatan, Indonesia | Full-time | Senior |

---

## 4. Application process / how to apply

### Facts from source (rebranded)
- Applications are submitted **on the website** via an **"Apply for this role"** modal on each job detail page (`/careers/{slug}`) — not via a public email address.
- **Application form fields:**
  - Full name *(required)*
  - Email *(required)*
  - Phone *(optional)*
  - Cover note — prompt: "why this role, why EBI?" *(rebranded from "why EGI?")*
  - **CV / Resume:** upload a **PDF/DOC (max 5 MB)** **or** paste a link (LinkedIn / Drive / portfolio). At least one is required.
- **Anti-spam:** the form is protected by a **Cloudflare Turnstile** challenge (a site key is configured in the front-end).
- **Confirmation copy:** "Application received — Thank you. Our talent team reviews every application and will reach out within 5 business days if there's a fit."
- **Backend:** submissions POST to `/api/jobs/{slug}/apply`; there is an internal admin view (`/api/admin/job-applications`) for the talent team to triage applications.

### Inference / recommendation (for EBI)
- EBI's site is scoped as **corporate profile only — no transactions/CMS**. A CV **file upload + application database** is arguably a "form submission" (allowed) but is heavier than the rest of the site. **Recommended MVP:** keep the Careers listing + filter + job detail pages, and for "Apply" either (a) reuse this simple form (name/email/phone/cover note + CV link or upload) posting to a lightweight endpoint/email, or (b) a plain **"Apply" mailto/contact CTA** to an EBI recruiting inbox (placeholder `[careers-email]` until provided). Confirm scope with the client before building file-upload + applicant storage.
- Add a Turnstile/recaptcha equivalent if a real submission form ships.

---

## 5. Provenance & notes

- **Source URL:** `https://egiresources.com/careers` (client-supplied legacy careers source).
- **Original source brand (factual provenance only — DO NOT use on the EBI website):** the source site is branded **"PT. EGI Resources"**. Per the branding rule, **all website-facing careers copy is re-branded to "EBI Resources"** and the source name must not appear anywhere public. This is the single permitted mention for traceability.
- **Scrape method:**
  1. `WebFetch` on `/careers` → returned only shell text + "Loading…" (content is client-side rendered).
  2. `Invoke-WebRequest` (PowerShell) on `/careers` → confirmed a **Vite/React SPA** (empty `<div id="root">`, single JS/CSS bundle).
  3. Inspected the JS bundle (`/assets/index-*.js`) → found an **axios client** with base URL `https://egiresources.com/api` and the routes `/jobs`, `/jobs/{slug}`, `/jobs/{slug}/apply`, `/sectors/ecosystem`, `/admin/job-applications`.
  4. Fetched the **JSON APIs** directly: `/api/jobs` (5 roles), `/api/jobs/hotel-marketing-manager` (detail — same fields), `/api/sectors/ecosystem` (sector/pillar taxonomy). Extracted the careers UI copy from the bundle's i18n `careers_page` object.
- **JS / ATS involvement:** JS-rendered = **yes**. Third-party ATS = **no** (custom in-house jobs API + on-site apply form + Cloudflare Turnstile). No iframe embed.
- **Gaps / caveats:**
  - The API returns **no "department", "key responsibilities", "salary", or per-role application instructions** — only summary + requirements + level + location + type. Responsibilities were not invented.
  - The source's **sector/pillar taxonomy differs from EBI's** (source lists defense, minerals, energy, aviation, pharma, media, IT, property & hospitality across its marketing; the live "ecosystem" API returned only 3 sectors: defense-systems, mineral-processing, property-hospitality). **None of EGI's non-EBI sectors should appear on the EBI site.** The `it-technology` tag on the HR role is not in the returned ecosystem list — treated as a loose/group tag.
  - The hero subtitle hard-codes "all 3 pillars"; re-map to EBI's business lines before publishing.
  - All 5 roles are Indonesia-HQ except the Uzbekistan Chef role; this matches EBI's Jakarta ↔ Uzbekistan footprint.
  - Data captured **2026-07-21**; roles "open on a rolling basis," so re-scrape before launch to refresh the live list.
- **Rebrand note:** Every "EGI" / "EGI Resources" / "PT EGI Resources" string in captured content has been converted to **"EBI Resources"** for website use (e.g., cover-note prompt "why EGI?" → "why EBI?"; HR summary "across EGI Resources' diverse sectors" → "across EBI Resources' diverse business lines").
