import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Júlio César — Full Stack Developer";

const copy = {
  pt: { role: "Desenvolvedor Full Stack", tagline: "Transformando desafios em soluções digitais inteligentes." },
  en: { role: "Full Stack Developer", tagline: "Turning challenges into smart digital solutions." },
};

/** Imagem de compartilhamento (Open Graph / Twitter) gerada no build, por idioma. */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[isLocale(locale) ? locale : "pt"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, #1e3a8a 0%, #0b0f19 70%)",
          color: "#f9fafb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              border: "2px solid #3b82f6",
              background: "#151d2e",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            JC
          </div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#60a5fa" }}>FULL STACK DEVELOPER</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Júlio César</div>
          <div style={{ marginTop: 20, fontSize: 44, color: "#60a5fa" }}>{t.role}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9ca3af" }}>{t.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
