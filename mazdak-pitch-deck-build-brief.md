# Build Brief: Mazdak Atlantic AgriAqua Investor Deck (Web App)

**Client:** Mazdak Atlantic AgriAqua Inc., Fredericton, New Brunswick
**Deliverable:** A five-slide presentation web app, keyboard-driven, projected in a room
**Audience:** Shadow Institute JHSC panel and early-stage investors
**Prepared:** 23 September 2026
**Hand this file to:** Claude Code, as the single source of truth for the build

---

## 0. How to use this brief

This brief contains the final approved copy, the design system, the asset routing and the interaction spec. Build what is here. Do not re-write the copy, do not invent statistics, and do not add claims that are not in Section 5. Every number in the copy is traceable to the client's data room, and several claims were deliberately withdrawn this week. Reintroducing them would damage the client in diligence. See Section 11 for the list of things that must never appear.

If something is genuinely ambiguous, build the simplest version that satisfies the acceptance checklist in Section 12 and leave a `// BRIEF-QUESTION:` comment in the code rather than guessing at new content.

---

## 1. The one correction that governs the whole deck

The founder's verbal brief described the product as a **DTPA-type** chelate. The data room contradicts this.

Data Room 04 (Problem, Market and Value Proposition Summary, 23 September 2026) states that the chelating agent is **EDTA**, confirmed by co-founder Dr. Ali Kalateh on 23 September 2026, corrected from an earlier assumption of DTPA. It formally withdraws the sentence in Data Room 02 that placed the product in a "DTPA chemistry stability window, which holds to roughly pH 7.5."

**This deck is built on EDTA.** The distinction is the entire value proposition:

- Standard Fe-EDTA holds iron in solution to roughly pH 6.0 to 6.5 and loses effectiveness above that.
- The target customer's substrate has already drifted above 6.0.
- So a conventional EDTA product is at its limit exactly where the customer's problem begins, and the claim that the microwave and UV process extends that usable range is the reason the company is interesting rather than a commodity.

Fe-DTPA (Sprint 330) appears in this deck **only** as a product growers currently buy, never as the company's own chemistry and never as its competitive set.

### Implementation requirement

Put the chemistry string in exactly one place so it can be flipped in one edit:

```ts
// src/content/chemistry.ts
export const CHELATE = {
  agent: "EDTA",
  standardCeilingPh: "6.0 to 6.5",
  confirmedBy: "Dr. Ali Kalateh, co-founder, 23 September 2026",
} as const;
```

Reference `CHELATE.agent` everywhere the chelate is named in slide copy. Do not hard-code "EDTA" into JSX strings.

---

## 2. Stack and project shape

- **Vite + React + TypeScript.** No UI framework, no Tailwind, no component library. The type scale and spacing in Section 4 are precise and a utility framework will erode them.
- **Plain CSS** in two files: `src/styles/tokens.css` (custom properties only) and `src/styles/app.css`. Slide-specific rules live in `src/styles/slides.css`.
- **No router dependency.** Use `window.location.hash` for deep links (`#/3`) with a small `useHash` hook.
- Set `base: './'` in `vite.config.ts` so a static build runs from any subpath or a USB stick.
- Fonts loaded from Google Fonts with `display: swap` and a real fallback stack. The deck must still be legible if the venue has no internet. Test this.

```
mazdak-deck/
  assets/                  <- the client's folder, copied in as-is, see Section 3
  public/assets/           <- Vite serves from here; symlink or copy at setup
  src/
    main.tsx
    App.tsx
    content/
      chemistry.ts
      slides.ts            <- ALL copy lives here, typed, never inline in JSX
      claims.ts            <- assumption registry, see Section 6
    components/
      Stage.tsx            <- 16:9 scaler
      SlideFrame.tsx
      Claim.tsx            <- the [assumption] tag component
      PhRuler.tsx          <- the signature visual, slide 3
      CostBar.tsx          <- slide 2
      VideoPanel.tsx       <- slide 4
      Lightbox.tsx
      ProgressRail.tsx
      PresenterNotes.tsx
    slides/
      01Title.tsx 02Problem.tsx 03Value.tsx 04Solution.tsx 05Model.tsx
    styles/
```

---

## 3. Asset manifest: which file goes where

The client's images are in a folder named `assets` sitting next to this brief. Copy the whole folder to `public/assets/`. Reference images as `/assets/<name>` so the Vite base path resolves correctly.

