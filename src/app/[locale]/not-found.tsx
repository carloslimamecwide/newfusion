import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { AnimatedText } from "@/components/AnimatedText";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Section className="flex min-h-[72vh] items-center border-b border-line bg-surface">
      <div className="grid w-full gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow hero-sequence-item hero-sequence-eyebrow">404</p>
          <h1 className="page-title mt-9" data-reveal="words">
            <AnimatedText text={t("notFoundTitle")} mode="words" />
          </h1>
        </div>
        <div className="lg:col-span-4">
          <p className="hero-sequence-item hero-sequence-copy leading-relaxed text-fg-muted">{t("notFoundText")}</p>
          <Link href="/" className="button-primary hero-sequence-item hero-sequence-actions mt-8">{t("backHome")}<Icon name="arrow" size={17} /></Link>
        </div>
      </div>
    </Section>
  );
}
