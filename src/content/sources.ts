import { CHELATE } from "./chemistry";

// Source register (brief Section 13). `cite` is the exact wording used in a
// slide's source line; `full` is what the S overlay shows the founder.
export interface Source {
  cite: string;
  full: string;
}

export const sources = {
  aafc2023: {
    cite: "AAFC Statistical Overview of the Canadian Ornamental Industry, 2023",
    full: "AAFC, Statistical Overview of the Canadian Ornamental Industry, 2023 edition, reproducing Statistics Canada tables",
  },
  aafc2024: {
    cite: "AAFC Statistical Overview 2024",
    full: "AAFC, Statistical Overview of the Canadian Ornamental Industry, 2024 edition",
  },
  gnbReceipts: {
    cite: "GNB statistical commodity review",
    full: "Government of New Brunswick, statistical commodity review, farm cash receipts 2023 to 2024",
  },
  gnbSoil: {
    cite: "Government of New Brunswick potato soil management guidance; The Status of Agricultural Soil Health in New Brunswick, 2023",
    full: "Government of New Brunswick, potato soil management guidance; The Status of Agricultural Soil Health in New Brunswick, 2023",
  },
  ucanr: {
    cite: "UC Nursery and Floriculture Alliance",
    full: "UC Nursery and Floriculture Alliance, substrate pH and bicarbonate-driven pH rise",
  },
  purdue: {
    cite: "Purdue HO-242-W",
    full: "Purdue Extension HO-242-W",
  },
  basf: {
    cite: "BASF Sprint label",
    full: "BASF Sprint 138 and Sprint 330 label, greenhouse drench rates",
  },
  uconn: {
    cite: "UConn Extension greenhouse IPM message",
    full: "UConn Extension, greenhouse IPM message, April 2022, iron chelate drench frequency",
  },
  cbt: {
    cite: "Cannabis Business Times",
    full: "Cannabis Business Times, Alkalinity Control for Container-Grown Cannabis",
  },
  spectro: {
    cite: "SPECTRO elemental assay, sample MR KALATE, 11 May 2023",
    full: "SPECTRO elemental assay, sample MR KALATE, 11 May 2023",
  },
  dls: {
    cite: "Dynamic Light Scattering particle size analysis",
    full: "Dynamic Light Scattering particle size analysis, company technical file",
  },
  kalateh: {
    cite: "Dr. Ali Kalateh, co-founder, 23 September 2026",
    full: `Dr. Ali Kalateh, co-founder, confirmed 23 September 2026, root-zone application method and ${CHELATE.agent} chemistry`,
  },
} satisfies Record<string, Source>;

export type SourceKey = keyof typeof sources;

export const sourceLine = (keys: readonly SourceKey[]) => keys.map((k) => sources[k].cite).join("; ");
