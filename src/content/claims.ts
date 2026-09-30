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
    proof: "Quoted dealer prices from Halifax Seed, Plant Products, Cavendish Agri Services",
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
  // Slides 6 to 10 (Kawasaki brief).
  beachhead: {
    claim: "15 to 40 Maritime operations are the beachhead",
    proof: "Name and call every operation on the list; the outreach log counts each conversation",
  },
  "trial-path": {
    claim: "Free trial, then letter of intent, then paid orders",
    proof: "A signed spring 2027 trial host, then a first letter of intent (Q3 2027 target)",
  },
  "warm-entry": {
    claim: "Warm introductions open the door",
    proof: "Introductions requested from NB DAAF, Ignite Fredericton, Planet Hatch and UNB, logged per call",
  },
  "dealers-later": {
    claim: "Dealers only after a proven trial and CFIA registration",
    proof: "Dealer calls once trial results and CFIA status are in hand",
  },
  "scale-up": {
    claim: "Ontario floriculture and cannabis are the scale-up paths",
    proof: "Dealer calls and IBISWorld data at the UNB library size iron spend in each",
  },
  "edta-ceiling": {
    claim: `Commodity Fe-${CHELATE.agent} loses effect above media pH of about 6.0 to 6.5`,
    proof: `UNB pH-response test with recorded pH at every step, run alongside a commodity Fe-${CHELATE.agent}`,
  },
  "dtpa-price": {
    claim: `Sprint 330 is priced above Fe-${CHELATE.agent}`,
    proof: "Maritime dealer quotes, compared per gram of iron",
  },
  "eddha-cost": {
    claim: "Sprint 138 is expensive for container media",
    proof: "Maritime dealer quotes, compared per gram of iron",
  },
  injectors: {
    claim: "Growers already own acid injectors",
    proof: "Discovery calls",
  },
  "gross-margin": {
    claim: "CAD 15.00 gross margin per litre (60 percent)",
    proof: "A discovery-call price and a measured Canadian batch cost replace both inputs",
  },
  "three-year": {
    claim: "Plan A figures for Years 1 to 3",
    proof: "A discovery-call price and a measured Canadian batch cost replace the modelled inputs",
  },
  "import-gate": {
    claim: "New sample produced in Canada and validated",
    proof: "An independent assay of the new Canadian sample",
  },
  "pivot-gate": {
    claim: "pH-response result confirmed up to pH 8; CFIA route and fees known",
    proof: "UNB pH-response test with recorded pH at every step, and the CFIA pathway call",
  },
  "trial-gate": {
    claim: "Trial host signed and CFIA application filed in Q2 2027",
    proof: "A signed trial host, and the CFIA pathway call",
  },
  "loi-gate": {
    claim: "Letter of intent in hand and CFIA status known by Q3 2027",
    proof: "The spring trial results",
  },
} as const;

export type ClaimId = keyof typeof claims;
