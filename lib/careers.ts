/**
 * Careers catalog — current EGI Resources roles listed on JobStreet.
 * Copy lives in messages; this file owns slugs, filter lines, and ordering.
 */

export const CAREERS_EMAIL_PLACEHOLDER = "[careers-email]";

/** Filter tabs aligned to EBI lines (not legacy source sectors). */
export type CareerFilter =
  | "all"
  | "hospitality"
  | "restaurants"
  | "corporate";

export const CAREER_FILTERS: Exclude<CareerFilter, "all">[] = [
  "hospitality",
  "restaurants",
  "corporate",
];

export const JOB_SLUGS = [
  "purchasing-procurement-expeditor-junior-manager",
  "finance-accounting-tax-supervisor",
  "hotel-marketing-manager",
  "marketing-manager-hotel",
  "it-engineer-manager-hotel-uzbekistan",
  "therapist-spa-wellness-uzbekistan",
  "room-manager-hotel-uzbekistan",
  "general-manager-hotel-samarkand",
  "chef-uzbekistan",
] as const;

export type JobSlug = (typeof JOB_SLUGS)[number];

export type JobDefinition = {
  slug: JobSlug;
  /** Primary filter line for this role. */
  line: Exclude<CareerFilter, "all">;
};

export const JOBS: JobDefinition[] = [
  { slug: "purchasing-procurement-expeditor-junior-manager", line: "corporate" },
  { slug: "finance-accounting-tax-supervisor", line: "corporate" },
  { slug: "hotel-marketing-manager", line: "hospitality" },
  { slug: "marketing-manager-hotel", line: "hospitality" },
  { slug: "it-engineer-manager-hotel-uzbekistan", line: "hospitality" },
  { slug: "therapist-spa-wellness-uzbekistan", line: "hospitality" },
  { slug: "room-manager-hotel-uzbekistan", line: "hospitality" },
  { slug: "general-manager-hotel-samarkand", line: "hospitality" },
  { slug: "chef-uzbekistan", line: "restaurants" },
];

export const CAREERS_PAGE_SIZE = 4;

export function isJobSlug(slug: string): slug is JobSlug {
  return (JOB_SLUGS as readonly string[]).includes(slug);
}

export function getJob(slug: string): JobDefinition | undefined {
  if (!isJobSlug(slug)) return undefined;
  return JOBS.find((j) => j.slug === slug);
}

export function filterJobs(line: CareerFilter): JobDefinition[] {
  if (line === "all") return JOBS;
  return JOBS.filter((j) => j.line === line);
}

export function countByLine(line: CareerFilter): number {
  return filterJobs(line).length;
}

export function buildApplyMailto(opts: {
  roleTitle: string;
  name?: string;
  email?: string;
  phone?: string;
  coverNote?: string;
}): string {
  const subject = `Application: ${opts.roleTitle} — EBI Resources`;
  const lines = [
    `Role: ${opts.roleTitle}`,
    `Please send this application to ${CAREERS_EMAIL_PLACEHOLDER}.`,
    "",
    opts.name ? `Name: ${opts.name}` : null,
    opts.email ? `Email: ${opts.email}` : null,
    opts.phone ? `Phone: ${opts.phone}` : null,
    opts.coverNote ? `\nCover note:\n${opts.coverNote}` : null,
    "",
    "CV / portfolio link (optional):",
  ].filter((line): line is string => line !== null);

  const params = new URLSearchParams({
    subject,
    body: lines.join("\n"),
  });
  // Empty recipient until the client provides a real recruiting inbox.
  return `mailto:?${params.toString()}`;
}
