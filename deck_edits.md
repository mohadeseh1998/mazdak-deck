# Deck edits for Claude (Mazdak Atlantic AgriAqua)

Task for Claude: apply every edit below to the slide deck running at localhost:5173. Do not change anything that is not listed. Keep the existing layout, fonts and animations unless an edit says otherwise. After editing, tell me which file(s) you changed.

## Global rules
- Do not use the em dash character anywhere in the deck.
- New edits are appended to this file, one section per slide. Apply all of them in order.

---

## Slide 2 (route `#/2`): Canada market size

Find the slide that currently shows "$0.8M to $2.0M". Replace its text and number with the content below. Keep the existing layout, fonts and animations. Use the existing "evidence" tag style (green dot and green text) used on other slides, in place of the yellow "assumption" tag.

### New content (English)
- Headline: A yellow basket does not sell.
- Subtitle: Bicarbonate-rich well water pushes greenhouse pots past pH 6.0, and the iron locks up.
- Big number, line 1: USD 1.5B
- Big number, line 1 label: North America micronutrient fertilizer market, 2025
- Big number, line 2: about USD 190M
- Big number, line 2 label: Canada share (12.8%), all nutrients. Iron is one part of it.
- Tag: evidence
- Small source note under the tag: Paid-research estimates (GM Insights). Canada = 12.8% x USD 1.5B. Iron-only figure not yet known. To be verified in IBISWorld.

### Rules for slide 2
- The tag must read "evidence" (green dot), not "assumption".
- Do not present USD 190M as an iron-only market.

---

## Slide 3 (route `#/3`): "Standard EDTA stops at pH 6.5."

### Edit 1: Change the tag on "Our claim"
- Current: the "Our claim" label carries a yellow tag that reads "assumption".
- Change: replace the tag text "assumption" with "evidence".
- Also change the tag styling to match the existing "evidence" style used on other slides (green dot and green text instead of the yellow dot and yellow text).
- If the dashed yellow underline on "Our claim" and the dashed yellow outline on the bar are there only to mark an assumption, switch them to the same treatment used for evidence items on other slides (solid, not dashed).

### Edit 2: Remove the bottom line
- Delete the text "The first Canadian trial decides it." from the bottom of the slide.
- Remove any empty space or wrapper element left behind so the layout stays balanced.

### Keep unchanged
- Headline: "Standard EDTA stops at pH 6.5."
- Subtitle: "Our customers' pots are already past it."
- The gray "Standard EDTA" bar and the pH axis (5, 6, 6.5, 7, 8).
- The "Where customers are" zone.

### Reason for the edits (context only, not slide text)
The core point of the slide is that iron cannot be absorbed at high pH. Other iron products sold in Canada also precipitate at high pH, so the slide does not need a hedge tag or a "trial decides it" line.

---

## Slide 4 (route `#/4`): "20 minutes. Not 12 hours."

### Edit 1: Change the tag
- Current: a yellow tag reading "assumption" sits before the subtitle line.
- Change: replace the tag text "assumption" with "evidence".
- Match the existing "evidence" tag style used on other slides (green dot and green text instead of the yellow dot and yellow text).

### Edit 2: Shorten the subtitle
- Current subtitle: "Verified in our pilot. Not yet reproduced in Canada."
- New subtitle: "Verified in our pilot."
- Delete the sentence "Not yet reproduced in Canada." and keep the line centered.

### Keep unchanged
- Headline: "20 minutes. Not 12 hours."
- The video block and its caption ("Product and process demonstration. Two minutes." and the alternative source link).

---

## Edits added later
(Append new edits below this line, one section per slide.)

---

## Slide 5 (route `#/5`): "Sell the litre. Buy the reference."

### Edit 1: Remove the bottom text
- Delete the small gray text at the bottom of the slide: "Withdrawn this week: the CAD 9.375M Year 3 scenario and the Sprint 330 cost comparison."
- Remove any empty space or wrapper element left behind so the layout stays balanced.

### Keep unchanged
- Headline: "Sell the litre. Buy the reference."
- CAD 25 (Price per litre) and CAD 10 (Modelled cost per litre), with their tags.
- The line "The Maritimes earns references. Ontario earns revenue." and its tag.

---

## Slide 7 (route `#/7`): Competitors table

