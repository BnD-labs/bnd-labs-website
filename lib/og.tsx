import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgImageProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

/**
 * Shared OG image layout. Used by per-route opengraph-image.tsx files.
 * Uses inline styles (required by next/og ImageResponse — no Tailwind).
 */
export function generateOgImage({ title, description, eyebrow }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 80px",
          backgroundColor: "#101a40",
          backgroundImage:
            "radial-gradient(circle at 80% 30%, rgba(109,213,234,0.2), transparent 50%), radial-gradient(circle at 20% 80%, rgba(176,108,200,0.12), transparent 40%)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#eee6d6" }}>bnd</span>
          <span style={{ color: "#6dd5ea" }}> labs</span>
        </div>

        {/* Eyebrow */}
        {eyebrow && (
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#6dd5ea",
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "85%",
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              marginTop: 20,
              lineHeight: 1.5,
              maxWidth: "75%",
            }}
          >
            {description.length > 120
              ? description.slice(0, 117) + "..."
              : description}
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(to right, #6dd5ea, #b06cc8, #e07848)",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
