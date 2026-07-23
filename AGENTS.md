# EBI Resources — Agent Do’s & Don’ts

**Who this is for:** Every coding agent working on this repo.  
**Why it exists:** Real mistakes from earlier sessions caused bad UX, false claims, and multi-second lag. Read this **before** editing homepage, About, heroes, carousels, images, i18n, or performance.

**Source of truth (in order):**

1. This file (process / past failures)
2. `CONTENT-REFERENCE.md` (what may be said)
3. `Design-Reference/DESIGN.md` (how it should look)
4. `structure.txt` (sitemap)
5. `README.md` (project goals / personas)

---

## 0. Hard brand & content law (never violate)

### DO

- Use the brand name **“EBI Resources”** only in all public UI copy, alt text, metadata, and messages.
- Prefer **qualitative** proof on marketing surfaces (landmark locations, certification names, positioning). Do **not** invent numeric stat-bands.
- Use Contact HQ details: **secretary@ebiresources.com**, **+62 21 3062 9515**, **Complex of Imam Al Bukhari, Samarkand, Uzbekistan**.
- Mark Board of Directors placeholder treatment only where still needed; Vision & Mission now uses real drafted copy (client may refine).
- Keep EN as primary; UZ (Uzbek, Latin script) and RU (Russian) must be **real translations**, not mirrored English.

### DON’T

- **Never** mention **EGI**, “EGI Resources”, or any Indonesia-vs-international company split. This is absolute — including footnotes, alt text, comments in user-facing strings, and research leftovers pasted into UI.
- **Never** fabricate metrics (“4 hotels”, “20+ years”, “500 rooms”) or present opinion as hard fact (hours, rates, awards not owned).
- **Never** assert unverified restaurant **brand names** as fact if the client has not finalized them. Prefer “Restaurants” / generic dining language unless a name is grounded in approved research **and** still allowed.
- **Never** ship placeholder Vision/Mission/Board text as if it were approved strategy.

### Past failure

| Mistake | What happened | Correct approach |
|--------|----------------|------------------|
| IT copy generalized from a source that named another entity / industries outside the portfolio | Risk of wrong claims | Adapt to EBI portfolio only; flag wording that was generalized |
| Numeric stats tempting for “investor feel” | Would undermine credibility with modest/pre-opening numbers | Defer numeric bands; qualitative proof only |

---

## 1. Images — selection, ratio, category

### DO

- For **full-bleed heroes**, pick assets that are **natively landscape** (target ≈ **1.6–2.0** width/height, e.g. 16:9 / 1.83). Measure with image tools before assigning.
- Verify **category match**: restaurant slide/card → dining room; café → café; hotel exterior → exterior. Cross-check folder names under `Assets/` (e.g. `F&B/Restaurant` vs `Bar & Lounge`).
- Prefer lean JPEG (~≤500KB after resize, long edge ~1920–2560) for photographic heroes. Let `next/image` negotiate AVIF/WebP.
- `priority` / LCP preload: **only the true LCP image** (usually active hero slide 0, or the single About hero). Not every carousel slide.
- Skip HEIC; skip watermarks, floorplans, logo boards, and identifiable faces when possible.
- When overlapping collage covers the subject, **mirror or reposition** the background so the landmark stays visible — don’t leave it obscured.

### DON’T

- **Don’t** put **portrait** assets (ratio &lt; 1) into wide heroes and hope `object-cover` “fixes” it — the subject will look cropped (“kepotong”).
- **Don’t** use multi‑MB **PNG** photos as LCP (e.g. ~2.5MB rooftop PNGs). Convert to JPEG first.
- **Don’t** label a **Bar & Lounge / pastry + espresso** render as **“Restaurants”** — that was a real mix-up; users catch it immediately.
- **Don’t** reuse the same hero image for two adjacent hero-level claims without reason; vary when assets allow.
- **Don’t** invent new image pipelines or remote R2 URLs unless asked — use `public/images/` curated files.

### Past failures (concrete)

