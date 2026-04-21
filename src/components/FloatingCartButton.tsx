import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cart, type CartObserver, type CartItem } from "../models";
import { colors } from "../constants/colors";

/**
 * FloatingCartButton - Botão flutuante do carrinho
 * 
 * Implementa o padrão Observer para atualizar automaticamente
 * quando itens são adicionados/removidos do carrinho.
 * 
 * Características:
 * - Badge com contador de itens
 * - Animação de entrada
 * - Navegação para página do carrinho
 * - Auto-oculta quando vazio
 */
export function FloatingCartButton() {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cart = Cart.getInstance();
    
    // Observer que atualiza o contador
    const observer: CartObserver = {
      onCartChange: (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(total);
        setIsVisible(total > 0);
      },
    };

    // Registra o observer
    cart.addObserver(observer);
    
    // Inicializa com o valor atual
    const currentItems = cart.getItems();
    const total = currentItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(total);
    setIsVisible(total > 0);

    // Cleanup: remove observer quando componente desmonta
    return () => {
      cart.removeObserver(observer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => navigate("/carrinho")}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.gold} 0%, #A07840 100%)`,
        border: `2px solid ${colors.goldMuted}`,
        boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        transition: "all 0.3s ease",
        animation: "fadeUp 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,169,110,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,169,110,0.4)";
      }}
    >
      {/* Ícone do carrinho */}
      <span style={{ fontSize: 28, color: colors.bordeauxDeep }}>🛒</span>
      
      {/* Badge com contador */}
      {itemCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: colors.bordeauxDark,
            border: `2px solid ${colors.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Raleway', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: colors.cream,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </div>
      )}
    </button>
  );
}