### Edit 1: Change the headline
- Current: "Our real competitor is cheap Fe-EDTA, and our real substitute is acid"
- New: "Our competitors are every type of iron fertilizer, from EDTA to EDDHA."
- Keep the same font size and centering. If it wraps, avoid breaking the word "EDTA" or "EDDHA" across lines.

### Edit 2: Acid injection row, Strength column
- Current: "Growers already own injectors" with a yellow "assumption" tag and dashed yellow underline.
- New text: "Cheap"
- Remove the tag and the dashed underline completely. Plain text, same style as the other untagged cells.

### Edit 3: Acid injection row, Weakness column
- Current: "Constant management; a corrective drench still needed once chlorosis appears"
- New text: "Acid can only be lowered to a point. Below a safe pH range it harms the plants, so it cannot be pushed far enough."
- No tag.

### Edit 4: Replace the "Our position" block at the bottom
- Remove the whole current block, including:
  - "Our position: Fe-EDTA chemistry with field evidence of working in alkaline soil, applied to the root zone" and its green "evidence" tag
  - "Whether it works above pH 6.0 in container media is not yet measured." with its yellow "assumption" tag and dashed underline
- Replace with this text, centered, same size as the old block, no tags, no dashed underline:

  "Our position: simple EDTA chelation, made with our novel process, gives a high quality product that is far more affordable and accessible for farmers and greenhouse growers of every size. Through our Mitacs Accelerate Entrepreneurship project, we will also prove that the fertilizer stays in solution, without precipitating, up to pH 8."

- Remove any empty space or wrapper left behind so the layout stays balanced.

### Keep unchanged
- Table header (Option, Strength, Weakness).
- Rows: Commodity Fe-EDTA via Maritime dealers, Sprint 330 (BASF Fe-DTPA), Sprint 138 (BASF Fe-EDDHA), Doing nothing, culling, and all their existing text and tags.
- Acid injection and acidifying fertiliser row label.

---

## Slide 8 (route `#/8`): Team slide

### Edit 1: Change the headline
- Current: "Chemistry, customer, and a lab to prove it in Canada"
- New: "Chemistry and customer: our team"

### Edit 2: Replace the initials circles with photos
- Replace the "MZ" circle with the photo file `Mohadeseh_phot.jpg`.
- Replace the "AK" circle with the photo file `Ali_Kalateh_photo.jpg`.
- Both photo files are provided next to this md file. Copy them into the project's public or assets folder, following whatever convention the project already uses for images, and reference them from there.
- Keep the same circle size, crop each photo to a circle with `object-fit: cover`, and keep the face centered. Add alt text: "Mohadeseh Zamani" and "Dr. Ali Kalateh".

### Edit 3: Update the role lines
- Mohadeseh Zamani: change "Co-founder, Customer, Regulatory and Ecosystem" to "Co-founder, CMO, Customer, Regulatory and Ecosystem".
- Dr. Ali Kalateh: change "Co-founder, Chemistry and Process" to "Co-founder, CEO, Chemistry and Process".

### Edit 4: Rewrite Dr. Ali Kalateh's description
- Current: "Inventor of the microwave-UV chelation route. Main reaction in about 20 minutes versus 12 hours or more in his own pilot production. [assumption] Product assays at 65,222 mg/L iron [evidence]"
- New text: "Inventor of the innovative process. Main reaction in about 20 minutes versus 12 hours or more in his own pilot production. [evidence] Product assays at 65,222 mg/L iron [evidence]"
- The first tag must change from yellow "assumption" to green "evidence", using the same evidence tag style as the rest of the deck.
- Remove the dashed yellow underline under "Main reaction in about 20 minutes versus 12 hours or more in his own pilot production."

### Edit 5: Remove two columns
- Remove the entire Dr. Paul Arp column (the "PA" circle, name, role line, description and its tags).
- Remove the entire "The gap we are hiring for" column (the dashed "+" circle, orange title and text).
- Re-center the remaining two columns (Mohadeseh and Ali) so the layout stays balanced, with no empty space left behind.

### Keep unchanged
- Mohadeseh Zamani's name and description text and its tags.
- Dr. Ali Kalateh's name.
- Fonts, colors and animations.

---

## Slide 9 (route `#/9`): Financial model, replace with Plan A (self-funded) figures

Source of the new figures: Plan A, Self-Funded Growth Model (Table 1 and Table 2 of the business plan). Use these numbers exactly.

