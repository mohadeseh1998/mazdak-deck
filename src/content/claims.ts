import { CHELATE } from "./chemistry";

// Assumption registry (brief Section 6.2). Every [assumption] in the deck points
// at one of these ids, and the hover card reads `proof` from here.
export const claims = {
  "spring-window": {
    claim: "Most revenue arrives in a ten-week window",
    proof: "Discovery calls, five growers before Gate 1 on 7 October",
  },
  culling: {
    claim: "Smaller operations cull instead of treating",
    proof: "Discovery calls",
  },
  "problem-cost": {
    claim: "$0.8M to $2.0M annual cost",
    proof: "Ask every call: what share of baskets was lost or discounted to yellowing last spring",
  },
  "ph-extension": {
    claim: `Our process extends ${CHELATE.agent}'s usable pH range`,
    proof: "Controlled pH-response test with recorded readings, first Canadian trial",
  },
  "iran-ph": {
    claim: "Iranian trial site pH values",
    proof: "Recorded trial protocol requested from Dr. Kalateh and the cooperative partners",
  },
  mechanism: {
    claim: "The mechanism behind the pH extension",
    proof: "Characterisation work, may relate to the nano fraction rather than chelate stability",
  },
  "process-time": {
    claim: "Twenty-minute reaction, three-hour cycle",
    proof: "Verified in our own pilot production. A Canadian batch at UNB reproduces it",
  },
  "cost-10": {
    claim: "CAD 10 per litre production cost",
    proof: "One Canadian production batch converts this from modelled to measured",
  },
  "price-25": {
    claim: "CAD 25 per litre selling price",
    proof: "Quoted Maritime dealer prices from Halifax Seed, Plant Products, Cavendish Agri Services",
  },
  channel: {
    claim: "Direct then dealers, and the two purchase gates",
    proof: "Input dealer calls, and a CFIA fertilizer safety section call on the registration pathway",
  },
  ontario: {
    claim: "Ontario converts on the same proposition",
    proof: "Not yet tested. Sequenced after the Maritime proof",
  },
  cannabis: {
    claim: "Cannabis iron spend",
    proof: "Not quantified. Requires a licensed producer conversation",
  },
} as const;

export type ClaimId = keyof typeof claims;
