"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CAREER_FILTERS,
  CAREERS_PAGE_SIZE,
  type CareerFilter,
  type JobDefinition,
} from "@/lib/careers";

export type JobCardCopy = {
  slug: string;
  title: string;
  lineLabel: string;
  location: string;
  type: string;
  level: string;
  summary: string;
};

export type CareersListingProps = {
  jobs: JobDefinition[];
  cards: Record<string, JobCardCopy>;
  filterLabels: Record<CareerFilter, string>;
  filterAria: string;
  empty: string;
  viewRole: string;
  applyLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export function CareersListing({
  jobs,
  cards,
  filterLabels,
  filterAria,
  empty,
  viewRole,
  applyLabel,
  prevLabel,
  nextLabel,
}: CareersListingProps) {
  const t = useTranslations("careers.listing");
  const [filter, setFilter] = useState<CareerFilter>("all");
  const [page, setPage] = useState(0);

  const counts = useMemo(() => {
    const base: Record<CareerFilter, number> = {
      all: jobs.length,
      hospitality: 0,
      restaurants: 0,
      cafe: 0,
      corporate: 0,
    };
    for (const job of jobs) {
      base[job.line] += 1;
    }
    return base;
  }, [jobs]);

  const filtered = useMemo(
    () =>
      filter === "all" ? jobs : jobs.filter((j) => j.line === filter),
    [jobs, filter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / CAREERS_PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const sliceStart = safePage * CAREERS_PAGE_SIZE;
  const visible = filtered.slice(sliceStart, sliceStart + CAREERS_PAGE_SIZE);

  const selectFilter = (next: CareerFilter) => {
    setFilter(next);
    setPage(0);
  };

  const tabs: CareerFilter[] = ["all", ...CAREER_FILTERS];

  return (
    <div>
      {/* Filter toggles — not WAI-ARIA tabs (no tabpanels / roving tabindex). */}
      <div
        role="group"
        aria-label={filterAria}
        className="mb-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-border"
      >
        {tabs.map((key) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => selectFilter(key)}
              className={`relative pb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ease-quart ${
                active ? "text-gold" : "text-text-muted hover:text-navy"
              }`}
            >
              {filterLabels[key]}
              <span className="ml-1.5 tabular-nums text-text-muted">
                ({counts[key]})
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-px bg-gold transition-transform duration-micro ease-quart ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 font-sans text-[16px] leading-relaxed text-text-muted">
          {empty}
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {visible.map((job) => {
            const card = cards[job.slug];
            if (!card) return null;
            return (
              <li key={job.slug} className="group">
                <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:items-start md:gap-6">
                  <div className="md:col-span-8">
                    <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {card.lineLabel}
                    </p>
                    <h3 className="font-serif text-[1.5rem] font-light leading-snug text-navy md:text-[1.75rem]">
                      <Link
                        href={`/careers/${job.slug}`}
                        className="transition-colors duration-micro ease-quart hover:text-gold"
                      >
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-sans text-[13px] text-text-muted">
                      {card.location}
                      <span className="mx-2 opacity-40" aria-hidden="true">
                        ·
                      </span>
                      {card.type}
                      <span className="mx-2 opacity-40" aria-hidden="true">
                        ·
                      </span>
                      {card.level}
                    </p>
                    <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-[1.7] text-text-muted">
                      {card.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:col-span-4 md:justify-end md:pt-8">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-2 border border-navy px-[22px] py-[12px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors duration-micro ease-quart hover:bg-navy hover:text-white"
                    >
                      {viewRole}
                    </Link>
                    <Link
                      href={`/careers/${job.slug}#apply`}
                      className="inline-flex items-center gap-2 border border-navy bg-transparent px-[22px] py-[12px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors duration-micro ease-quart hover:bg-navy hover:text-white"
                    >
                      {applyLabel}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {filtered.length > CAREERS_PAGE_SIZE && (
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-navy transition-opacity duration-micro ease-quart disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={prevLabel}
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center border border-navy"
            >
              ←
            </span>
            {prevLabel}
          </button>
          <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-muted">
            {t("pageOf", { current: safePage + 1, total: pageCount })}
          </p>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-navy transition-opacity duration-micro ease-quart disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={nextLabel}
          >
            {nextLabel}
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center border border-navy"
            >
              →
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
