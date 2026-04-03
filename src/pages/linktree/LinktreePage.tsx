import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import { Ornament } from "../../components/Ornament";
import { RippleButton } from "../../components/RippleButton";

export function LinktreePage() {
  const navigate = useNavigate();

  const links = [
    { label: "Cardápio Completo", action: () => navigate("/cardapio") },
    { label: "Solicitar Orçamento", action: () => window.open("https://wa.me/5500000000000", "_blank") },
    { label: "Nossos Eventos", action: () => window.open("https://instagram.com/cl_buffet12", "_blank") },
    { label: "Onde Estamos", action: () => window.open("https://maps.google.com", "_blank") },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 0%, #7A2020 0%, #5C1E1E 30%, #3D1010 65%, #2A0A0A 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "48px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      {[
        { w: 340, h: 340, top: "-80px", left: "-60px", dur: "8s" },
        { w: 260, h: 260, bottom: "40px", right: "-40px", dur: "11s", delay: "2s" },
        { w: 180, h: 180, top: "40%", left: "60%", dur: "14s", delay: "4s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: o.w, height: o.h,
          top: o.top, left: o.left, bottom: o.bottom, right: o.right,
          background: `radial-gradient(circle, ${colors.gold} 0%, transparent 70%)`,
          opacity: 0.07,
          animation: `orbFloat ${o.dur} ease-in-out infinite`,
          animationDelay: o.delay || "0s",
          pointerEvents: "none",
        }} />
      ))}

      <div style={{
        width: "100%", maxWidth: 420,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 0,
      }}>
        {/* Logo */}
        <div style={{
          width: 116, height: 116,
          borderRadius: "50%",
          border: `1.5px solid ${colors.gold}`,
          boxShadow: `0 0 0 6px rgba(201,169,110,0.08), 0 0 40px rgba(201,169,110,0.12)`,
          overflow: "hidden", marginBottom: 24,
          animation: "fadeIn 0.8s ease-out forwards",
        }}>
          <img
            src="/logo.png"
            alt="CL Buffet"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          color: colors.cream, fontSize: 30, fontWeight: 500,
          letterSpacing: "0.12em", textAlign: "center",
          animation: "fadeUp 0.7s ease-out 0.1s both",
        }}>
          CL Buffet
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: colors.creamMuted, fontSize: 15, fontStyle: "italic",
          letterSpacing: "0.06em", textAlign: "center", marginTop: 6,
          animation: "fadeUp 0.7s ease-out 0.2s both",
        }}>
          Sabor e elegância em cada celebração
        </p>

        {/* Ornament */}
        <div style={{
          width: "100%", marginTop: 22, marginBottom: 28,
          animation: "fadeIn 0.7s ease-out 0.3s both",
        }}>
          <Ornament />
        </div>

        {/* Links */}
        <div style={{
          width: "100%", display: "flex", flexDirection: "column", gap: 12,
        }}>
          {links.map((link, i) => (
            <RippleButton
              key={i}
              onClick={link.action}
              style={{
                width: "100%", padding: "16px 28px",
                background: "rgba(245,236,215,0.05)",
                border: `1px solid rgba(201,169,110,0.45)`,
                borderRadius: 3,
                fontFamily: "'Cormorant Garamond', serif",
                color: colors.cream,
                fontSize: 17, fontWeight: 400,
                letterSpacing: "0.12em",
                textAlign: "center",
                transition: "all 0.25s ease",
                animation: `fadeUp 0.6s ease-out ${0.35 + i * 0.08}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(201,169,110,0.1)";
                e.currentTarget.style.borderColor = colors.gold;
                e.currentTarget.style.boxShadow = `0 0 18px rgba(201,169,110,0.18)`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(245,236,215,0.05)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            >
              {link.label}
            </RippleButton>
          ))}
        </div>

        {/* Ornament bottom */}
        <div style={{ width: "100%", marginTop: 32, marginBottom: 20, animation: "fadeIn 0.7s ease-out 0.9s both" }}>
          <Ornament />
        </div>

        {/* Social links */}

        <div style={{
          display: "flex", gap: 28,
          animation: "fadeUp 0.6s ease-out 1s both",
        }}>
          <button
            onClick={() => window.open("https://instagram.com/cl_buffet12", "_blank")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              color: colors.goldLight, fontSize: 13,
              letterSpacing: "0.14em", fontWeight: 400,
              opacity: 0.7, transition: "opacity 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
          >
            Instagram
          </button>
          <button
            onClick={() => window.open("https://wa.me/5500000000000", "_blank")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              color: colors.goldLight, fontSize: 13,
              letterSpacing: "0.14em", fontWeight: 400,
              opacity: 0.7, transition: "opacity 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
          >
            WhatsApp
          </button>
        </div>

          
      </div>
    </div>
  );
}
