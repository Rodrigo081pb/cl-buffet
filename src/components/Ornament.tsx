import type { CSSProperties } from "react";
import { colors } from "../constants/colors";

interface OrnamentProps {
  style?: CSSProperties;
}

export function Ornament({ style }: OrnamentProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      color: colors.gold, fontFamily: "'Cormorant Garamond', serif",
      fontSize: 13, letterSpacing: "0.15em", ...style
    }}>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${colors.goldMuted}, ${colors.gold})` }} />
      <span style={{ animation: "shimmer 3s ease-in-out infinite", opacity: 0.8 }}>✦</span>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${colors.goldMuted}, ${colors.gold})` }} />
    </div>
  );
}