| File | Slide | Placement | Treatment | If the file is missing |
|---|---|---|---|---|
| `logo.png` | All | Title slide, upper left at 132px wide. All other slides, 84px wide in the bottom-left of the persistent footer rail. | No effects, no drop shadow. If the logo has a white box background, knock it out with `mix-blend-mode: multiply` on the light ground only, and render the wordmark as text on the dark ground instead. | Render the company name as text in Fraunces 600, letter-spacing -0.01em. Do not draw a placeholder box. |
| `product.jpg` | 1, Title | Full-bleed panel occupying the right 44 percent of the stage, hard vertical edge at the boundary, no rounded corners, no gradient scrim over it. `object-fit: cover`, `object-position: center`. | Slight desaturation (`filter: saturate(0.92)`) so the chlorosis yellow in the interface stays the brightest thing on screen. | Collapse to a single-column title with the headline at 1.15x size. Do not substitute a stock image. |
| `field-trials.jpg` | 3, Value proposition | Lower right, 340px wide, 4:3 crop, sitting below the pH ruler. | Caption beneath in 15px: "Field trials, Iran. Four crops, root-zone application." Clickable, opens the lightbox at full size. | Omit the image and widen the pivot-risk box to fill the column. |
| `process-flow.jpg` | 4, Solution | Right rail, 100 percent of rail width, below the three process steps. | Clickable, opens the lightbox. This is a diagram, so preserve it exactly: no crop, `object-fit: contain`, on a `--paper` background tile so a white-background diagram does not float on the dark ground. | Omit. The three numbered steps carry the content on their own. |
| `lab-results.jpg` | 4, Solution | Evidence strip along the bottom of the slide, 180px wide thumbnail sitting to the left of the assay figures. | Clickable, opens the lightbox. This is the proof artefact for 65,222 mg/L, so the lightbox caption must read: "SPECTRO elemental assay, sample MR KALATE, 11 May 2023. Two runs: 65,098.9 and 65,345.6 mg/L." | Keep the numeric strip, drop the thumbnail. |

**Asset gap to flag to the client, not to solve in code.** There is no photograph of iron chlorosis in a Canadian crop. The Problem slide is the emotional centre of the deck and it is carrying no image. A single photograph of a yellowing calibrachoa basket, taken on the Scott's Nursery walk-in, would be the highest-value asset in the entire deck. Build the Problem slide so a `problem-chlorosis.jpg` can be dropped into `assets/` later and picked up automatically: if the file exists, it fills the right 38 percent of the slide as a full-bleed panel and the text column narrows to 62 percent; if it does not exist, the `CostBar` visual expands to take that space. Implement this as a build-time glob, not a runtime 404 check.

---

## 4. Design system

### 4.1 The concept

The deck is about telling proven things apart from unproven things, in a crop disease whose symptom is that green tissue turns yellow while the veins stay green. So the palette is the disease, and it carries meaning rather than decoration:

- **Green means proven.** Anything with a cited source.
- **Chlorotic yellow means unproven.** Every `[assumption]` tag, every dashed line, every hatched region.
- **Iron oxide rust means us.** The company, the product, the single call to action.

Hold this rule absolutely. A viewer should be able to learn it in five seconds on slide 1 and then read the honesty of the whole deck at a glance. Do not use yellow for emphasis, do not use green for decoration, do not tint anything rust that is not the company.

### 4.2 Colour tokens

```css
:root {
  --ink:        #16261E;  /* deep pine. Dark slide ground and all body text on light */
  --glass:      #E4E8E2;  /* pale glasshouse grey-green. Light slide ground */
  --paper:      #F2F4EF;  /* raised surfaces, image tiles, lightbox backdrop panels */
  --vein:       #2F6B45;  /* proven. Evidence marks, confirmations, healthy state */
  --chlorosis:  #E8C33A;  /* unproven. Assumption tags, dashed extensions, hatching */
  --amber-deep: #7A5C06;  /* the ONLY yellow permitted for text on a light ground */
  --iron:       #9C4A24;  /* the company, the product, the one CTA */
  --slate:      #62706A;  /* secondary text, captions, source lines */
}
```

Contrast rules that are not negotiable: `--chlorosis` is a fill and a rule colour, never a text colour on `--glass` or `--paper`. Assumption text on a light ground uses `--amber-deep`. Assumption text on `--ink` may use `--chlorosis` directly. Every text pairing in the build must clear WCAG AA at its rendered size.

Ground assignment per slide, alternating so the deck has rhythm: slide 1 `--ink`, slide 2 `--glass`, slide 3 `--ink`, slide 4 `--glass`, slide 5 `--ink`.

### 4.3 Type

Two families only.

- **Fraunces** (variable, Google Fonts) for headlines and display numerals. Set `font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 88;` at display sizes and weight 600. Fraunces is a soft, agricultural serif and it is doing the warmth in a deck that is otherwise clinical.
- **IBM Plex Sans** for everything else, including all data. Enable `font-variant-numeric: tabular-nums` globally on numeric spans so figures align in columns.

No third family. No monospace. Small data labels in monospace is a generic tell and this deck does not need it.

Type scale, on a 1600 by 900 design canvas, scaled by the stage transform:

| Role | Size / line-height | Family, weight | Tracking |
|---|---|---|---|
| Slide headline | 62px / 1.06 | Fraunces 600 | -0.018em |
| Deck headline (slide 1) | 78px / 1.02 | Fraunces 600 | -0.022em |
| Lead paragraph | 25px / 1.5 | Plex Sans 400 | -0.004em |
| Body | 19px / 1.58 | Plex Sans 400 | 0 |
| Data figure | 44px / 1.0 | Fraunces 600, tabular | -0.015em |
| Data label | 15px / 1.35 | Plex Sans 500 | 0.005em |
| Caption and source | 14px / 1.45 | Plex Sans 400, `--slate` | 0 |
| Assumption tag | 14px / 1 | Plex Sans 600 | 0.01em |

Measure: no body text column exceeds 68 characters. Enforce with `max-width: 62ch` on paragraph containers.

### 4.4 Layout

A fixed 1600 by 900 stage, transform-scaled to fit the viewport with letterboxing, so what the presenter sees on a laptop is exactly what the projector shows. Do not build a responsive fluid layout for the slides themselves; build one scaler.

```
+----------------------------------------------------------------+
|  96px outer margin, all sides                                   |
|                                                                 |
|  12 columns, 72px gutter, inside a 1408px content width         |
|                                                                 |
|  Everything left-aligned. No centred text anywhere in the deck  |
|  except the video slide's player caption.                       |
|                                                                 |
+----------------------------------------------------------------+
|  Footer rail, 56px: logo, slide title, progress, slide n of 5   |
+----------------------------------------------------------------+
```

Vertical rhythm on an 8px base. Section gaps of 40px, block gaps of 24px, tight pairs at 8px.

### 4.5 Prohibited treatments

These are the tells that make a deck look machine-made. Do not use any of them:

- Tracked-out all-caps eyebrow labels above headings.
- Meta strings joined with middle dots, such as "A · B · C". Use commas or separate lines.
- An arrow appended to link or button text.
- Identical rounded cards with the same soft grey shadow under each. This deck uses **one** border-radius value, 3px, and shadows only on the lightbox.
- Gradient washes as decoration. The only gradient permitted in the entire build is the fade on the pH ruler's unproven extension, described in Section 7.1.
- Accenting a single word of a headline in a different colour.
- Fade-and-slide-up entrances on every element. Motion rules are in Section 8.

---

## 5. Slide content, final copy

Copy is approved. Set it verbatim in `src/content/slides.ts`. `[assumption]` markers indicate where the `Claim` component wraps the preceding statement. Do not print the literal string `[assumption]` in the rendered output; render the component described in Section 6.

### Slide 1, Title

**Ground:** `--ink`. Left 56 percent text, right 44 percent `product.jpg` full-bleed.

**Headline (Fraunces 78px):**
> Iron fertilizer plants can actually absorb, made in 20 minutes instead of 12 hours.

**Identity line (21px, `--paper`):**
> Mazdak Atlantic AgriAqua Inc. Incorporated in New Brunswick, GST and HST registered. Pre-revenue and self-funded.

**Evidence row.** Four items in a single row, each prefixed with a 10px `--vein` square, label 15px:
> 65,222 mg/L iron, independent SPECTRO assay
> Nano particle size confirmed by DLS
> Gold Medal and two special awards, iCAN 2026
> Mitacs Accelerate grant with UNB

**Honesty bar.** Bottom of the text column, a 3px `--chlorosis` left rule with 20px text in `--paper`:
> What we do not have yet: a Canadian trial, a Canadian customer, or CFIA registration. This deck tells you which claims are which.

**Footer:** Shadow Institute, Week 2, 23 September 2026.

The honesty bar on the title slide is a deliberate strategic choice, not a disclaimer. It buys the room's trust before the first claim is made and it sets up the assumption-tag system. Do not soften it, shrink it, or move it below the fold.

### Slide 2, Problem

**Ground:** `--glass`.

**Headline:**
> A yellow basket does not sell at any price.

**Lead:**
> Independent Maritime greenhouses irrigate from bicarbonate-rich wells. Across a ten-week crop those bicarbonates push soilless media pH up past 6.0. Calibrachoa and petunia need 5.4 to 6.0. Above that band the iron in the pot locks up, leaves yellow between the veins, and the plant misses a ship date that cannot move.

Source line under the lead, 14px `--slate`: `UC Nursery and Floriculture Alliance; Purdue HO-242-W`

**Second paragraph:**
> Most of the year's revenue arrives in that ten-week spring window. `[assumption]`

**Three response columns**, under a 19px lead "What growers do about it today", each column a heading at 19px Plex Sans 600 and one line of body:

1. **Acid injection.** Sulfuric acid metered into the irrigation line to strip bicarbonates before they reach the pot. (proven)
2. **Corrective drench.** An iron chelate drench, typically Fe-DTPA, repeated every three to four weeks once chlorosis appears. (proven)
   Source line: `BASF Sprint label; UConn Extension greenhouse IPM message`
3. **Cull the crop.** Smaller operations throw the yellow plants away. `[assumption]`