| Mistake | Evidence | Fix that was required |
|--------|----------|------------------------|
| Board hero used `hadith/exterior-night.jpg` (**1086×1448**, ratio **0.75**) | Building/fountains sliced in ultra-wide hero | Replace with landscape master (`facade-night-landscape.jpg`, **2560×1399**, ratio **1.83**) |
| “Restaurants” hero/card used `bar-lounge` (coffee bar / pastry case) | Folder was Bar & Lounge, not Restaurant | Swap to `Assets/hadith/F&B/Restaurant/*` dining shots; keep lounge for café-adjacent only if appropriate |
| Five carousel slides all `priority` + multi‑MB PNG LCP | Hydration starved; first arrow click dead | Priority only on active; neighbor ±1 mount; JPEG LCP |
| Collage: café overlay hid Imam al-Bukhari complex | Landmark on wrong side of frame | CSS `-scale-x-100` (or recompose) so building stays visible |

### Pre-flight checklist (images)

```
[ ] Aspect ratio measured (hero ≥ ~1.5; prefer ≥ 1.7)
[ ] Subject category matches copy (hotel / restaurant / café)
[ ] File size reasonable after encode
[ ] Only one priority image for this route’s LCP
[ ] Alt text accurate (no wrong venue names)
```

---

## 2. Hero & header layout

### DO

- Keep hero text **restrained, bottom-left**, not filling the viewport (DESIGN.md).
- Reserve **safe top padding** on hero content for the fixed two-tier header (`pt-24 md:pt-32` pattern or equivalent) so kickers never collide with nav / “Partner With Us”.
- Prefer **short headlines** (≈2 lines). Long UZ/RU translations that wrap to 4 lines will push kickers into the header even with padding.
- Interior About heroes: shorter than homepage (~55–70vh), **single image**, not a carousel.
- Header over homepage hero: transparent → solid on scroll. On **About** section, prefer **solid header** so sub-nav can sit in the first viewport (prefetch + no transparent overlap fights).

### DON’T

- **Don’t** stack kickers under the nav without clearance (EN + especially longer UZ/RU overlap bugs).
- **Don’t** put thick Accor-style chrome that eats half the hero unless DESIGN explicitly requires it.
- **Don’t** leave a full-bleed prev/next overlay capturing clicks without `pointer-events-none` on the shell and `pointer-events-auto` on the buttons — it blocks hero CTAs.
- **Don’t** render CTAs / focusable links on **inactive** carousel slides; use `inert` + conditional CTAs.

### Past failures

| Mistake | Symptom | Fix |
|--------|---------|-----|
| No hero top safe-area | “IMAM AL BUKHARI…” overlapped HOME / ABOUT; longer locale strings worse with partner CTA | Safe padding + shorter translated headlines |
| Arrow buttons with white box borders | Looked cheap / noisy | Borderless arrows |
| Overlay `inset` flex row without pointer-events fix | “Explore Our Businesses” unclickable | `pointer-events-none` + button `auto` |

---

## 3. Carousel timing & interaction

### DO

- Drive autoplay from **one clock** (progress bar `animationend` **or** a single timer — not both).
- Keep slide crossfade short for UX (**~350ms / `duration-struct`**). Long 1.5s fades make clicks feel broken.
- Keep DESIGN’s long `duration-hero` (1.5s) for intentional title entrances if needed — **do not** reuse it for every soft-nav remount of interior heroes if it makes page changes feel stuck. Prefer `duration-struct` for `HeroContent` enter fades unless DESIGN says otherwise for that surface.
- Pause on **focus** for a11y; be careful with hover-pause freezing the only clock.

### DON’T

- **Don’t** run `setInterval(7000)` **and** a 7000ms CSS progress animation as two independent timers — they drift: bar full then 2–3s lag, or bar loops without advancing.
- **Don’t** resolve ICU strings like `Go to slide {number}` with `t("goToSlide")` without values when the carousel fills `{number}` itself — use **`t.raw("goToSlide")`** (or pass values). Otherwise every load throws `FORMATTING_ERROR`.
- **Don’t** assume first arrow click works before hydration if the network is flooded with priority images.

### Past failures

