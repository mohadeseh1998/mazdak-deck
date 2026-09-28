import { CHELATE } from "./chemistry";

// Open placeholders (Slides 6 to 10 brief, final section). A [placeholder]
// names what is missing and how it will be obtained; the hover card says both.
export const placeholders = {
  "zamani-title": {
    missing: "Current UNB program and title for Mohadeseh Zamani",
    from: "Mohadeseh's UNB record",
  },
  "arp-details": {
    missing: "Dr. Arp's exact title and department, and written consent to appear on the slide",
    from: "Dr. Arp and his UNB profile",
  },
  "kalateh-patents": {
    missing: "Dr. Kalateh's patent numbers and jurisdictions",
    from: "Dr. Kalateh",
  },
  "edta-dealers": {
    missing: `Named Fe-${CHELATE.agent} products, Maritime prices and iron content`,
    from: "Three dealer calls: Halifax Seed, Plant Products, Cavendish Agri Services",
  },
  "grower-spend": {
    missing: "Grower spend per season on pH control and iron correction, and share of baskets lost to yellowing",
    from: "Discovery calls",
  },
  budget: {
    missing: "Bottom-up budget",
    from: "Shipping, import, UNB, CFIA and reactor quotes",
  },
  cfia: {
    missing: "CFIA pathway, fees and timeline",
    from: "CFIA fertilizer safety section",
  },
  import: {
    missing: "Sample import route and permit status",
    from: "CFIA, CBSA and Global Affairs Canada, this week",
  },
  "unb-space": {
    missing: "UNB space, start date and materials cost",
    from: "Dr. Arp, this week",
  },
  relocation: {
    missing: "Founder relocation and IP-custody plan",
    from: "Carried forward from Data Room 01; Mohadeseh to document",
  },
  "trial-cost": {
    missing: "Year 1 trial product cost",
    from: "Bottom-up budget from shipping, import and UNB quotes",
  },
  "scaleup-spend": {
    missing: "Iron-specific spend in Ontario floriculture and cannabis",
    from: "Dealer calls and IBISWorld at the UNB library",
  },
} as const;

export type PlaceholderId = keyof typeof placeholders;
