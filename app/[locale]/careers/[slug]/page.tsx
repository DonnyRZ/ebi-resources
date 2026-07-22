import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { JobApplyForm } from "@/components/careers/JobApplyForm";
import {
  buildApplyMailto,
  CAREERS_EMAIL_PLACEHOLDER,
  getJob,
  JOB_SLUGS,
  type JobSlug,
} from "@/lib/careers";

export function generateStaticParams() {
  return JOB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug: rawSlug } = await params;
  const job = getJob(rawSlug);
  if (!hasLocale(routing.locales, locale) || !job) {
    notFound();
  }
  const slug: JobSlug = job.slug;
  const t = await getTranslations({ locale, namespace: "careers" });
  return {
    title: t("detail.metaTitle", { title: t(`jobs.${slug}.title`) }),
    description: t(`jobs.${slug}.summary`),
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug: rawSlug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const job = getJob(rawSlug);
  if (!job) {
    notFound();
  }
  setRequestLocale(locale);

  const slug: JobSlug = job.slug;
  const t = await getTranslations("careers");
  const title = t(`jobs.${slug}.title`);
  const requirements = t.raw(`jobs.${slug}.requirements`) as string[];

  const mailtoHref = buildApplyMailto({ roleTitle: title });

  return (
    <main>
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-wide px-4 py-12 md:px-6 md:py-16">
          <Link
            href="/careers"
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
          >
            ← {t("detail.back")}
          </Link>
          <p className="mt-8 mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t(`lines.${job.line}`)}
          </p>
          <h1 className="max-w-[22ch] font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.15] text-navy">
            {title}
          </h1>
          <p className="mt-4 font-sans text-[14px] text-text-muted">
            {t(`jobs.${slug}.location`)}
            <span className="mx-2 opacity-40" aria-hidden="true">
              ·
            </span>
            {t(`jobs.${slug}.type`)}
            <span className="mx-2 opacity-40" aria-hidden="true">
              ·
            </span>
            {t(`jobs.${slug}.level`)}
          </p>
          <div className="mt-8">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 border border-navy px-[28px] py-[14px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors duration-micro ease-quart hover:bg-navy hover:text-white"
            >
              {t("detail.applyCta")}
            </a>
          </div>
        </div>
      </section>

      <Section tone="white" width="read">
        <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
          {t("detail.summaryKicker")}
        </p>
        <p className="font-sans text-[17px] leading-[1.75] text-navy">
          {t(`jobs.${slug}.summary`)}
        </p>

        <h2 className="mt-12 mb-5 font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light text-navy">
          {t("detail.requirementsTitle")}
        </h2>
        <ul className="space-y-3">
          {requirements.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-b border-border pb-3 font-sans text-[15px] leading-[1.7] text-text-muted last:border-0"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" width="read" id="apply">
        <JobApplyForm
          roleTitle={title}
          labels={{
            title: t("apply.title"),
            intro: t("apply.intro", { email: CAREERS_EMAIL_PLACEHOLDER }),
            name: t("apply.name"),
            email: t("apply.email"),
            phone: t("apply.phone"),
            phoneHint: t("apply.phoneHint"),
            coverNote: t("apply.coverNote"),
            coverHint: t("apply.coverHint"),
            cvLink: t("apply.cvLink"),
            cvHint: t("apply.cvHint"),
            submit: t("apply.submit"),
            mailtoNote: t("apply.mailtoNote", {
              email: CAREERS_EMAIL_PLACEHOLDER,
            }),
            nameRequired: t("apply.nameRequired"),
            emailRequired: t("apply.emailRequired"),
            emailInvalid: t("apply.emailInvalid"),
          }}
        />
        <p className="mt-8 max-w-xl font-sans text-[13px] leading-relaxed text-text-muted">
          {t("apply.confirm", { email: CAREERS_EMAIL_PLACEHOLDER })}
        </p>
      </Section>
    </main>
  );
}
