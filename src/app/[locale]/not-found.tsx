import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Section className="flex min-h-[72vh] items-center border-b border-line bg-surface">
      <div className="grid w-full gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">404</p>
          <h1 className="page-title mt-9">{t("notFoundTitle")}</h1>
        </div>
        <div className="lg:col-span-4">
          <p className="leading-relaxed text-fg-muted">{t("notFoundText")}</p>
          <Link href="/" className="button-primary mt-8">{t("backHome")}<Icon name="arrow" size={17} /></Link>
        </div>
      </div>
    </Section>
  );
}
