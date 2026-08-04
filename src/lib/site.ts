export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://webfusionlab.pt"
  );
}

export function getCalendlyUrl() {
  return process.env.NEXT_PUBLIC_CALENDLY_URL || "";
}
