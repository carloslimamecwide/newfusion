import { ImageResponse } from "next/og";

export const alt = "WebFusionLab — design and engineering for digital products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isPortuguese = locale === "pt";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#0d1733",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 0 0 58%",
            display: "flex",
            background: "#eaf2ff",
            borderLeft: "1px solid #bed3f7",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", position: "relative", fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em" }}>
          <span style={{ color: "#0d1733" }}>Web</span>
          <span style={{ color: "#1e6ff5" }}>Fusion</span>
          <span style={{ color: "#0d1733" }}>Lab</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative", maxWidth: "860px" }}>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              color: "#1e6ff5",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {isPortuguese ? "Estúdio boutique digital" : "Boutique digital studio"}
          </div>
          <div style={{ display: "flex", fontSize: "68px", lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.045em" }}>
            {isPortuguese ? "Presença digital à altura do seu negócio." : "A digital presence worthy of your business."}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", fontSize: "20px", color: "#52617f" }}>
          {isPortuguese ? "Websites · E-commerce · Produtos digitais" : "Websites · E-commerce · Digital products"}
        </div>
      </div>
    ),
    size,
  );
}