| Mistake | Symptom | Fix |
|--------|---------|-----|
| Dual timers (interval + CSS) | Progress full → delay / repeat | Single clock via `onAnimationEnd` |
| `a("goToSlide")` with `{number}` | Console FORMATTING_ERROR both locales | `a.raw("goToSlide")` |
| `duration-hero` 1500ms on every About remount | Soft-nav feels 1.5s “not done” | `duration-struct` on HeroContent fades |

---

## 4. Performance & navigation (soft nav)

### DO

- Add Next’s documented attribute when using smooth scrolling:  
  `<html … data-scroll-behavior="smooth">` **and** keep `scroll-behavior: smooth` in CSS if desired. Without the attribute, App Router scroll-to-top **animates for seconds**.
- On About: put **AboutSubNav in `about/layout.tsx`** under a solid header so sibling links prefetch early (not buried under a 60vh hero).
- Provide `app/[locale]/about/loading.tsx` (lightweight, no Hero/images) so navigations aren’t a frozen old page.
- Pass **scoped** messages into `NextIntlClientProvider` (e.g. `nav`, `header`, `about.subnav`, and whatever client Footer needs) — don’t ship the entire ~17KB catalog to the client on every page.
- Set `prefetch={false}` on Header links to routes that **don’t exist yet** (`/businesses`, `/careers`, `/contact`) to avoid Turbopack compile storms in dev.
- Measure real UX with **`npm run build && next start`**. Treat `next dev` TTFB (0.5–6s cold) as **inflated**.

### DON’T

- **Don’t** mark every image `priority`.
- **Don’t** mount five full-viewport carousel images at once with preload.
- **Don’t** use multi‑MB PNG masters for LCP.
- **Don’t** “fix” navigation solely by telling humans to ignore `next dev` — still fix scroll, fade, prefetch, and image weight.
- **Don’t** casually edit `next.config.ts` mid-session without expecting a **full Turbopack restart**; if `/en` 404s after restart, clear `.next/dev` and restart the server (known footgun).

### Past failures

| Mistake | Symptom | Fix |
|--------|---------|-----|
| Smooth scroll without `data-scroll-behavior` | 1–3s+ scroll animation on every route change | Attribute on `<html>` |
| All slides `priority` + 2.5MB PNG | Dead first clicks; 10–15s cold optimize | Priority + JPEG + neighbor mount |
| SubNav below hero only | About↔About prefetch late | SubNav in layout + solid About header |
| Prefetching missing routes | Slow/weird dev compiles | `prefetch={false}` until pages exist |
| Config change → auto restart → corrupt cache | `/en` 404 while files still exist | Clear `.next/dev`, restart `next dev -p 3200` |

---

## 5. Information architecture (About)

### DO

- Follow **Pattern B** (user-confirmed):  
  - `/about` = **Company Overview** (real content)  
  - `/about/vision-mission` = placeholder layout + lorem  
  - `/about/board` = placeholder grid; optional real card **Erslan Ibrahim, Chairman & CEO** only  
- Treat `structure.txt` as hierarchy of **content**, not a mandate that every label is a separate empty hub page.
- Keep Header `isActive` using `pathname.startsWith("/about")` so subpages highlight About.

### DON’T

- **Don’t** invent a thin `/about` hub that only duplicates Overview.
- **Don’t** invent founding years, headcount, or board bios.
- **Don’t** leave Overview as lorem — that page is the real-content slot.

---

## 6. i18n

### DO

- Put UI strings in `messages/en.json`, `messages/uz.json`, and `messages/ru.json`.
- For templates with placeholders filled in client code, use **`.raw()`** or pass ICU values correctly.
- Keep locale routing via `next-intl` (`app/[locale]/…`, `middleware.ts`). Don’t rewrite i18n architecture casually.

### DON’T

- **Don’t** hardcode user-visible English in components when a message key exists.
- **Don’t** break `a.raw("goToSlide")` “simplifications.”
- **Don’t** edit `middleware` cookie/locale behavior for speculative CDN gains without measurement.

### Past failure

`FORMATTING_ERROR: variable "number" was not provided` on every homepage load until `goToSlide` used `.raw()`.

---

## 7. Links & CTAs

### DO

- Align labels with destinations: **“Partner With Us” → `/contact`**, not `/careers`.
- Homepage partnership CTA and header utility must stay consistent.
- Expect `/businesses`, `/careers`, `/contact` to 404 until built — don’t spam-prefetch them.

