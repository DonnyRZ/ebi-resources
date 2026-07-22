import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";

/**
 * About — Board of Directors (`/about/board`).
 * Leadership grid with lorem placeholders; one real card: Erslan Ibrahim.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "about.board" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const MEMBERS = [
  {
    key: "erslan",
    real: true,
    initials: "EI",
    accent: "from-navy via-[#1e2040] to-navy-footer",
  },
  {
    key: "member2",
    real: false,
    initials: "AV",
    accent: "from-[#2A2B4E] to-[#3a3b5c]",
  },
  {
    key: "member3",
    real: false,
    initials: "DS",
    accent: "from-navy-footer to-navy",
  },
  {
    key: "member4",
    real: false,
    initials: "LM",
    accent: "from-[#1a1b30] to-[#2A2B4E]",
  },
  {
    key: "member5",
    real: false,
    initials: "NP",
    accent: "from-navy to-[#252642]",
  },
  {
    key: "member6",
    real: false,
    initials: "QR",
    accent: "from-[#0B1330] via-navy to-[#1e2040]",
  },
] as const;

export default async function BoardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("about.board");
  const a = await getTranslations("a11y");

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        media={{
          type: "image",
          src: "/images/hadith/facade-night-landscape.jpg",
          alt: t("alt.hero"),
        }}
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      <Section tone="white">
        <Reveal className="mb-8 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("intro.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("intro.title")}
          </h2>
          <p className="mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("intro.body")}
          </p>
        </Reveal>

        <Reveal delay={80} className="mb-10">
          <PlaceholderNotice
            label={t("placeholder.label")}
            detail={t("placeholder.detail")}
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((member) => (
              <article key={member.key} className="group flex h-full flex-col">
                <div
                  className={`relative flex aspect-[4/5] items-end overflow-hidden bg-gradient-to-br ${member.accent}`}
                  aria-hidden={!member.real}
                >
                  {/* Subtle abstract texture — no stock faces */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(184,135,59,0.5) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 40%)",
                    }}
                  />
                  <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 font-serif text-[72px] font-light leading-none text-white/25">
                    {member.initials}
                  </span>
                  <div className="relative z-10 w-full bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-16">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {t(`members.${member.key}.title`)}
                    </p>
                    <h3 className="mt-1 font-serif text-[22px] font-light text-white">
                      {t(`members.${member.key}.name`)}
                    </h3>
                  </div>
                </div>
                <p
                  className={`mt-4 font-sans text-[15px] leading-relaxed text-text-muted ${
                    member.real ? "" : "italic text-text-muted/75"
                  }`}
                >
                  {t(`members.${member.key}.bio`)}
                </p>
                {!member.real && (
                  <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-bronze/80">
                    {t("placeholder.cardLabel")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
