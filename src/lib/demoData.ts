/**
 * SIMULATED DEMO DATA — EcoPV-India is a student-developed proposed prototype.
 * Every record is fictional. No real patient or reporter data is used.
 */

export const REPORTER_TYPES = ["General Public", "Pharmacist", "Healthcare Professional", "Student", "Farmer", "Researcher"] as const;
export const PHARMA_CATEGORIES = ["Antibiotic", "Hormonal Medicine", "Analgesic / NSAID", "Antidiabetic", "Veterinary Medicine", "Expired / Mixed Medicines", "Other / Unknown"] as const;
export const MEDIA = ["Wastewater", "Surface Water", "Groundwater", "Soil", "Open Land / Waste Site"] as const;
export const SOURCES = ["Household Disposal", "Hospital / Clinic", "Pharmacy", "Manufacturing Unit", "Veterinary / Farm", "Unknown"] as const;
export const CONCERN_TYPES = ["Improper Disposal", "Unusual Discharge", "Odour / Discolouration", "Aquatic Life Observation", "Littered Medicine Packs", "Other"] as const;

export type ScreeningStatus = "Received" | "Screening" | "Flagged for Expert Review";

export interface EcoReport {
  id: string;
  date: string;
  reporterType: (typeof REPORTER_TYPES)[number];
  pharmaCategory: (typeof PHARMA_CATEGORIES)[number];
  medium: (typeof MEDIA)[number];
  source: (typeof SOURCES)[number];
  concern: (typeof CONCERN_TYPES)[number];
  location: string;
  status: ScreeningStatus;
  observation: string;
}

const r = (
  n: number, date: string, reporterType: EcoReport["reporterType"], pharmaCategory: EcoReport["pharmaCategory"],
  medium: EcoReport["medium"], source: EcoReport["source"], concern: EcoReport["concern"], location: string,
  status: ScreeningStatus, observation: string,
): EcoReport => ({ id: `ECO-2026-${String(n).padStart(4, "0")}`, date, reporterType, pharmaCategory, medium, source, concern, location, status, observation });

export const DEMO_REPORTS: EcoReport[] = [
  r(20, "2026-09-29", "Pharmacist", "Antibiotic", "Wastewater", "Hospital / Clinic", "Unusual Discharge", "Hyderabad, Telangana", "Flagged for Expert Review", "Discharge from drain behind a clinic noted; antibiotic strips seen nearby."),
  r(19, "2026-09-27", "Student", "Antibiotic", "Wastewater", "Manufacturing Unit", "Odour / Discolouration", "Hyderabad, Telangana", "Screening", "Strong odour and colour change in drain outside an industrial area."),
  r(18, "2026-09-25", "Researcher", "Hormonal Medicine", "Surface Water", "Household Disposal", "Aquatic Life Observation", "Pune, Maharashtra", "Flagged for Expert Review", "Local college group noted unusual fish observations near sewage outfall."),
  r(17, "2026-09-24", "General Public", "Expired / Mixed Medicines", "Open Land / Waste Site", "Household Disposal", "Improper Disposal", "Jaipur, Rajasthan", "Screening", "Bags of expired tablets dumped on open land near a colony."),
  r(16, "2026-09-22", "Healthcare Professional", "Antibiotic", "Wastewater", "Hospital / Clinic", "Improper Disposal", "Hyderabad, Telangana", "Screening", "Unused antibiotic syrups poured into sink drain observed."),
  r(15, "2026-09-20", "Farmer", "Veterinary Medicine", "Soil", "Veterinary / Farm", "Littered Medicine Packs", "Coimbatore, Tamil Nadu", "Received", "Empty veterinary injection vials left at field edge."),
  r(14, "2026-09-18", "General Public", "Hormonal Medicine", "Surface Water", "Unknown", "Odour / Discolouration", "Pune, Maharashtra", "Screening", "Foam observed on river stretch downstream of city."),
  r(13, "2026-09-16", "Pharmacist", "Expired / Mixed Medicines", "Open Land / Waste Site", "Pharmacy", "Improper Disposal", "Jaipur, Rajasthan", "Received", "Expired strips found discarded behind a market lane."),
  r(12, "2026-09-14", "Student", "Antibiotic", "Surface Water", "Manufacturing Unit", "Unusual Discharge", "Baddi, Himachal Pradesh", "Screening", "Coloured discharge entering a stream used for irrigation."),
  r(11, "2026-09-12", "Researcher", "Hormonal Medicine", "Wastewater", "Household Disposal", "Unusual Discharge", "Pune, Maharashtra", "Received", "Concern raised about household disposal of hormonal tablets into toilets."),
  r(10, "2026-09-10", "General Public", "Analgesic / NSAID", "Groundwater", "Unknown", "Odour / Discolouration", "Kochi, Kerala", "Received", "Community well reported unusual taste."),
  r(9, "2026-09-08", "General Public", "Expired / Mixed Medicines", "Open Land / Waste Site", "Household Disposal", "Littered Medicine Packs", "Jaipur, Rajasthan", "Screening", "Medicine packs scattered near a garbage collection point."),
  r(8, "2026-09-06", "Pharmacist", "Antibiotic", "Wastewater", "Pharmacy", "Improper Disposal", "Hyderabad, Telangana", "Received", "Returned antibiotic stock reportedly flushed down drain."),
  r(7, "2026-09-04", "Farmer", "Veterinary Medicine", "Surface Water", "Veterinary / Farm", "Aquatic Life Observation", "Patna, Bihar", "Received", "Concern about cattle-treatment wash water entering pond."),
  r(6, "2026-09-02", "Student", "Antidiabetic", "Wastewater", "Household Disposal", "Improper Disposal", "Ahmedabad, Gujarat", "Received", "Hostel residents disposing unused tablets in drains."),
  r(5, "2026-08-30", "General Public", "Expired / Mixed Medicines", "Open Land / Waste Site", "Hospital / Clinic", "Improper Disposal", "Jaipur, Rajasthan", "Screening", "Mixed medicine waste seen outside a small clinic."),
  r(4, "2026-08-28", "Healthcare Professional", "Hormonal Medicine", "Surface Water", "Hospital / Clinic", "Unusual Discharge", "Pune, Maharashtra", "Received", "Discharge pipe noticed close to a lake inlet."),
  r(3, "2026-08-25", "Researcher", "Analgesic / NSAID", "Soil", "Veterinary / Farm", "Other", "Guwahati, Assam", "Received", "Question raised about carcass disposal of treated livestock."),
  r(2, "2026-08-22", "Student", "Other / Unknown", "Groundwater", "Unknown", "Odour / Discolouration", "Lucknow, Uttar Pradesh", "Received", "Hand-pump water reported with chemical-like smell."),
  r(1, "2026-08-20", "General Public", "Antibiotic", "Wastewater", "Household Disposal", "Improper Disposal", "Hyderabad, Telangana", "Received", "Leftover antibiotic courses discarded in kitchen drain."),
];

