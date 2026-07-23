import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * About — Board of Directors (`/about/board`).
 * Only confirmed leadership is shown: Erslan Ibrahim.
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
          src: "/images/hadith/grand-lobby.jpg",
          alt: t("alt.hero"),
          objectPosition: "center 42%",
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

        <Reveal>
          <article className="group flex max-w-sm flex-col">
            {/*
              Source: Assets/Erslan Ibrahim/Pak Erslan (4).png — 1124×1399 (~0.80),
              near-native 4:5. Face sits upper-center; object-position keeps head clear
              of the bottom name gradient.
            */}
            <div className="relative aspect-[4/5] overflow-hidden bg-navy">
              <Image
                src="/images/leadership/erslan-ibrahim.png"
                alt={t("alt.erslan")}
                fill
                sizes="(max-width: 640px) 100vw, 24rem"
                className="object-cover object-[center_18%]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-5 pb-5 pt-20">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                  {t("members.erslan.title")}
                </p>
                <h3 className="mt-1 font-serif text-[22px] font-light text-white">
                  {t("members.erslan.name")}
                </h3>
              </div>
            </div>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-muted">
              {t("members.erslan.bio")}
            </p>
          </article>
        </Reveal>
      </Section>
    </main>
  );
}
