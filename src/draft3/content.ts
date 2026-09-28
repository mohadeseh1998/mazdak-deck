// Draft 3: keynote style. One thought per slide, a handful of words each.
// Everything cut from the slides is kept in `detail`, shown with the notes (key N).
// Figures are unchanged from the approved copy.
import { CHELATE } from "../content/chemistry";
import type { ClaimId } from "../content/claims";
import { collectClaims, type Ground } from "../content/slides";
import { d3SlidesSixToTen } from "./content6to10";

const agent = CHELATE.agent;

export interface D3Slide {
  n: number;
  title: string;
  ground: Ground;
  notes: string;
  detail: string[];
}

/** A figure that is an assumption. `text` lets the audit counter see it. */
export interface D3Claim {
  claim: ClaimId;
  text: string;
}

export const d3Title = {
  n: 1,
  title: "Title",
  ground: "ink",
  company: "Mazdak Atlantic AgriAqua",
  headline: "Iron plants can actually absorb.",
  subhead: "Made in 20 minutes. Not 12 hours.",
  imageAlt: "Three bottles of the liquid iron product, two amber and one dark brown.",
  honesty: "Not yet: a Canadian trial, a Canadian customer, or CFIA registration.",
  notes: "If asked why pre-revenue matters less than it looks: the chemistry is proven, the market is not.",
  detail: [
    "65,222 mg/L iron, independent SPECTRO assay.",
    "Nano particle size confirmed by DLS.",
    "Gold Medal and two special awards, iCAN 2026. Mitacs Accelerate grant with UNB.",
    "Incorporated in New Brunswick, GST and HST registered. Pre-revenue and self-funded.",
    "Press A to show every claim we have not proven yet.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Problem = {
  n: 2,
  title: "Problem",
  ground: "ink",
  headline: "A yellow basket does not sell.",
  subhead: "Bicarbonate-rich well water pushes greenhouse pots past pH 6.0, and the iron locks up.",
  figure: { claim: "problem-cost", text: "$0.8M to $2.0M" } satisfies D3Claim,
  figureLabel: "Annual cost of the problem in NB, NS and PEI",
  notes: "The agronomy question about acidic Atlantic soils is coming. Answer: the problem lives in irrigation water and container media, not the soil outside.",
  detail: [
    "Calibrachoa and petunia need pH 5.4 to 6.0. Bicarbonate-rich wells push soilless media above that over a ten-week crop.",
    "85 to 90 percent of the cost is lost or discounted crop. Only $0.07M to $0.30M is spent on iron products and acidification.",
    "Growers today: acid injection, or an Fe-DTPA drench every three to four weeks. Assumption: smaller operations cull.",
    "Assumption: most revenue arrives in a ten-week spring window.",
    "Atlantic Canadian field soils are naturally acidic and limed. We dropped the alkaline-soil framing in Week 2.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Value = {
  n: 3,
  title: "Value proposition",
  ground: "ink",
  headline: `Standard ${agent} stops at pH 6.5.`,
  subhead: "Our customers' pots are already past it.",
  scale: {
    title: `pH scale: standard Fe-${agent} works to 6.5, customer media sits at 6.0 to 7.2, our claimed range reaches 8.0`,
    standard: `Standard ${agent}`,
    customers: "Where customers are",
    claim: { claim: "ph-extension", text: "Our claim" } satisfies D3Claim,
  },
  closer: "The first Canadian trial decides it.",
  notes:
    `Do not oversell. If asked 'what if you are wrong': we become a conventional Fe-${agent} competing on price, and we would rather you heard that from us.`,
  detail: [
    "Root-zone field trials in Iran on pomegranate, olive, sweet corn and hybrid rose showed improved health and greening.",
    "Root zone, not foliar, confirmed by Dr. Kalateh on 23 September 2026. Foliar iron would prove nothing about pH.",
    "Assumption: soil pH was not recorded at the Iranian sites.",
    "Assumption: the mechanism is not characterised; it may be the nano fraction rather than chelate stability.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Solution = {
  n: 4,
  title: "Solution",
  ground: "ink",
  headline: "20 minutes. Not 12 hours.",
  stepsClaim: "process-time" as ClaimId,
  stepsNote: "Verified in our pilot. Not yet reproduced in Canada.",
  notes:
    "If asked whether twenty minutes has been reproduced in Canada: no, and UNB plus the Mitacs grant is the route.",
  detail: [
    "Microwave and UV energy create localised hot spots. The chelation reaction completes in about twenty minutes, against twelve hours or more.",
    "A full production cycle takes roughly three hours. A fraction of the energy and the plant footprint.",
    "65,222 mg/L iron: SPECTRO assay, 11 May 2023, runs of 65,098.9 and 65,345.6 mg/L.",
    "Dr. Ali Kalateh, inorganic chemist, career in industrial production lines, patents on related processes.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Model = {
  n: 5,
  title: "Business model",
  ground: "ink",
  headline: "Sell the litre. Buy the reference.",
  price: { claim: "price-25", text: "CAD 25" } satisfies D3Claim,
  priceLabel: "Price per litre",
  cost: { claim: "cost-10", text: "CAD 10" } satisfies D3Claim,
  costLabel: "Modelled cost per litre",
  closerLead: "The Maritimes earns references.",
  closerClaim: { claim: "ontario", text: "Ontario earns revenue." } satisfies D3Claim,
  withdrawn: "Withdrawn this week: the CAD 9.375M Year 3 scenario and the Sprint 330 cost comparison.",
  notes: "If asked why start in a market this small: references and an application rate, not revenue.",
  detail: [
    "Capturing one hundred percent of current Maritime spend is about 12,000 litres a year.",
    "The segment's entire fertiliser bill is $0.7M to $0.9M a year; any iron revenue comes out of that pool.",
    "Assumption: direct to growers first, then Halifax Seed, Plant Products, Cavendish Agri Services.",
    "Assumption: cannabis iron spend is not quantified. NB cannabis receipts were $254.3M in 2024.",
    "Still open: CFIA registration is unpriced and unscheduled.",
  ],
} satisfies D3Slide & Record<string, unknown>;

// Slides 6 to 10 (Kawasaki brief) follow the original five unchanged.
export const d3Slides = [d3Title, d3Problem, d3Value, d3Solution, d3Model, ...d3SlidesSixToTen] as const;

export const d3ClaimsPerSlide: number[] = d3Slides.map((s) => collectClaims(s).size);
export const d3ClaimsInDeck: number = collectClaims(d3Slides).size;