### DON’T

- **Don’t** wire investor/partner CTAs to Careers.
- **Don’t** invent live booking/transaction flows (out of scope).

### Past failure

Header “Partner With Us” pointed to `/careers` while footer CTA correctly used `/contact`.

---

## 8. Design system discipline

### DO

- Quiet luxury: white/cream/navy + gold/bronze, Playfair + Inter, **0 radius**, generous whitespace.
- One job per section; vary photo patterns (row / mosaic / collage) per DESIGN.md — not every block identical.
- Reuse `Section`, `Hero`, `Card`, `Button`, `Reveal` — extend carefully.

### DON’T

- **Don’t** introduce purple gradients, pill clusters, emoji decoration, multi-layer shadows, or dashboard-style first viewports.
- **Don’t** invent numeric stat strips “for polish.”
- **Don’t** rewrite DESIGN tokens globally for a one-page tweak.

---

## 9. Git, assets, and secrets

### DO

- Keep `Assets/` gitignored; commit only curated `public/images/…`.
- Ignore `.audit-tmp/`, `.next/`, `.env` (use `.env.example` only).
- Commit only when the user asks.

### DON’T

- **Don’t** commit secrets, huge raw asset dumps, or Playwright audit screenshots by accident.
- **Don’t** force-push or amend unless the user explicitly asks and rules allow.

---

## 10. Dev server conventions (this project)

### DO

- Prefer **`http://localhost:3200`** when 3000/3100 are occupied (common on this machine).
- After `next.config.ts` changes, if routes 404 incorrectly: stop process → delete `.next/dev` → `npx next dev -p 3200`.
- Prove performance with **`next build && next start`** before declaring navigation “fixed.”

### DON’T

- **Don’t** assume port 3000 is this app (another project has occupied it before).
- **Don’t** declare victory on cold Turbopack first-compile timings alone.

---

## 11. Working style for agents

### DO

- Read `CONTENT-REFERENCE.md` + `DESIGN.md` + this file before large UI work.
- Fact-check copy against research under `Other-reference/research/` — never paste EGI or unverified numbers.
- Prefer surgical diffs; run `npm run build` after route/i18n/image changes.
- When the user asks for audits → strategy → implement: **don’t skip strategy**; don’t implement before root causes are written down.

### DON’T

- **Don’t** “improve” by adding fake content to look finished.
- **Don’t** undo performance fixes (priority, JPEG, scroll attribute, scoped messages, SubNav-in-layout) without a measured reason.
- **Don’t** parallel-edit the same file from two agents without sequencing.

---

## 12. Quick “stop and check” gates

Before merging a homepage / About / hero change, answer:

1. Could this viewport belong to another brand if the wordmark were removed? (Branding strength)
2. Is every hero image’s **native** ratio landscape enough?
3. Does any string invent a metric, EGI, or unconfirmed venue name?
4. Is there only **one** LCP `priority` image on this route?
5. Will soft-nav scroll-to-top be **instant** (`data-scroll-behavior` present)?
6. Will hero text be readable in **&lt; ~400ms** after mount (not a 1.5s ghost fade)?
7. Do partner CTAs go to **`/contact`**?
8. Did `npm run build` still pass?

If any answer is “no” or “unsure,” fix before presenting to the user.

---

## 13. Appendix — mistake index (search keywords)

| Keyword | Section |
|---------|---------|
| EGI / split | §0 |
| stat-band / fabricated metrics | §0 |
| portrait hero / kepotong | §1 |
| bar-lounge as restaurant | §1 |
| priority ×5 / PNG LCP | §1, §4 |
| header overlap / kicker | §2 |
| FORMATTING_ERROR / goToSlide | §3, §6 |
| dual timer / progress lag | §3 |
| scroll-behavior / data-scroll-behavior | §4 |
| Partner With Us → careers | §7 |
| next.config 404 / .next/dev | §4, §10 |
| About Pattern B | §5 |

---

*Last updated from project lessons through homepage build, About Pattern B, image ratio fixes, and navigation latency remediation. Extend this file when new classes of mistakes appear — do not delete historical examples.*
