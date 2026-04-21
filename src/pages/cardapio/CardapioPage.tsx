import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import { menuData } from "../../data/menuData";
import type { MenuItem as MenuItemType } from "../../data/menuData";
import { Ornament } from "../../components/Ornament";
import { RippleButton } from "../../components/RippleButton";
import { MenuItem } from "../../components/MenuItem";
import { Modal } from "../../components/Modal";
import { FloatingCartButton } from "../../components/FloatingCartButton";
import { whats } from "../../constants/info";

export function CardapioPage() {
  const navigate = useNavigate();
  const categories = Object.keys(menuData);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 0%, #6B2020 0%, #4A1515 30%, #2F0D0D 70%, #1A0505 100%)`,
      display: "flex", flexDirection: "column",
      animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      {/* Header */}
      <div style={{
        padding: "24px 24px 0",
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(47,13,13,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(201,169,110,0.15)`,
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16, position: "relative" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(245,236,215,0.6)", fontSize: 15,
                letterSpacing: "0.08em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = colors.goldLight}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,236,215,0.6)"}
            >
              ← Voltar
            </button>
            <h1 style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Playfair Display', serif",
              color: colors.cream, fontSize: 20, fontWeight: 500,
              letterSpacing: "0.14em",
            }}>
              Cardápio
            </h1>
          </div>

          <Ornament style={{ marginBottom: 16 }} />

          {/* Tabs */}
          <div
            ref={tabsRef}
            style={{
              display: "flex", gap: 0,
              overflowX: "auto", paddingBottom: 0,
              scrollbarWidth: "none",
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "10px 16px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 15, letterSpacing: "0.08em",
                  color: activeTab === cat ? colors.goldLight : "rgba(245,236,215,0.45)",
                  borderBottom: activeTab === cat ? `2px solid ${colors.gold}` : "2px solid transparent",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  fontWeight: activeTab === cat ? 500 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{
        flex: 1, padding: "8px 24px 100px",
        maxWidth: 520, margin: "0 auto", width: "100%",
      }}>
        {menuData[activeTab].map((item, i) => (
          <div key={i} style={{ animation: `fadeUp 0.4s ease-out ${i * 0.06}s both` }}>
            <MenuItem item={item} onClick={setSelectedItem} />
          </div>
        ))}
      </div>

      {/* Floating CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20,
        padding: "16px 24px 24px",
        background: "linear-gradient(to top, rgba(30,5,5,0.98) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <RippleButton
            onClick={() => window.open(`https://wa.me/${whats.numero.replace(/\D/g, '')}`, "_blank")}
            style={{
              width: "100%", padding: "16px",
              background: `linear-gradient(135deg, ${colors.bordeaux} 0%, ${colors.bordeauxDeep} 100%)`,
              border: `1px solid ${colors.gold}`,
              borderRadius: 3,
              fontFamily: "'Cormorant Garamond', serif",
              color: colors.gold,
              fontSize: 16, fontWeight: 400,
              letterSpacing: "0.12em",
              boxShadow: `0 4px 24px rgba(0,0,0,0.5)`,
            }}
          >
            Solicitar Orçamento Personalizado
          </RippleButton>
        </div>
      </div>

      {/* Botão flutuante do carrinho */}
      <FloatingCartButton />

      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