**The reframe box.** Right column, bordered 1px `--ink` at 20 percent opacity, 28px padding:
> We are not claiming New Brunswick has alkaline farmland. Atlantic Canadian field soils are naturally acidic and are limed to raise pH, which makes iron more available outdoors, not less. The problem we sell into lives in soilless container media and in irrigation water chemistry, and it shows up regardless of the soil outside the greenhouse. We dropped the alkaline-soil framing in Week 2.
>
> Source line: `Government of New Brunswick potato soil management guidance; The Status of Agricultural Soil Health in New Brunswick, 2023`

This paragraph exists because it is the first question an agronomist on the panel will ask. Answering it before it is asked is worth more than any other 60 words in the deck. Give it real estate.

**Cost figures**, rendered by `CostBar`, see Section 7.2:
- Total annual cost of the problem across NB, NS and PEI: **$0.8M to $2.0M** `[assumption]`
- Of which crop lost or discounted, not product purchased: **85 to 90 percent**
- Out-of-pocket spend on iron products and water acidification: **$0.07M to $0.30M**

Footnote, 14px: `Sector base from AAFC Statistical Overview of the Canadian Ornamental Industry, 2023. The share of greenhouse shrink caused by iron chlorosis has no free published source and is assumed at 10 to 25 percent. It drives most of this range.`

### Slide 3, Value proposition

**Ground:** `--ink`. This is the deck's centre of gravity. Give the pH ruler the top 46 percent of the stage.

**Headline:**
> Standard EDTA quits at pH 6.5. That is where our customer's problem starts.

**The pH ruler** sits immediately below the headline. Full spec in Section 7.1.

**Left column below the ruler, the claim:**
> For a grower whose media has already drifted and whose baskets are already yellowing, the cheapest chelate on the shelf is out of range before it goes in the tank. Our claim is that the microwave and UV process produces an EDTA-chelated nano iron that stays plant-available above that line. `[assumption]`

**Middle column, what we hold:**
Heading: "The evidence behind the claim"
> Field trials on four crops in Iran, where agricultural soils are typically calcareous and alkaline, commonly pH 7.5 to 8.5 regionally. Pomegranate, olive, sweet corn and hybrid rose. Results showed improved plant health and greening.
>
> The iron was applied to the root zone, not as a foliar spray, confirmed by Dr. Kalateh on 23 September 2026. This matters: foliar iron greens a crop regardless of soil chemistry, so a foliar result would have proved nothing about pH. Root-zone application means the iron had to stay plant-available through the soil solution, which is the same pathway as the Canadian container case.

**Middle column continued, what we do not hold:**
> Exact soil pH values were not recorded at the Iranian sites. `[assumption]`
> The mechanism that extends EDTA's effective pH range is not characterised, and may relate to the nano particle fraction rather than to chelate stability. `[assumption]`

**Right column, the pivot box.** 1px `--chlorosis` border, `--ink` fill, 28px padding:
> This is a pivot point, not a data point.
>
> If the first Canadian trial does not confirm extended-pH performance against actual recorded readings, we are a conventional Fe-EDTA competing on price in a segment that spends under $0.3M a year on iron, and the target market gets rebuilt rather than refined.
>
> We would rather you heard that from us than found it in diligence.

`field-trials.jpg` sits under the left column with its caption.

### Slide 4, Solution and the underlying magic

**Ground:** `--glass`. Video occupies the left 58 percent.

**Headline:**
> Twenty minutes, not twelve hours.

**Video panel.** Full spec in Section 7.3.

**Right rail, the process.** This content genuinely is a sequence, so numbered markers are justified here and only here. Numerals in Fraunces 600 at 34px, `--iron`:

1. **Microwave and UV energy create localised hot spots** inside the reaction vessel.
2. **The chelation reaction runs to completion in about twenty minutes,** against twelve hours or more in conventional high-pressure, high-temperature reactors.
3. **A full production cycle takes roughly three hours.** Same chemistry, a fraction of the energy, a fraction of the plant footprint.

Tag the whole three-step block once: `[assumption]` with the note "Verified in our own pilot production. Not yet reproduced in Canada."

`process-flow.jpg` sits below the three steps.

**Founder line, 19px:**
> Dr. Ali Kalateh, inorganic chemist, career in industrial inorganic production lines, patents on related processes.

**Evidence strip** along the bottom of the slide, full width, `--paper` tile, containing `lab-results.jpg` thumbnail and two figures set as data figures at 44px:
- **65,222 mg/L** iron concentration. Label: `Independent SPECTRO elemental assay, 11 May 2023. Two runs, 65,098.9 and 65,345.6 mg/L.` Green `--vein` proven mark.
- **Nano range** particle size. Label: `Confirmed by Dynamic Light Scattering, size dispersion by intensity, volume and number.` Green `--vein` proven mark.

**Cost consequence line**, 19px, right of the strip:
> Less energy and a smaller plant is where the modelled production cost of CAD 10 per litre comes from. That figure has not survived a Canadian production run. `[assumption]`

