import { ImageResponse } from "next/og";

export const alt = "WebFusionLab — custom digital experiences";
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
          background: "#f7f6f2",
          color: "#171819",
          padding: "58px 66px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: "25px", fontWeight: 700, lineHeight: 0.76, letterSpacing: "-0.08em" }}>
          <span>web</span><span>fusion</span><span>lab</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative", maxWidth: "720px" }}>
          <div style={{ display: "flex", marginBottom: "24px", fontSize: "15px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {isPortuguese ? "Desenvolvimento web & estratégia digital" : "Web development & digital strategy"}
          </div>
          <div style={{ display: "flex", fontSize: "76px", lineHeight: 0.92, fontWeight: 400, letterSpacing: "-0.065em" }}>
            {isPortuguese ? "criamos experiências digitais_" : "we create digital experiences_"}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", paddingTop: "20px", borderTop: "1px solid #deddd9", fontSize: "16px", color: "#666766" }}>
          {isPortuguese ? "Estratégia · Design · Desenvolvimento" : "Strategy · Design · Development"}
        </div>
      </div>
    ),
    size,
  );
}
