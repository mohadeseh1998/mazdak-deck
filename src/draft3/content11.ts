// Draft 3, slide 11 (deck_edits.md): recognition. No tags on this slide.
import type { D3Slide } from "./content";

export interface RecognitionImage {
  file: string;
  alt: string;
  /** Keep the top of the image in view, for press screenshots with a masthead. */
  top?: boolean;
  /** A small gray caption under the image. */
  caption?: string;
}

export interface RecognitionCard {
  heading: string;
  description: string;
  images: RecognitionImage[];
}

export const d3Recognition = {
  n: 11,
  title: "Recognition",
  ground: "ink",
  headline: "Recognized before we shipped a litre",
  ican: {
    heading: "iCAN 2026",
    description:
      "Gold Medal plus two international special awards (WIIPA and Romanian Inventors Forum) at the 11th International Invention Innovation Competition in Canada, Toronto, 29 August 2026.",
    medals: [
      {
        file: "ican_medal_mohadeseh.jpg",
        alt: "Mohadeseh Zamani holding the iCAN 2026 Gold Medal",
        top: true,
        caption: "Mohadeseh Zamani with the Gold Medal",
      },
      { file: "ican_gold_medal_1.jpg", alt: "iCAN 2026 Gold Medal resting on the certificate of award" },
    ] as RecognitionImage[],
    thumbs: [
      { file: "ican_gold_medal_2.jpg", alt: "iCAN 2026 Gold Medal and ribbon on the certificate of award" },
      { file: "ican_certificate_of_excellence.jpg", alt: "iCAN 2026 certificate of excellence" },
      { file: "ican_wiipa_special_award.jpg", alt: "WIIPA special award, iCAN 2026" },
      { file: "ican_fir_special_award.jpg", alt: "Romanian Inventors Forum special award, iCAN 2026" },
    ],
  },
  cards: [
    {
      heading: "BMO Apex 2025",
      description: "3rd place in the elevator pitch at UNB.",
      images: [{ file: "apex_team.jpg", alt: "The team at BMO Apex 2025" }],
    },
    {
      heading: "Mitacs Accelerate",
      description: "Entrepreneur grant with UNB, application at final stage.",
      images: [],
    },
    {
      heading: "Planet Hatch and Ignite",
      description: "Endorsement letters from both.",
      images: [],
    },
    {
      heading: "Press",
      description: "Featured by AllNewBrunswick.",
      images: [
        { file: "press_ali.jpg", alt: "AllNewBrunswick feature on Dr. Ali Kalateh", top: true },
        { file: "press_mohadeseh.jpg", alt: "AllNewBrunswick feature on Mohadeseh Zamani", top: true },
      ],
    },
  ] satisfies RecognitionCard[],
  notes: "Recognition validates the technology and the founders. It is not yet proof of the business, and it is fine to say so.",
  detail: [
    "iCAN 2026: Gold Medal, plus WIIPA and Romanian Inventors Forum special awards, Toronto, 29 August 2026.",
    "BMO Apex 2025: 3rd place in the elevator pitch at UNB.",
    "Mitacs Accelerate: application at final stage, not yet approved.",
  ],
} satisfies D3Slide & Record<string, unknown>;
