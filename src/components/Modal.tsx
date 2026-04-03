import type { MenuItem } from "../data/menuData";
import { colors } from "../constants/colors";
import { Ornament } from "./Ornament";
import { RippleButton } from "./RippleButton";

interface ModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function Modal({ item, onClose }: ModalProps) {
  if (!item) return null;
  
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(30,5,5,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 520,
          background: `linear-gradient(160deg, #4A1515 0%, #2F0D0D 100%)`,
          border: `1px solid rgba(201,169,110,0.3)`,
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          padding: "36px 32px 48px",
          animation: "modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >

        <Ornament style={{ marginBottom: 20 }} />

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          color: colors.cream, fontSize: 24, fontWeight: 500,
          letterSpacing: "0.06em", marginBottom: 10, textAlign: "center",
        }}>
          {item.nome}
        </h2>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: colors.creamMuted, fontSize: 16, fontStyle: "italic",
          lineHeight: 1.65, textAlign: "center", marginBottom: 20,
        }}>
          {item.desc}
        </p>

        <div style={{
          borderTop: `1px solid rgba(201,169,110,0.2)`,
          paddingTop: 18, marginBottom: 28,
        }}>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            color: colors.gold, fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: 8, fontWeight: 500,
          }}>
            Ingredientes
          </p>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            color: "rgba(245,236,215,0.6)", fontSize: 13,
            fontWeight: 300, lineHeight: 1.7,
          }}>
            {item.ingredientes}
          </p>
        </div>

        <RippleButton
          onClick={() => window.open("https://wa.me/5500000000000", "_blank")}
          style={{
            width: "100%", padding: "15px",
            background: `linear-gradient(135deg, ${colors.gold} 0%, #A07840 100%)`,
            border: "none", borderRadius: 3,
            fontFamily: "'Cormorant Garamond', serif",
            color: colors.bordeauxDeep,
            fontSize: 16, fontWeight: 500,
            letterSpacing: "0.12em",
          }}
        >
          Solicitar este prato
        </RippleButton>

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: 12, padding: "10px",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(245,236,215,0.4)", fontSize: 14,
            letterSpacing: "0.1em",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
