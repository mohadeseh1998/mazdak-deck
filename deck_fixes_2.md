# Deck fixes, round 2 (Mazdak Atlantic AgriAqua)

Task for Claude: the edits in deck_edits.md are already applied. Apply only the three fixes below, then check each slide at localhost:5173 (#/3, #/8, #/11) and fix any overflow, cropping or gaps. Change nothing else. Do not use the em dash character anywhere. After finishing, list the files you changed.

---

## Slide 3 (route `#/3`): bring back the yellow "Our claim" bar

Problem: after the last edit, the yellow bar under "Our claim" disappeared. Only the label and the green "evidence" tag are left.

Fix:
- Restore the horizontal bar in the "Our claim" row, using the same height and rounded ends as the gray "Standard EDTA" bar.
- The bar is yellow, the same yellow the bar had before the edit.
- It spans from the pH 6 tick to the pH 8 tick on the axis (left edge aligned with "6", right edge aligned with "8").
- Animate it so it expands (grows from left to right, from pH 6 to pH 8) when the slide appears, the same way the gray bar animates.
- The bar has a solid outline (no dashed outline) and there is no dashed underline under "Our claim".
- Keep the green "evidence" tag next to the label "Our claim".
- Keep everything else on the slide unchanged: headline, subtitle, gray bar, "Where customers are" zone, and the pH axis (5, 6, 6.5, 7, 8).

---

## Slide 8 (route `#/8`): make the team photos bigger

Problem: the circular photos are too small.

Fix:
- Increase each photo circle from about 118 px to about 240 px in diameter (Mohadeseh and Ali the same size).
- Keep the photos circular with `object-fit: cover` and the face centered (`object-position: center top`).
- Adjust the spacing so the name, role line, description and tags still sit below the photo with comfortable space, and the two columns stay centered and balanced on the slide.
- Nothing may overflow the slide. If needed, reduce the gap above the photos.

---

## Slide 11 (route `#/11`): stop cropping the images, make them bigger

Problem: the certificate and medal images are cut off. The WIIPA Special Award image loses its medal at the bottom, and other certificates are also cropped.

Fix for every image in the iCAN 2026 card (the three top photos and the three small thumbnails):
- Do not crop any certificate, medal or diploma image. Use `object-fit: contain` and the image's natural aspect ratio, with a fixed height per row and `width: auto`, on the same dark card background. The full certificate and the full medal must be visible, especially `ican_wiipa_special_award.jpg` (the gold medal at the bottom must show) and `ican_gold_medal_2.jpg`.
- The photo of Mohadeseh (`ican_medal_mohadeseh.jpg`) may keep `object-fit: cover`, but her face and the medal in her hand must both stay visible (use `object-position: center top`, and do not cut the medal).
- Make the images bigger:
  - Make the iCAN 2026 card wider, about 45 percent of the content width, and narrow the right-hand 2 by 2 grid to fit.
  - Top row of three photos: height about 300 px.
  - Bottom row of three thumbnails: height about 180 px.
  - If the card gets too tall, reduce the card description font size slightly and tighten the spacing, but keep the images large.
- Keep the caption "Mohadeseh Zamani with the Gold Medal" under the first photo.

Images on the right side (Apex and Press):
- `apex_team.jpg`: show the whole team photo without cropping the people (use `object-fit: contain` or a taller area).
- `press_ali.jpg` and `press_mohadeseh.jpg`: keep `object-position: top`, and make them a little bigger if space allows.

Nothing may overflow any card. Keep the dark card style and the rest of the slide unchanged.
