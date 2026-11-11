import type { ExperienceItem } from "../types";

// Only add an outcome (placement, prize) here if it can be verified against a
// source. "hackathon" and "challenge" entries are labelled as participation in
// the UI, and nothing below claims a win.
export const experience: ExperienceItem[] = [
  {
    id: "abyss-ai",
    title: "Co-founder",
    org: "ABYSS AI",
    period: "Nov 2026 to present",
    kind: "role",
    summary:
      "Early-stage initiative building a hardware-agnostic autonomy layer for underwater robots, developed from a collaborative simulation prototype.",
    details: [
      "My side: the simulator, pathfinding and safe-return mission integration, and the interactive Mission Control.",
      "Today it is a simulation. No physical robot has been built or deployed.",
    ],
    projectSlug: "abyss",
  },
  {
    id: "whack-2026",
    title: "WHACK 2026",
    org: "Marshall Wace New Worlds Challenge",
    period: "Nov 2026",
    kind: "hackathon",
    summary: "Built ABYSS with two teammates in 24 hours.",
    projectSlug: "abyss",
  },
  {
    id: "cal-hacks",
    title: "Cal Hacks 13.0",
    org: "Berkeley, California",
    period: "Oct 2026",
    kind: "hackathon",
    summary:
      "Built RecallAI with three teammates, a camera that remembers where your belongings were last seen. I developed the Temporal Memory layer.",
    projectSlug: "recallai",
  },
  {
    id: "dare",
    title: "Python engineering challenge",
    org: "Dare Innovation Labs",
    period: "Oct 2026",
    kind: "challenge",
    summary: "Completed a Python engineering challenge.",
  },
  {
    id: "uob",
    title: "Computer Engineering",
    org: "University of Birmingham",
    period: "Sep 2026 to present",
    kind: "education",
    summary:
      "Studying Computer Engineering, and building ambitious software alongside the course.",
  },
];
