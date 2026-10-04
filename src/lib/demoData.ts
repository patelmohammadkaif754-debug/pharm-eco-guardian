/**
 * DEMO DATA — EcoPV-India is a student-developed prototype.
 * Every value below is simulated and must never be presented as real data.
 */

export type ReportStatus = "New" | "Under Review" | "Verified" | "Escalated";

export interface EcoReport {
  id: string;
  medicine: string;
  category: string;
  location: string;
  date: string;
  status: ReportStatus;
  severity: "Low" | "Moderate" | "High";
  summary: string;
}

export const DEMO_REPORTS: EcoReport[] = [
  {
    id: "ECO-2026-1042",
    medicine: "Diclofenac (NSAID)",
    category: "Water Contamination",
    location: "Patna, Bihar",
    date: "2026-09-28",
    status: "Escalated",
    severity: "High",
    summary: "Reported pharmaceutical residue in pond water near cattle grazing area.",
  },
  {
    id: "ECO-2026-1041",
    medicine: "Unspecified Antibiotics",
    category: "Improper Disposal",
    location: "Jaipur, Rajasthan",
    date: "2026-09-26",
    status: "Under Review",
    severity: "Moderate",
    summary: "Expired tablets discarded in open drain near residential colony.",
  },
  {
    id: "ECO-2026-1039",
    medicine: "Metformin (Antidiabetic)",
    category: "Water Contamination",
    location: "Hyderabad, Telangana",
    date: "2026-09-21",
    status: "Verified",
    severity: "Moderate",
    summary: "Foam and discoloration observed downstream of a formulation unit.",
  },
  {
    id: "ECO-2026-1036",
    medicine: "Ivermectin (Antiparasitic)",
    category: "Wildlife Impact",
    location: "Coimbatore, Tamil Nadu",
    date: "2026-09-18",
    status: "Verified",
    severity: "High",
    summary: "Dung beetle activity noticeably reduced after veterinary dosing season.",
  },
  {
    id: "ECO-2026-1031",
    medicine: "Ciprofloxacin (Antibiotic)",
    category: "Manufacturing Effluent",
    location: "Baddi, Himachal Pradesh",
    date: "2026-09-14",
    status: "Under Review",
    severity: "High",
    summary: "Strong chemical odour in stream used for irrigation by nearby farms.",
  },
  {
    id: "ECO-2026-1027",
    medicine: "Paracetamol (Analgesic)",
    category: "Water Contamination",
    location: "Kochi, Kerala",
    date: "2026-09-09",
    status: "New",
    severity: "Low",
    summary: "Community well reported unusual taste after festival-season medicine use.",
  },
  {
    id: "ECO-2026-1024",
    medicine: "Hormonal Contraceptives",
    category: "Water Contamination",
    location: "Pune, Maharashtra",
    date: "2026-09-05",
    status: "New",
    severity: "Moderate",
    summary: "Fish sex-ratio anomaly reported near sewage outfall by local college.",
  },
  {
    id: "ECO-2026-1019",
    medicine: "Unspecified Antibiotics",
    category: "Wildlife Impact",
    location: "Guwahati, Assam",
    date: "2026-08-30",
    status: "Verified",
    severity: "Moderate",
    summary: "Vulture decline suspected near carcass disposal sites using treated cattle.",
  },
];

export interface EcoSignal {
  id: string;
  drugClass: string;
  endpoint: string;
  strength: "Strong" | "Moderate" | "Developing";
  confidence: number;
  reports: number;
  regions: string;
  recommendedAction: string;
}

export const DEMO_SIGNALS: EcoSignal[] = [
  {
    id: "SIG-014",
    drugClass: "Diclofenac (NSAID)",
    endpoint: "Avian / vulture toxicity via carcass exposure",
    strength: "Strong",
    confidence: 92,
    reports: 214,
    regions: "North & West India",
    recommendedAction: "Priority literature review + veterinary-use mapping study.",
  },
  {
    id: "SIG-011",
    drugClass: "Fluoroquinolone antibiotics",
    endpoint: "Antimicrobial resistance selection in surface water",
    strength: "Strong",
    confidence: 88,
    reports: 187,
    regions: "Hyderabad & Baddi clusters",
    recommendedAction: "Coordinate effluent sampling proposal with academic partners.",
  },
  {
    id: "SIG-009",
    drugClass: "17α-ethinylestradiol (hormonal)",
    endpoint: "Endocrine disruption in freshwater fish",
    strength: "Moderate",
    confidence: 71,
    reports: 96,
    regions: "Maharashtra rivers",
    recommendedAction: "Correlate with published ecotoxicology data; seek lab confirmation.",
  },
  {
    id: "SIG-007",
    drugClass: "Ivermectin (antiparasitic)",
    endpoint: "Dung-degrading insect population decline",
    strength: "Moderate",
    confidence: 64,
    reports: 58,
    regions: "Southern veterinary belt",
    recommendedAction: "Field survey design; engage veterinary colleges.",
  },
  {
    id: "SIG-004",
    drugClass: "Metformin (biguanide)",
    endpoint: "Persistent residue in treated drinking water",
    strength: "Developing",
    confidence: 41,
    reports: 33,
    regions: "Telangana & Kerala",
    recommendedAction: "Monitor; insufficient reports for statistical signal yet.",
  },
  {
    id: "SIG-002",
    drugClass: "Paracetamol (analgesic)",
    endpoint: "Trace-level presence in community wells",
    strength: "Developing",
    confidence: 28,
    reports: 21,
    regions: "Kerala coast",
    recommendedAction: "Watchlist only — likely tied to seasonal consumption spikes.",
  },
];

export const CATEGORY_COUNTS = [
  { category: "Water Contamination", count: 512, pct: 41 },
  { category: "Improper Disposal", count: 348, pct: 28 },
  { category: "Manufacturing Effluent", count: 212, pct: 17 },
  { category: "Wildlife Impact", count: 118, pct: 9 },
  { category: "Other", count: 58, pct: 5 },
];

export const STATUS_STYLES: Record<ReportStatus, string> = {
  New: "bg-teal-soft text-accent-foreground",
  "Under Review": "bg-secondary text-secondary-foreground",
  Verified: "bg-leaf-soft text-foreground",
  Escalated: "bg-destructive/10 text-destructive",
};
