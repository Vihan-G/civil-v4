export const HERO_TITLE = "Preliminary structural design, in minutes.";

export const HERO_BODY =
  "Civil Agent produces auditable structural schemes from architectural massing. Constraint driven. Physics based. Ready for a consultant handoff before the next design review.";

export const HERO_METRICS = [
  ["< 10 min", "Preliminary scheme"],
  ["ACI 318", "Code checks"],
  ["RC / Steel", "Multi material"]
] as const;

export const HOW_IT_WORKS_TITLE =
  "From massing to member schedule, in one loop.";

export const HOW_IT_WORKS_BODY =
  "Civil Agent does not generate a building. It reasons about the one already on the table, producing structural schemes that teams can trust, interrogate, and iterate on.";

export const HOW_IT_WORKS_STEPS = [
  {
    key: "plan",
    number: "01",
    eyebrow: "Input",
    title: "Import the architectural massing.",
    body:
      "Bring in floor plates, cores, and voids from Rhino, Revit, or IFC. Civil Agent parses the geometry into a Building Graph of bays, spans, and tributary areas.",
    tag: "Building Graph",
    tone: "blue" as const,
    annotation: ".dwg / .ifc / .3dm"
  },
  {
    key: "frame",
    number: "02",
    eyebrow: "Constraints",
    title: "Declare the constraints.",
    body:
      "Material system, target floor-to-floor, seismic zone, wind zone, and code jurisdiction become solver constraints before member sizing starts.",
    tag: "ACI 318 / ASCE 7",
    tone: "teal" as const,
    annotation: "jurisdiction / SDC"
  },
  {
    key: "optimize",
    number: "03",
    eyebrow: "Optimize",
    title: "Compare schemes side by side.",
    body:
      "Physics based iteration searches grid spacing, lateral system, and structural depth. Every scheme carries confidence against code and cost.",
    tag: "Design Graph",
    tone: "purple" as const,
    annotation: "47 schemes / 8 min"
  },
  {
    key: "handoff",
    number: "04",
    eyebrow: "Handoff",
    title: "Hand off, not hand over.",
    body:
      "Export a structured report with member schedules, load tables, design notes, and a live link back to the graph.",
    tag: "Design Summary",
    tone: "coral" as const,
    annotation: ".pdf / .ifc / live link"
  }
] as const;