export function countBy<K extends keyof EcoReport>(reports: EcoReport[], key: K) {
  const map = new Map<string, number>();
  for (const rep of reports) map.set(String(rep[key]), (map.get(String(rep[key])) ?? 0) + 1);
  return [...map.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
}

/** Kept for the Home overview: concern categories derived from demo records. */
export const CATEGORY_COUNTS = countBy(DEMO_REPORTS, "concern").map((c) => ({
  category: c.label,
  count: c.count,
  pct: Math.round((c.count / DEMO_REPORTS.length) * 100),
}));

export const STATUS_STYLES: Record<ScreeningStatus, string> = {
  Received: "bg-secondary text-secondary-foreground",
  Screening: "bg-teal-soft text-accent-foreground",
  "Flagged for Expert Review": "bg-destructive/10 text-destructive",
};

/* ---------- Transparent rule-based screening heuristic ---------- */

export type Priority = "Low" | "Medium" | "High";

export interface SignalPattern {
  id: string;
  title: string;
  description: string;
  matches: EcoReport[];
  locations: string[];
  priority: Priority;
  reasons: string[];
}

/**
 * Rule: priority from count of similar reports + repeat location.
 *   ≥5 similar reports  → High
 *   3–4 similar reports → Medium
 *   <3                  → Low
 *   +1 level if ≥3 reports share one location (capped at High)
 */
export function screen(matches: EcoReport[]): { priority: Priority; reasons: string[] } {
  const n = matches.length;
  const levels: Priority[] = ["Low", "Medium", "High"];
  let lvl = n >= 5 ? 2 : n >= 3 ? 1 : 0;
  const reasons = [`${n} similar simulated reports matched this pattern (rule: ≥5 High, 3–4 Medium, <3 Low).`];
  const top = countBy(matches, "location")[0];
  if (top && top.count >= 3) {
    if (lvl < 2) lvl += 1;
    reasons.push(`${top.count} reports come from the same location (${top.label}) — repeat-location rule raises priority one level.`);
  }
  const distinctReporters = new Set(matches.map((m) => m.reporterType)).size;
  reasons.push(`Reported by ${distinctReporters} different reporter type${distinctReporters === 1 ? "" : "s"}.`);
  return { priority: levels[lvl], reasons };
}

function pattern(id: string, title: string, description: string, filter: (r: EcoReport) => boolean): SignalPattern {
  const matches = DEMO_REPORTS.filter(filter);
  return { id, title, description, matches, locations: countBy(matches, "location").map((l) => l.label), ...screen(matches) };
}

export const DEMO_SIGNALS: SignalPattern[] = [
  pattern("PAT-01", "Repeated antibiotic + wastewater concerns", "Antibiotic-related concerns reported in wastewater.", (x) => x.pharmaCategory === "Antibiotic" && x.medium === "Wastewater"),
  pattern("PAT-02", "Repeated hormonal medicine + water concerns", "Hormonal-medicine concerns reported in surface water or wastewater.", (x) => x.pharmaCategory === "Hormonal Medicine" && (x.medium === "Surface Water" || x.medium === "Wastewater")),
  pattern("PAT-03", "Improper disposal cluster", "Improper disposal or littered packs on open land / waste sites.", (x) => x.medium === "Open Land / Waste Site" && (x.concern === "Improper Disposal" || x.concern === "Littered Medicine Packs")),
];

export const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-teal-soft text-accent-foreground border-teal/40",
  Low: "bg-secondary text-secondary-foreground border-border",
};