### Slide 5, Business model

**Ground:** `--ink`. Three columns.

**Headline:**
> Sell the litre. Buy the reference.

**Column one, how we make money:**
> **CAD 25 per litre** of concentrate, sold direct. `[assumption]`
> **CAD 10 per litre** modelled production cost. `[assumption]`
>
> Direct to growers first, then through input dealers: Halifax Seed, Plant Products, Cavendish Agri Services. `[assumption]`
>
> The owner signs a trial alone, often on the same call. A purchase order passes two further gates: the grower's existing input dealer rep, and our CFIA registration status. `[assumption]`

**Column two, the honest ceiling.** This column is the reason the panel will believe the rest of the deck.
> Heading: What this market can actually pay us
>
> Total annual cost of the problem across the Maritime segment is **$0.8M to $2.0M**, and 85 to 90 percent of that is lost crop rather than purchased product. The hard ceiling is tighter: the segment's entire fertiliser bill, all nutrients combined, is **$0.7M to $0.9M** a year, and any iron revenue here comes out of that pool.
>
> At CAD 25 per litre, capturing one hundred percent of current spend is about **12,000 litres a year**.
>
> So the Maritimes is a proof market, not a revenue market. It is cheap to reach, fast to trial, and it is where we buy two things we cannot buy anywhere else: Canadian references and a container application rate.

**Column three, where revenue scales:**
> Heading: Where the revenue is
>
> **Ontario.** About half of national floriculture production sat in Ontario in 2022. National floriculture sales were $2.24 billion in 2024. `[assumption]` that this segment converts on the same proposition.
>
> **Controlled-environment cannabis.** New Brunswick cannabis farm cash receipts were $254.3M in 2024, roughly four times floriculture, nursery and sod combined. High irrigation-water alkalinity raises substrate pH in container cannabis and iron deficiency is the primary resulting problem, more acute in small root volumes and long cycles. Iron-specific spend in that segment is not quantified. `[assumption]`
>
> Source line: `AAFC Statistical Overview 2024; GNB statistical commodity review; Cannabis Business Times`

**Footer strip**, full width, 1px top rule `--chlorosis` at 40 percent, 15px text:
> Withdrawn this week, on our own initiative: the CAD 9.375M Year 3 revenue scenario, and the claim of roughly 25 percent lower cost per gram of iron than Sprint 330, which compared across chelate classes and was not like for like. Still open: CFIA registration remains unpriced and unscheduled, and it moves ahead of first production in the plan.

Putting the withdrawals on the slide is intentional. A panel that sees a founder retract her own numbers before being asked stops auditing and starts listening.

---

## 6. The assumption system

The client's requirement is that every unproven claim is tagged. Do not treat this as a footnote convention. Build it as the deck's signature interaction, because it converts the deck's biggest weakness, a pre-revenue company with no Canadian data, into a visible demonstration of rigour.

### 6.1 The `Claim` component

```tsx
<Claim id="price-25" kind="assumption">CAD 25 per litre</Claim>
<Claim id="assay" kind="evidence" source="SPECTRO assay, 11 May 2023">65,222 mg/L</Claim>
```

**Assumption rendering.** The wrapped text keeps its normal colour. Beneath it sits a 2px dashed underline in `--chlorosis` (on `--ink`) or `--amber-deep` (on `--glass`), offset 5px. Immediately after the text, a small tag: a 1px bracket outline containing the word `assumption` at 14px weight 600. Not a pill, not a badge with a background fill, and not all caps.

**Evidence rendering.** A 10px solid `--vein` square before the text. No underline, no tag. Proven things should feel quiet; unproven things should announce themselves.

### 6.2 The hover and focus card

Hovering or keyboard-focusing an assumption opens a small card, 320px wide, `--paper` on light grounds and a lifted `--ink` panel on dark, 3px radius, one soft shadow. It contains one line: how this claim gets proven.

Populate from `src/content/claims.ts`:

| id | Claim | How it gets proven |
|---|---|---|
| `spring-window` | Most revenue arrives in a ten-week window | Discovery calls, five growers before Gate 1 on 7 October |
| `culling` | Smaller operations cull instead of treating | Discovery calls |
| `problem-cost` | $0.8M to $2.0M annual cost | Ask every call: what share of baskets was lost or discounted to yellowing last spring |
| `ph-extension` | Our process extends EDTA's usable pH range | Controlled pH-response test with recorded readings, first Canadian trial |
| `iran-ph` | Iranian trial site pH values | Recorded trial protocol requested from Dr. Kalateh and the cooperative partners |
| `mechanism` | The mechanism behind the pH extension | Characterisation work, may relate to the nano fraction rather than chelate stability |
| `process-time` | Twenty-minute reaction, three-hour cycle | Verified in our own pilot production. A Canadian batch at UNB reproduces it |
| `cost-10` | CAD 10 per litre production cost | One Canadian production batch converts this from modelled to measured |
| `price-25` | CAD 25 per litre selling price | Quoted Maritime dealer prices from Halifax Seed, Plant Products, Cavendish Agri Services |
| `channel` | Direct then dealers, and the two purchase gates | Input dealer calls, and a CFIA fertilizer safety section call on the registration pathway |
| `ontario` | Ontario converts on the same proposition | Not yet tested. Sequenced after the Maritime proof |
| `cannabis` | Cannabis iron spend | Not quantified. Requires a licensed producer conversation |

