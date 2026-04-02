import type { MenuItem as MenuItemType } from "../data/menuData";
import { colors } from "../constants/colors";

interface MenuItemProps {
  item: MenuItemType;
  onClick: (item: MenuItemType) => void;
}

export function MenuItem({ item, onClick }: MenuItemProps) {
  return (
    <div
      onClick={() => onClick(item)}
      style={{
        padding: "20px 0", cursor: "pointer",
        borderBottom: `1px solid rgba(201,169,110,0.18)`,
        transition: "all 0.2s ease",
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
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        color: colors.cream, fontSize: 16, fontWeight: 400,
        letterSpacing: "0.04em", marginBottom: 6,
      }}>
        {item.nome}
      </h3>
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        color: "rgba(245,236,215,0.65)", fontSize: 13,
        fontWeight: 300, lineHeight: 1.6, letterSpacing: "0.02em",
      }}>
        {item.desc}
      </p>
    </div>
  );
}