### Edit 1: Change the headline
- Current: "A proof market first: small, real revenue from named customers"
- New: "Self-funded Plan A: break-even in about six months"

### Edit 2: Left panel, "Unit economics, all modelled"
- Keep the panel title and the three rows exactly as they are: Price CAD 25.00 (CAD 0.38 per gram of iron), Production cost CAD 10.00 (CAD 0.15), Gross margin CAD 15.00 (60%) (CAD 0.23), with their existing tags.
- In the empty space below the Gross margin row, add two plain lines in the same style as the row labels:
  - "Founder-funded capital: CAD 100,000"
  - "Break-even: about 7,500 litres (6 months)"

### Edit 3: Right panel title
- Current: "Years 1 to 3, built from customers"
- New: "Years 1 to 3, Plan A (self-funded)"

### Edit 4: Remove the Maritime ceiling line
- Delete the line "Maritime ceiling: CAD 300,000 a year, 100 percent of current spend" and the dashed line beneath it.
- Remove the empty space left behind so the layout stays balanced.

### Edit 5: Replace the bar chart values above the columns
Keep the three bars. Change the year labels to Year 1 Q4 2027 to Q3 2028, Year 2 Q4 2028 to Q3 2029 and Year 3 Q4 2029 to Q3 2030, so Year 1 starts right after the Q3 2027 quarter on slide 10. Change the values (revenue) and scale the bar heights proportionally:
- Year 1: CAD 375,000
- Year 2: CAD 750,000
- Year 3: CAD 1,875,000

### Edit 6: Replace the table rows
Delete all current rows (Paying customers, Litres per customer per year, Litres sold, Production cost, Gross margin, Share of Maritime ceiling). Use exactly these five rows, same table style:

| Row | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Production | 15,000 L | 30,000 L | 75,000 L |
| Revenue | CAD 375,000 | CAD 750,000 | CAD 1,875,000 |
| Total costs | CAD 230,000 | CAD 410,000 | CAD 950,000 |
| Net profit | CAD 145,000 | CAD 340,000 | CAD 925,000 |
| Cumulative cash flow (after CAD 100,000 founder capital) | CAD 45,000 | CAD 385,000 | CAD 1,310,000 |

### Edit 7: Update the notes so they match Plan A
- Keep the yellow "assumption" tag, but change the line next to it from "Every figure in this table is an assumption." to: "Every figure in this table comes from our Plan A self-funded financial model and is an assumption."
- Replace the bottom note (the one with the yellow vertical bar) with: "Plan A is a self-funded founders' model covering Canada as a whole, not one region. Price, cost and volumes are assumptions. No grower has been quoted the price and no batch has been produced in Canada yet. Price and cost will be replaced by a discovery-call price and a measured Canadian batch cost."
- Do not mention the Maritimes, a Maritime ceiling, named customers or customer counts anywhere on this slide.

### Edit 8: Add a short fundraising line
- Add one short line of text, centered, between the table note and the bottom note, in the same white text style as the bottom note but without the yellow vertical bar and without any tag:
  "Raising CAD 200K to CAD 2M would let us scale faster than self-funded Plan A."
- Do not add any new numbers, chart or table for the fundraising scenario.

### Keep unchanged
- Fonts, colors, animations and the overall two-panel layout.

---

## Slide 10 (route `#/10`): Where we are, timeline and ask

Source for the timeline: Table 3, Timeline for Product Launch (Month 1 = Q4 2026, so Month 2 to 4 falls in Q4 2026 and Q1 2027, Month 5 to 6 falls in Q1 2027). Plan A volumes come from the financial model on slide 9.

### Edit 1: Change the headline
- Current: "Where we are, the next four quarters, and one ask"
- New: "Where we are, the next four quarters, and our ask"

### Edit 2: Quarter columns
Keep the four quarter headings, the small "Next four quarters, targets not commitments" label, and the layout. Replace the text in each column as follows. Keep each description to at most five lines. The plan follows Table 3 but spreads the work so no quarter is overloaded. There are no sales and no production runs on this slide: selling starts only after Q3 2027, when Plan A Year 1 begins (slide 9).

**Q4 2026 (Oct to Dec)**
- Description: "Five grower conversations; new sample produced in Canada; CFIA pathway call to learn the registration route, fees and timeline; Fe-EDTA dealer quotes"
- Gate: replace "Import cleared with CFIA, CBSA and Global Affairs Canada (Iran sanctions)" with "New sample produced in Canada and validated". Keep the assumption tag and dashed underline.

