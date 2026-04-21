import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cart, CartItem, type CartObserver, OrderManager } from "../../models";
import { colors } from "../../constants/colors";
import { Ornament } from "../../components/Ornament";
import { RippleButton } from "../../components/RippleButton";
import { message_carrinho } from "../../constants/message";

/**
 * CarrinhoPage - Página do carrinho de compras
 * 
 * Funcionalidades:
 * - Exibe itens selecionados
 * - Permite ajustar quantidades
 * - Remove itens
 * - Finaliza pedido enviando para WhatsApp
 * - Limpa carrinho após envio
 */
export function CarrinhoPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const cart = Cart.getInstance();

    // Observer para atualizar a lista quando houver mudanças
    const observer: CartObserver = {
      onCartChange: (updatedItems: CartItem[]) => {
        setItems(updatedItems);
      },
    };

    cart.addObserver(observer);
    setItems(cart.getItems());

    return () => {
      cart.removeObserver(observer);
    };
  }, []);

  const handleIncrement = (itemId: string) => {
    const cart = Cart.getInstance();
    cart.incrementItem(itemId);
  };

  const handleDecrement = (itemId: string) => {
    const cart = Cart.getInstance();
    cart.decrementItem(itemId);
  };

  const handleRemove = (itemId: string) => {
    const cart = Cart.getInstance();
    cart.removeItem(itemId);
  };

  const handleFinalizarPedido = () => {
    const result = OrderManager.sendOrder(items);
    
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        Cart.getInstance().clear();
        setShowSuccess(false);
        navigate("/cardapio");
      }, 2000);
    } else {
      alert(result.error || message_carrinho.erro);
    }
  };

  const handleClearCart = () => {
    if (confirm("Deseja realmente limpar o carrinho?")) {
      Cart.getInstance().clear();
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#2A0A0A",
      paddingBottom: isSmallMobile ? 80 : 100,
    }}>
      {/* Header */}
      <div style={{
        padding: isSmallMobile ? "24px 16px" : "32px 24px",
        borderBottom: `1px solid rgba(201,169,110,0.2)`,
        background: `linear-gradient(180deg, #2A0A0A 0%, #1F0707 100%)`,
      }}>
        <div style={{
          maxWidth: 600,
          margin: "0 auto",
        }}>
          <button
            onClick={() => navigate("/cardapio")}
            style={{
              background: "none",
              border: "none",
              color: colors.goldMuted,
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 16,
              fontFamily: "'Raleway', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ← Voltar ao cardápio
          </button>

          <Ornament style={{ marginBottom: 16 }} />

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            color: colors.cream,
            fontSize: isSmallMobile ? 24 : isMobile ? 28 : 32,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textAlign: "center",
            marginBottom: 8,
          }}>
            Seu Carrinho
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: colors.creamMuted,
            fontSize: 16,
            textAlign: "center",
            fontStyle: "italic",
          }}>
            {items.length === 0
              ? "Nenhum item selecionado"
              : `${items.length} ${items.length === 1 ? "item selecionado" : "itens selecionados"} (${totalItems} ${totalItems === 1 ? "unidade" : "unidades"})`}
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: isSmallMobile ? "16px" : "24px",
        width: "100%",
      }}>
        {items.length === 0 ? (
          // Carrinho vazio
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
          }}>
            <span style={{ fontSize: 64, opacity: 0.3 }}>🛒</span>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              color: colors.creamMuted,
              fontSize: 16,
              marginTop: 20,
            }}>
              {message_carrinho.carrinhoVazio}
            </p>
            <RippleButton
              onClick={() => navigate("/cardapio")}
              style={{
                marginTop: 24,
                padding: "12px 32px",
                background: `linear-gradient(135deg, ${colors.gold} 0%, #A07840 100%)`,
                border: "none",
                borderRadius: 3,
                fontFamily: "'Cormorant Garamond', serif",
                color: colors.bordeauxDeep,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.12em",
              }}
            >
              Ver Cardápio
            </RippleButton>
          </div>
        ) : (
          // Lista de itens
          <>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: `linear-gradient(160deg, rgba(74,21,21,0.4) 0%, rgba(47,13,13,0.4) 100%)`,
                  border: `1px solid rgba(201,169,110,0.2)`,
                  borderRadius: 8,
                  padding: isSmallMobile ? 16 : 20,
                  marginBottom: 16,
                  animation: "fadeUp 0.3s ease",
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: 12,
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      color: colors.cream,
                      fontSize: isSmallMobile ? 16 : isMobile ? 17 : 18,
                      fontWeight: 500,
                      marginBottom: 6,
                    }}>
                      {item.nome}
                    </h3>
                    <p style={{
                      fontFamily: "'Raleway', sans-serif",
                      color: colors.creamMuted,
                      fontSize: isSmallMobile ? 12 : 13,
                      lineHeight: 1.6,
                    }}>
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,100,100,0.6)",
                      fontSize: 20,
                      cursor: "pointer",
                      padding: "0 8px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,100,100,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,100,100,0.6)";
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Controles de quantidade */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isSmallMobile ? 12 : 16,
                  flexWrap: isSmallMobile ? "wrap" : "nowrap",
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    color: colors.gold,
                    fontSize: isSmallMobile ? 11 : 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Quantidade:
                  </span>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isSmallMobile ? 8 : 12,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 4,
                    padding: isSmallMobile ? "4px 8px" : "6px 12px",
                  }}>
                    <button
                      onClick={() => handleDecrement(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: colors.gold,
                        fontSize: 18,
                        cursor: "pointer",
                        width: isSmallMobile ? 20 : 24,
                        height: isSmallMobile ? 20 : 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </button>

                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      color: colors.cream,
                      fontSize: isSmallMobile ? 15 : 16,
                      fontWeight: 500,
                      minWidth: isSmallMobile ? 25 : 30,
                      textAlign: "center",
                    }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrement(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: colors.gold,
                        fontSize: 18,
                        cursor: "pointer",
                        width: isSmallMobile ? 20 : 24,
                        height: isSmallMobile ? 20 : 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Botões de ação */}
            <div style={{
              marginTop: isSmallMobile ? 24 : 32,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <RippleButton
                onClick={handleFinalizarPedido}
                style={{
                  width: "100%",
                  padding: isSmallMobile ? "14px" : "16px",
                  background: `linear-gradient(135deg, ${colors.gold} 0%, #A07840 100%)`,
                  border: "none",
                  borderRadius: 3,
                  fontFamily: "'Cormorant Garamond', serif",
                  color: colors.bordeauxDeep,
                  fontSize: isSmallMobile ? 15 : isMobile ? 16 : 18,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                }}
              >
                {isSmallMobile ? "Finalizar no WhatsApp" : "Finalizar Pedido via WhatsApp"}
              </RippleButton>

              <button
                onClick={handleClearCart}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "none",
                  border: `1px solid rgba(255,100,100,0.3)`,
                  borderRadius: 3,
                  fontFamily: "'Raleway', sans-serif",
                  color: "rgba(255,100,100,0.7)",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,100,100,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,100,100,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.borderColor = "rgba(255,100,100,0.3)";
                }}
              >
                Limpar Carrinho
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mensagem de sucesso */}
      {showSuccess && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(30,5,5,0.9)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            background: `linear-gradient(160deg, #4A1515 0%, #2F0D0D 100%)`,
            border: `2px solid ${colors.gold}`,
            borderRadius: 12,
            padding: 40,
            textAlign: "center",
            animation: "modalIn 0.4s ease",
          }}>
            <span style={{ fontSize: 48 }}>✓</span>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              color: colors.cream,
              fontSize: 20,
              marginTop: 16,
            }}>
              {message_carrinho.pedidoEnviado}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