### 6.3 The audit key

Pressing **A** toggles audit mode across the whole deck. In audit mode every assumption on the current slide fills solid `--chlorosis` behind the claim text, with the text switching to `--ink` for contrast, and a counter appears in the footer rail reading for example "4 unproven claims on this slide, 12 in the deck."

This gives the founder a live move in the room: "Let me show you exactly what I have not proven yet." It is the single most valuable feature in this build. Make it fast, make it obvious, and show the keyboard hint on slide 1 for six seconds after load.

Audit mode state persists across slides within the session. It resets on reload. Do not use browser storage.

---

## 7. The three custom visuals

### 7.1 `PhRuler`, slide 3, the signature element

A horizontal pH scale from 5.0 to 8.0, spanning 1200px. This is the one place in the deck where boldness is spent. Everything else stays disciplined so this can be loud.

```
 5.0        5.4                6.0        6.5                       8.0
  |----------|==================|----------|.......................|
             [  crop needs      ]
             [  5.4 to 6.0      ]
  [========= standard Fe-EDTA holds iron =========]
                        [ // customer's media has drifted here // ]
                        [ ...... our claim, unproven ............ ]
```

Four bands, stacked, each 34px tall with 12px separation:

1. **Crop requirement band, 5.4 to 6.0.** Solid `--vein` at 85 percent opacity. Label: "Calibrachoa and petunia need this band." Proven.
2. **Standard Fe-EDTA effective range, 5.0 to 6.5.** Solid `--paper` at 22 percent opacity with a 1px `--paper` outline. Label: "Standard Fe-EDTA holds iron to roughly here." Proven.
3. **Customer's drifted media, 6.0 to 7.2.** Diagonal hatching, 6px pitch, `--chlorosis` at 55 percent on transparent. Label: "Where our customer's media actually sits." This band is the problem.
4. **Our claimed range, 6.0 to 8.0.** A dashed 2px `--chlorosis` outline with a fill that starts at 30 percent opacity at 6.0 and fades to 0 at 8.0. Label: "Where we claim to still work," followed by the `assumption` tag. The fade is literal: the further past the proven line the claim reaches, the less substance it has on screen.

Band 4's dashed outline draws itself left to right over 900ms with a 200ms delay, once, the first time slide 3 becomes active. That is the deck's only non-user-triggered motion. Respect `prefers-reduced-motion` by rendering it complete.

The vertical gridline at 6.5 is 1px solid `--paper` at 50 percent, full height of the stack, labelled at the top: "Standard EDTA stops working." The vertical at 6.0 is 1px `--chlorosis`, labelled: "Problem starts."

Render as inline SVG with a real `<title>` and `<desc>` for screen readers, and a visually-hidden text equivalent of the four bands.

### 7.2 `CostBar`, slide 2

A single horizontal stacked bar, 100 percent width of its column, 72px tall, showing the composition of the problem's cost. Not a pie, not a donut.

- Segment one, 85 to 90 percent: **lost or discounted crop**, filled `--chlorosis` at 70 percent with the same diagonal hatch used on the ruler, because this portion is the assumed one.
- Segment two, 10 to 15 percent: **iron products and water acidification**, filled solid `--iron`.

Labels sit outside the bar with leader rules, not inside it. Beneath the bar, one line in 19px:
> Only the small segment is money growers currently hand to a supplier. The large segment is the prize, and it is also the number we are least sure of.

That sentence is the whole commercial insight of the market note. Do not cut it.

### 7.3 `VideoPanel`, slide 4

**Primary source, YouTube, unlisted:** `https://youtu.be/0NdO6-vzsBk`
**Embed URL:** `https://www.youtube-nocookie.com/embed/0NdO6-vzsBk?rel=0&modestbranding=1&playsinline=1`

Requirements:

- 16:9, occupying the left 58 percent of the stage, 3px radius, 1px `--ink` border at 15 percent.
- Lazy-mount: render a poster frame with a play control until first interaction, then swap in the iframe with `autoplay=1` appended. This keeps the deck load instant and stops YouTube's network calls from running on every slide change.
- Use `product.jpg` as the poster frame if the video thumbnail is not retrievable, with a 40 percent `--ink` scrim and the play control centred.
- `allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"` and `allowfullscreen`.
- **Pressing space or arrow keys while the player has focus must not advance the slide.** Trap keyboard events inside the video panel while it is focused, and surface a small hint: "Press Escape to return to slide controls."
- Caption beneath the player, 15px `--slate`: "Product and process demonstration. Two minutes." Adjust the duration once the real runtime is known.