**Q1 2027 (Jan to Mar)**
- Description: "UNB pH-response test with recorded pH at every step, up to pH 8; first container application rate; CFIA application prepared; website and marketing launch; first distributor conversations in NB and Ontario"
- Gate: replace "Pivot decision: extended-pH performance confirmed or not" with "pH-response result confirmed up to pH 8; CFIA route and fees known". Keep the assumption tag and dashed underline.
- Change the yellow dot and branching arrow marker at Q1 to the same white dot used for the other quarters.

**Q2 2027 (Apr to Jun)**
- Description: "Grower-site trial on calibrachoa and petunia across the spring shipping window; CFIA application filed; distributor onboarding in NB and Ontario"
- Gate: keep "Trial host signed; CFIA application filed" with its existing assumption tag and dashed underline.

**Q3 2027 (Jul to Sep)**
- Description: "Trial results written up; letters of intent; CFIA status known; Plan A Year 1 starts in Q4 2027"
- Gate: keep "LOI in hand; CFIA status known" with its existing assumption tag and dashed underline.

### Edit 3: "Today" line
- Keep the line and its green evidence tag exactly as it is.

### Edit 4: Replace "The ask"
- Keep the orange "The ask" label and the rounded box.
- Current text: "Introductions to Maritime greenhouse growers who grow calibrachoa or petunia baskets on well water and have seen yellowing in the last two seasons, so we can sign one trial host for spring 2027."
- New text: "Introductions to growers and distributors in New Brunswick and Ontario for our first trials, and investor conversations for a CAD 200K to 2M raise to accelerate Plan A."
- Do not mention the Maritimes anywhere on this slide.

### Keep unchanged
- Fonts, colors, animations and the overall layout.

---

## Slide 11 (route `#/11`): NEW slide, "Recognized before we shipped a litre"

Add a new slide after slide 10, using the same slide component, dark background, fonts, heading style, spacing and animations as the other slides. Do not copy the white background or green colors of any draft. Add it to the slide list and to the navigation dots so the deck has 11 slides.

Image files are in the folder `recognition_images` next to this md file. Copy them into the project's public or assets folder, following the project's existing convention for images, and reference them from there.

### Headline
- "Recognized before we shipped a litre"

### Layout
- Left side: one tall card for iCAN 2026. Right side: a 2 by 2 grid of four cards (BMO Apex 2025, Mitacs Accelerate, Planet Hatch and Ignite, Press).
- Cards use a subtle dark card style consistent with the deck. Each card has a small heading in white, and a short description in the deck's gray body text.
- Images sit at the top of the card with rounded corners and `object-fit: cover`. Nothing may overflow its card.
- No tags on this slide.

### Card 1 (left, tall): iCAN 2026
- Heading: "iCAN 2026"
- Description: "Gold Medal plus two international special awards (WIIPA and Romanian Inventors Forum) at the 11th International Invention Innovation Competition in Canada, Toronto, 29 August 2026."
- Main images: two gold medal photos side by side, one for each founder (both received the Gold Medal): `ican_gold_medal_1.jpg` and `ican_gold_medal_2.jpg`.
- Below them, a row of three small thumbnails: `ican_certificate_of_excellence.jpg`, `ican_wiipa_special_award.jpg`, `ican_fir_special_award.jpg`.

### Card 2: BMO Apex 2025
- Heading: "BMO Apex 2025"
- Description: "3rd place in the elevator pitch at UNB."
- Image: `apex_team.jpg`.

### Card 3: Mitacs Accelerate
- Heading: "Mitacs Accelerate"
- Description: "Entrepreneur grant with UNB, application at final stage."
- No image.

### Card 4: Planet Hatch and Ignite
- Heading: "Planet Hatch and Ignite"
- Description: "Endorsement letters from both."
- No image.

### Card 5: Press
- Heading: "Press"
- Description: "Featured by AllNewBrunswick."
- Images: two press screenshots side by side, one for each founder: `press_ali.jpg` (Dr. Ali Kalateh) and `press_mohadeseh.jpg` (Mohadeseh Zamani). Use `object-position: top` so the allNewBrunswick header stays visible on both.

### Rules
- Do not use the em dash character anywhere.
- Do not mention the Maritimes on this slide.
