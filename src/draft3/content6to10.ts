// Draft 3, slides 6 to 10, from Mazdak_Pitch_Deck_Build_Brief_Slides_6-10.md
// (Guy Kawasaki model). On-slide copy follows the brief's "On-slide content";
// its speaker notes live in `notes` and `detail` (key N).
import { CHELATE } from "../content/chemistry";
import type { ClaimId } from "../content/claims";
import type { PlaceholderId } from "../content/placeholders";
import type { D3Slide } from "./content";

const agent = CHELATE.agent;

/** One inline segment: plain text, bold, or a tagged claim. */
export type Seg =
  | string
  | { b: string }
  | { claim: ClaimId; text: string }
  | { evidence: string }
  | { placeholder: PlaceholderId };
export type Line = Seg[];

const a = (claim: ClaimId, text: string) => ({ claim, text });
const ev = (evidence: string) => ({ evidence });
const ph = (placeholder: PlaceholderId) => ({ placeholder });

/* ------------------------------------------------------------------ */

export const d3GoToMarket = {
  n: 6,
  title: "Go-to-market",
  ground: "ink",
  headline: "Founder-led, direct to the growers who have the problem",
  pathLabel: [a("trial-path", "The path")] as Line,
  youAreHere: "You are here",
  steps: [
    { label: "Trial", sub: ["Free"] as Line },
    { label: "Letter of intent", sub: [] as Line },
    { label: "Paid orders", sub: [] as Line },
    {
      label: "Dealers",
      sub: [
        a("dealers-later", "Halifax Seed, Plant Products, Cavendish Agri Services, only after a proven trial and CFIA registration"),
      ] as Line,
    },
  ],
  blocks: [
    {
      heading: "Beachhead",
      body: [
        a(
          "beachhead",
          "15 to 40 independent Maritime greenhouses and container nurseries growing calibrachoa or petunia on alkaline well water",
        ),
      ] as Line,
    },
    {
      heading: "Entry",
      body: [
        a("warm-entry", "Warm introductions from NB DAAF horticulture staff, Ignite Fredericton, Planet Hatch and UNB, plus walk-ins"),
      ] as Line,
    },
    {
      heading: "Scale-up after proof",
      body: [a("scale-up", "Ontario floriculture and controlled-environment cannabis")] as Line,
    },
  ],
  notes:
    "Direct first: the owner often signs a trial alone, on the same call, and the list is short enough to name and call every operation [assumption].",
  detail: [
    "The purchase order then passes two gates: the grower's existing dealer rep and our CFIA status [assumption].",
    "The Maritimes are a proof market, not a revenue market: out-of-pocket spend on the problem is about CAD 0.07M to 0.30M a year, and the segment's entire fertilizer bill about CAD 0.7M to 0.9M [evidence for the sector base: AAFC 2023; assumption for the ratios, Data Room 03]. The job of this market is Canadian references and a container application rate.",
    "Ontario holds about half of national floriculture production [evidence: AAFC 2024]. NB cannabis farm cash receipts were CAD 254.3M in 2024, about four times floriculture, nursery and sod [evidence: GNB commodity review]. Iron-specific spend in either is not known [placeholder: dealer calls and IBISWorld at the UNB library].",
    "If asked: zero grower conversations at rung 3 or higher as of this deck [evidence: founder outreach log]. Scott's Nursery took details and has not called back; follow up by phone or walk-in.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Competition = {
  n: 7,
  title: "Competition",
  ground: "ink",
  headline: `Our real competitor is cheap Fe-${agent}, and our real substitute is acid`,
  columns: ["Option", "Strength", "Weakness"],
  rows: [
    {
      option: `Commodity Fe-${agent} via Maritime dealers`,
      strength: ["Cheap, stocked, trusted"] as Line,
      weakness: [a("edta-ceiling", "Expected to lose effect above media pH of about 6.0 to 6.5")] as Line,
    },
    {
      option: "Sprint 330 (BASF Fe-DTPA)",
      strength: ["Known brand, wider pH range on label ", ev("BASF Sprint 330 label")] as Line,
      weakness: [a("dtpa-price", `Priced above Fe-${agent}`)] as Line,
    },
    {
      option: "Sprint 138 (BASF Fe-EDDHA)",
      strength: ["Built for strongly alkaline soils"] as Line,
      weakness: [a("eddha-cost", "Expensive for container media")] as Line,
    },
    {
      option: "Acid injection and acidifying fertiliser",
      strength: [a("injectors", "Growers already own injectors")] as Line,
      weakness: ["Constant management; a corrective drench still needed once chlorosis appears"] as Line,
    },
    {
      option: "Doing nothing, culling",
      strength: ["No cost"] as Line,
      weakness: ["Lost saleable plants at ship date"] as Line,
    },
  ],
  position: [
    { b: "Our position: " },
    `Fe-${agent} chemistry with field evidence of working in alkaline soil, applied to the root zone `,
    ev("Iranian field trials; root-zone application confirmed by Dr. Kalateh, 23 September 2026"),
    " ",
    a("ph-extension", "Whether it works above pH 6.0 in container media is not yet measured."),
  ] as Line,
  notes:
    "Compare per gram of iron, never per litre, and say plainly that no cost advantage is claimed until the dealer quotes are in.",
  detail: [
    "Mazdak at CAD 25/L and 65.2 g/L iron is about CAD 0.38 per gram of iron [assumption for price; evidence for iron content: SPECTRO assay, 11 May 2023]. Sprint 330 is about CAD 0.51 per gram from a US retail listing at an assumed 1.37 exchange rate [Data Room 03]. A different chelate class: reference only, not a cost-advantage claim.",
    `Fe-${agent} is generally the cheapest class per gram of iron, so the like-for-like comparison is likely to be less favourable to us than the Sprint 330 row suggests [assumption].`,
    `[placeholder] Named Fe-${agent} products, Maritime dealer prices and iron content: quotes from Halifax Seed, Plant Products and Cavendish Agri Services.`,
    `The pivot, before anyone asks: if the UNB test does not confirm extended-pH performance against recorded pH readings, we are a conventional Fe-${agent} competing on price in a segment whose annual iron spend is under CAD 0.3M, and the target market gets rebuilt [Data Room 04].`,
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Team = {
  n: 8,
  title: "Team",
  ground: "ink",
  headline: "Chemistry, customer, and a lab to prove it in Canada",
  people: [
    {
      initials: "MZ",
      photo: "team-zamani.jpg",
      name: "Mohadeseh Zamani",
      role: "Co-founder, Customer, Regulatory and Ecosystem",
      proof: [
        "Runs the Canadian company end to end: incorporated in NB, GST/HST registered, UNB lab access and test supervision secured, Mitacs application at final stage ",
        ev("Data Room 01 and 05"),
        " ",
        ph("zamani-title"),
      ] as Line,
    },
    {
      initials: "AK",
      photo: "team-kalateh.jpg",
      name: "Dr. Ali Kalateh",
      role: "Co-founder, Chemistry and Process",
      proof: [
        "Inventor of the microwave-UV chelation route. ",
        a("process-time", "Main reaction in about 20 minutes versus 12 hours or more in his own pilot production."),
        " Product assays at 65,222 mg/L iron ",
        ev("SPECTRO assay, 11 May 2023"),
      ] as Line,
    },
    {
      initials: "PA",
      photo: "team-arp.jpg",
      name: "Dr. Paul Arp",
      role: "UNB, Research Supervisor (advisor, not an employee)",
      proof: [
        "Approved UNB lab access and agreed to supervise the controlled pH-response test ",
        ev("Conversation, 2 September 2026"),
        " Supervisor on our Mitacs application (pending). ",
        ph("arp-details"),
      ] as Line,
    },
  ],
  hireLabel: "The gap we are hiring for",
  hire: "An in-Canada process chemist to run synthesis while Dr. Kalateh is remote.",
  notes:
    "Why this gap first: the product, the process knowledge and the chemist are all outside Canada today. A trade secret held by one person on another continent is a risk investors will price.",
  detail: [
    "The hire closes the 'who runs synthesis in Canada' question (Data Room 05, step 5). A cheap route: a Mitacs-funded intern under Dr. Arp, if Mitacs is approved and its allowed uses permit it [assumption; to confirm with Dr. Arp and Mitacs].",
    "Also say: Dr. Kalateh's relocation and IP-custody plan [placeholder: carried forward from Data Room 01; Mohadeseh to document].",
    "Dr. Kalateh's industrial career and patents on related processes are claimed but undocumented [assumption]. Add them to the slide only once patent numbers and jurisdictions are in hand [placeholder].",
    "The second gap, if asked: nobody on the team has greenhouse horticulture credentials. DAAF extension staff and dealer agronomists are the advisors of record for now [assumption].",
    "Awards are company and invention proof, not team proof; they sit on Slide 10 or in the appendix.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Financials = {
  n: 9,
  title: "Financials",
  ground: "ink",
  headline: "A proof market first: small, real revenue from named customers",
  unitHeading: "Unit economics, all modelled",
  perLitre: "per litre",
  perGram: "per gram of iron",
  units: [
    { label: "Price", litre: a("price-25", "CAD 25.00"), gram: "CAD 0.38" },
    { label: "Production cost", litre: a("cost-10", "CAD 10.00"), gram: "CAD 0.15" },
    { label: "Gross margin", litre: a("gross-margin", "CAD 15.00 (60%)"), gram: "CAD 0.23" },
  ],
  yearsHeading: "Years 1 to 3, built from customers",
  // Named stepsClaim so the audit counter sees a claim that tags a whole block.
  stepsClaim: "three-year" as ClaimId,
  yearsNote: "Every figure in this table is an assumption.",
  years: [
    { label: "Year 1", span: "Q4 2026 to Q3 2027", revenue: 0, revenueText: "CAD 0" },
    { label: "Year 2", span: "Q4 2027 to Q3 2028", revenue: 22500, revenueText: "CAD 22,500" },
    { label: "Year 3", span: "Q4 2028 to Q3 2029", revenue: 60000, revenueText: "CAD 60,000" },
  ],
  ceiling: { value: 300000, label: "Maritime ceiling: CAD 300,000 a year, 100 percent of current spend" },
  rows: [
    { label: "Paying customers", values: [["0 (1 to 2 unpaid trial hosts)"], ["3"], ["8"]] as Line[] },
    { label: "Litres per customer per year", values: [["n/a"], ["300"], ["300"]] as Line[] },
    { label: "Litres sold", values: [["0"], ["900"], ["2,400"]] as Line[] },
    { label: "Production cost", values: [["Trial product only ", ph("trial-cost")], ["CAD 9,000"], ["CAD 24,000"]] as Line[] },
    { label: "Gross margin", values: [["Negative (trial cost)"], ["CAD 13,500"], ["CAD 36,000"]] as Line[] },
    { label: "Share of Maritime ceiling (12,000 L)", values: [["0%"], ["7.5%"], ["20%"]] as Line[] },
  ],
  honest:
    "Price and cost are founders' models. No grower has been quoted the price and no batch has been produced in Canada. Both numbers will be replaced by a discovery-call price and a measured Canadian batch cost.",
  notes:
    "What this is not: gross margin only. It excludes CFIA fees, sample shipping and import, UNB test materials, a Canadian reactor, packaging and travel [placeholder: bottom-up budget].",
  detail: [
    "Per gram of iron: price and cost divided by 65.2 g/L iron [evidence for iron content; assumption for price and cost].",
    "300 L per customer: the Maritime ceiling of about 12,000 L divided by the upper count of 40 operations [assumption]. At the low end of spend (CAD 0.07M, about 2,800 L) the same split gives about 70 L per customer.",
    "Low case, if asked: at 70 L per customer, Year 2 is about CAD 5,250 and Year 3 about CAD 14,000 [assumption]. Every discovery call asks what the grower spends per season on pH control and iron correction.",
    "Year 1 has no paid sales because CFIA registration must come before any paid sale and has not started [evidence: Data Room 05].",
    "Channel caveat: a flat CAD 25 price leaves no dealer margin. It works for founder-led direct sales only [assumption].",
    "Year 2 depends on a positive UNB pH-response result and completed CFIA registration. No Ontario or cannabis revenue appears: there is no evidence yet for iron spend in either.",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3Status = {
  n: 10,
  title: "Status and ask",
  ground: "ink",
  headline: "Where we are, the next four quarters, and one ask",
  todayLabel: "Today",
  today: [
    "Incorporated in NB. Product assayed. UNB lab and supervisor secured. Iron chelate stock in Iran, none in Canada. Zero grower conversations counted. Spendable cash CAD 17,250. ",
    ev("Data Room 01 and 05"),
  ] as Line,
  quartersLabel: "Next four quarters, targets not commitments",
  gateLabel: "Gate",
  quarters: [
    {
      q: "Q4 2026",
      months: "Oct to Dec",
      milestone: `Five grower conversations (target: before Gate 1, 7 Oct); sample into Canada; CFIA pathway call; Mitacs decision; Fe-${agent} dealer quotes`,
      gate: [a("import-gate", "Import cleared with CFIA, CBSA and Global Affairs Canada (Iran sanctions)")] as Line,
      pivot: false,
    },
    {
      q: "Q1 2027",
      months: "Jan to Mar",
      milestone: "UNB pH-response test with recorded pH at every step; first container application rate",
      gate: [{ b: "Pivot decision: " }, a("pivot-gate", "extended-pH performance confirmed or not")] as Line,
      pivot: true,
    },
    {
      q: "Q2 2027",
      months: "Apr to Jun",
      milestone: "Grower-site trial on calibrachoa and petunia across the spring shipping window",
      gate: [a("trial-gate", "Trial host signed; CFIA application filed")] as Line,
      pivot: false,
    },
    {
      q: "Q3 2027",
      months: "Jul to Sep",
      milestone: "Trial results written up; first letter of intent; costed plan for a first Canadian batch",
      gate: [a("loi-gate", "LOI in hand; CFIA status known")] as Line,
      pivot: false,
    },
  ],
  askLabel: "The ask",
  ask: "Introductions to Maritime greenhouse growers who grow calibrachoa or petunia baskets on well water and have seen yellowing in the last two seasons, so we can sign one trial host for spring 2027.",
  notes:
    "Why the ask is introductions, not money: there is no bottom-up budget yet, and asking for a figure we cannot defend line by line would undercut every honest tag in this deck.",
  detail: [
    "Every timing depends on the step before it. The UNB test cannot start until a sample arrives; the start date is proposed once Dr. Arp confirms space [placeholder: space, start date and materials].",
    "Q2 2027 suits bedding crops because of the spring window. An earlier trial on non-bedding crops is possible if a year-round operation such as Scott's Nursery hosts [assumption].",
    "CFIA filing in Q2 2027 is a target only. Pathway, fees and timeline are unknown until the call with CFIA's fertilizer safety section [placeholder]. No paid sale happens before registration.",
    "If the Q1 pH test fails, the Q2 and Q3 rows are replaced by a market rebuild, not a price war in a sub-CAD 0.3M segment [Data Room 04].",
    "The CAD 500,000 scenario is not money needed to start [Data Room 05]. The ask becomes a dollar figure once the budget is built from shipping, import, UNB, CFIA and reactor quotes.",
    "Recognition, if wanted: Gold plus two special awards at iCAN 2026; third place, BMO Apex 2025 elevator pitch, out of about 192 applicants [evidence: Data Room 01].",
  ],
} satisfies D3Slide & Record<string, unknown>;

export const d3SlidesSixToTen = [d3GoToMarket, d3Competition, d3Team, d3Financials, d3Status] as const;
