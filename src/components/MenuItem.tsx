import type { MenuItem as MenuItemType } from "../data/menuData";
import { colors } from "../constants/colors";
import { Cart } from "../models";

interface MenuItemProps {
  item: MenuItemType;
  onClick: (item: MenuItemType) => void;
}

export function MenuItem({ item, onClick }: MenuItemProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o modal
    const cart = Cart.getInstance();
    cart.addItem(item);
  };

  const isMobile = window.innerWidth <= 480;

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        padding: isMobile ? "16px 0" : "20px 0", 
        cursor: "pointer",
        borderBottom: `1px solid rgba(201,169,110,0.18)`,
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 12 : 18,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.paddingLeft = "8px";
        e.currentTarget.style.background = "rgba(201,169,110,0.04)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.paddingLeft = "0px";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Imagem elegante do prato */}
      <div style={{
        width: isMobile ? 48 : 54, 
        height: isMobile ? 48 : 54,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.goldMuted} 0%, ${colors.bordeauxDark} 100%)`,
        border: `1.5px solid ${colors.goldMuted}`,
        boxShadow: `0 2px 12px rgba(0,0,0,0.10)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {item.img && item.img !== "/imgs/default-food.svg" ? (
          <img
            src={item.img}
            alt={item.nome}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <span style={{ color: colors.goldMuted, fontSize: 22, opacity: 0.5 }}>🍽️</span>
        )}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          color: colors.cream, 
          fontSize: isMobile ? 15 : 16, 
          fontWeight: 400,
          letterSpacing: "0.04em", marginBottom: 6,
          textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"
        }}>
          {item.nome}
        </h3>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          color: "rgba(245,236,215,0.65)", 
          fontSize: isMobile ? 12 : 13,
          fontWeight: 300, lineHeight: 1.6, letterSpacing: "0.02em",
          textOverflow: "ellipsis", overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
          {item.desc}
        </p>
      </div>

      {/* Botão Adicionar ao Carrinho */}
      <button
        onClick={handleAddToCart}
        style={{
          background: `linear-gradient(135deg, ${colors.gold} 0%, #A07840 100%)`,
          border: "none",
          borderRadius: 4,
          padding: isMobile ? "6px 12px" : "8px 16px",
          color: colors.bordeauxDeep,
          fontFamily: "'Raleway', sans-serif",
          fontSize: isMobile ? 11 : 12,
          fontWeight: 600,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(201,169,110,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(201,169,110,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(201,169,110,0.3)";
        }}
      >
        Adicionar carrinho
      </button>
    </div>
  );
}