**Offline and access fallback, both required:**

1. Unlisted YouTube videos only embed if embedding is enabled on the video. Verify this in YouTube Studio before the dry run on 30 September. If it is off, the player renders "Video unavailable" in the room, which is a bad moment on the most important slide. Build a `videoAvailable` check: if the iframe fails to load within 4 seconds, swap to the poster frame with a visible link.
2. The SharePoint copy at `https://unbcloud-my.sharepoint.com/:v:/g/personal/n57c3_unb_ca/EQlMFar4VB1InDeav-jjdisBoTNK7C-VbgA8pfuoWe0WKQ` requires a UNB sign-in and **cannot be embedded**. Do not attempt it. Render it as a secondary text link beneath the caption labelled "Alternative source, UNB SharePoint, sign-in required."
3. Strongly recommend to the client: place a local copy at `assets/demo.mp4` and have the component prefer a native `<video>` element when that file exists. A deck that does not depend on the venue's wifi is worth the file size. Implement the preference order as local file, then YouTube, then poster and link.

---

## 8. Interaction and presenter features

**Must build:**

- Navigation: Right arrow, Left arrow, Space, Page Up, Page Down, Home, End. On-screen controls appear on mouse move and fade after 2.5 seconds.
- Hash deep links, `#/1` through `#/5`, so the founder can open on any slide.
- `ProgressRail` in the footer: five segments, the active one filled `--iron`, the rest 1px outlines. Clickable.
- Audit mode, key **A**, per Section 6.3.
- Presenter notes, key **N**, opening a panel over the lower third with the speaking notes for the current slide. Content in `slides.ts` under a `notes` field. Write one honest note per slide covering the likeliest hostile question:
  - Slide 1: "If asked why pre-revenue matters less than it looks, point at the evidence row. The chemistry is proven. The market is not."
  - Slide 2: "The agronomy question about acidic Atlantic soils is coming. The reframe box answers it. Let them read it."
  - Slide 3: "Do not oversell. The pivot box is the answer to 'what if you are wrong'. Read it aloud if the question comes."
  - Slide 4: "If asked whether twenty minutes has been reproduced in Canada, the answer is no, and UNB plus the Mitacs grant is the route."
  - Slide 5: "If asked why start in a market this small, the answer is references and an application rate, not revenue."
- Lightbox for `field-trials.jpg`, `process-flow.jpg`, `lab-results.jpg`. Escape closes, focus returns to the trigger.
- Print stylesheet: five pages, landscape, one slide per page, dark grounds inverted to `--glass` so it does not burn a printer. Video panel replaced by the poster plus the URL as visible text. Assumption tags print as visible bracketed text.

**Motion budget.** Slide transitions are a 220ms horizontal translate with no fade and no easing flourish. The pH ruler draw is the only autonomous animation. Hover states are instant colour changes, not transitions. Everything respects `prefers-reduced-motion: reduce`.

**Accessibility floor.** Each slide is a landmark region with an `aria-label` of its title. Slide changes announce in a polite live region. All interactive elements reach 3:1 contrast on their focus ring, drawn in `--iron` at 2px offset 2px. Every image has real alt text describing what it shows, not its filename.

---

## 9. Content integrity rules

Hard-code nothing that could drift out of sync with the data room:

- All copy in `src/content/slides.ts`, typed with a `Slide` interface. No strings in JSX.
- All claim metadata in `src/content/claims.ts`.
- All sources in `src/content/sources.ts`, keyed, so a source line is `sources.aafc2023` rather than a retyped citation.
- The chemistry constant per Section 1.

Do not round, restate or "clean up" a figure. `65,222 mg/L` is not `65,000`. `$0.07M to $0.30M` is not `$0.1M`. Ranges stay ranges because the underlying estimates are ranges, and collapsing them to a point estimate is exactly the error this deck is trying to avoid making.

---

## 10. Typography and copy voice

Sentence case everywhere, including headings. No exclamation marks. Active voice. The deck's voice is a scientist who is unusually honest about what she has not yet measured, which is both the client's real register and the most persuasive posture available to a pre-revenue company.

Per the client's standing preference: **no em dash characters anywhere in the build**, including code comments, alt text, presenter notes and generated content. Use a comma, a period, parentheses, or restructure the sentence. Configure a lint rule or a pre-commit grep for the character so it cannot slip in.

---

## 11. Never include

These were withdrawn or contradicted in the client's own data room. Reintroducing any of them would be a diligence failure.

1. **DTPA as the company's chemistry.** The chelate is EDTA. See Section 1.
2. **The CAD 9.375M Year 3 revenue figure.** Withdrawn. It was a straight five-times scale of the self-funded plan with no recalculated cost base.
3. **"Roughly 25 percent cheaper per gram of iron than Sprint 330."** Withdrawn as a cross-chelate-class comparison that is not like for like. Fe-EDTA is generally the cheapest class per gram of iron, so the honest comparison is likely less favourable.
4. **"Canadian crop micronutrients market, USD 175.4M" as the addressable market.** Traceable to a paid report, not independently verifiable, and its own summary says cereals and grains are nearly half of it with zinc the largest element. Not a measure of this company's market.
5. **"North American micronutrient fertilizer market, USD 1.3B, 8 to 9 percent growth."** No free primary source was found.
6. **The five-segment market allocation table** (40 percent commercial crop farms, 25 percent greenhouses, and so on). Percentages assigned to segments nobody has spoken to.
7. **Any claim that Atlantic Canadian field soil is alkaline.** It is acidic and limed. Slide 2's reframe box is the approved treatment.
8. **"No competition."** Never. The competitive set is Fe-EDTA products and it has not been named yet.
9. **The reforestation and "Grow and Give" commitment.** Good for the brand, not for this deck.
10. **Any invented grower name, testimonial, logo wall, or trial result.** No Canadian grower has been contacted. Do not render a "trusted by" strip.

---

## 12. Acceptance checklist

Build is done when all of these pass:

- [ ] Five slides, reachable by keyboard, hash-linkable, no console errors.
- [ ] The word EDTA appears as the company's chemistry; DTPA appears only as a product growers currently buy.
- [ ] Every claim in Section 5 marked `[assumption]` renders the dashed tag, and every one has a "how this gets proven" line on hover and on keyboard focus.
- [ ] Pressing A highlights all assumptions and shows a count. Pressing A again clears it.
- [ ] The pH ruler renders four bands correctly, the unproven band fades out to the right, and it draws once on first view.
- [ ] The video plays inline on slide 4 without leaving the deck, and keyboard focus inside the player does not advance slides.
- [ ] With the network disabled, the deck still loads, fonts fall back legibly, and the video panel shows the poster and a link rather than an error.
- [ ] All five images from `assets/` appear in their assigned slots, and removing any one of them degrades gracefully per Section 3.
- [ ] Dropping a `problem-chlorosis.jpg` into `assets/` changes the Problem slide layout as specified.
- [ ] No em dash character exists anywhere in the repository.
- [ ] Print to PDF produces five clean landscape pages with assumptions still visible as text.
- [ ] Every text and background pairing clears WCAG AA. Chlorosis yellow is never used as text on a light ground.
- [ ] Nothing from Section 11 appears anywhere in the build.
- [ ] The deck renders identically at 1280 by 720, 1920 by 1080, and on a 16:10 laptop with letterboxing.

---

## 13. Source register

| Key | Source |
|---|---|
| `aafc2023` | AAFC, Statistical Overview of the Canadian Ornamental Industry, 2023 edition, reproducing Statistics Canada tables |
| `aafc2024` | AAFC, Statistical Overview of the Canadian Ornamental Industry, 2024 edition |
| `gnbReceipts` | Government of New Brunswick, statistical commodity review, farm cash receipts 2023 to 2024 |
| `gnbSoil` | Government of New Brunswick, potato soil management guidance; The Status of Agricultural Soil Health in New Brunswick, 2023 |
| `ucanr` | UC Nursery and Floriculture Alliance, substrate pH and bicarbonate-driven pH rise |
| `purdue` | Purdue Extension HO-242-W |
| `basf` | BASF Sprint 138 and Sprint 330 label, greenhouse drench rates |
| `uconn` | UConn Extension, greenhouse IPM message, April 2022, iron chelate drench frequency |
| `cbt` | Cannabis Business Times, Alkalinity Control for Container-Grown Cannabis |
| `spectro` | SPECTRO elemental assay, sample MR KALATE, 11 May 2023 |
| `dls` | Dynamic Light Scattering particle size analysis, company technical file |
| `kalateh` | Dr. Ali Kalateh, co-founder, confirmed 23 September 2026, root-zone application method and EDTA chemistry |

Full URLs for S1 through S17 are in Data Room 03, Market Size Note. Do not print URLs on the slides. The source register exists so the founder can answer "where is that from" instantly, so surface it as a key press **S** opening an overlay list, not as slide furniture.

---

## 14. Note to the founder, not to Claude Code

Three things this deck cannot fix, in order of how fast they will come up in the room:

1. **The pH-response test is the company.** Section 5, slide 3 states this plainly, which is the right call, but it also means the deck has a single point of failure and the panel will see it. Every week that passes without a recorded pH reading, this deck gets weaker. It is the cheapest experiment in the plan and it outranks further outreach.
2. **CFIA is still unpriced and unscheduled,** and it is carried forward unresolved from Data Room 01. One phone call to the fertilizer safety section produces a pathway, a fee schedule and a clock. An investor reads an unscheduled regulatory gate as a governance signal, not a scheduling detail.
3. **The founder relocation and IP-custody question** is not in this deck at all, by design, because five slides cannot carry it. It will be asked. Have the answer on a card.
