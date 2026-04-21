import type { CartItem } from "./CartItem";
import { whats } from "../constants/info";

/**
 * OrderManager - Gerenciador de pedidos
 * 
 * Responsabilidades:
 * - Formatar mensagem do pedido para WhatsApp
 * - Gerar link de redirecionamento
 * - Validar pedido antes de enviar
 * 
 * Segue o princípio de responsabilidade única (SRP)
 */
export class OrderManager {
  private static readonly GREETING = "Olá! Gostaria de fazer um pedido para meu evento:";
  private static readonly FOOTER = "\nAguardo retorno para confirmação e valores. Obrigado!";

  /**
   * Formata a lista de itens para a mensagem
   */
  private static formatItems(items: CartItem[]): string {
    if (items.length === 0) {
      return "";
    }

    const itemsList = items
      .map(item => item.toMessageFormat())
      .join("\n");

    return `\n\n*Itens selecionados:*\n${itemsList}`;
  }

  /**
   * Cria a mensagem completa do pedido
   */
  static createOrderMessage(items: CartItem[]): string {
    const itemsText = this.formatItems(items);
    return `${this.GREETING}${itemsText}${this.FOOTER}`;
  }

  /**
   * Gera o link do WhatsApp com a mensagem
   */
  static generateWhatsAppLink(items: CartItem[]): string {
    const message = this.createOrderMessage(items);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whats.numero.replace(/\D/g, '')}?text=${encodedMessage}`;
  }

  /**
   * Valida se o pedido pode ser enviado
   */
  static validateOrder(items: CartItem[]): { valid: boolean; error?: string } {
    if (items.length === 0) {
      return {
        valid: false,
        error: "O carrinho está vazio. Adicione itens antes de finalizar o pedido.",
      };
    }

    return { valid: true };
  }

  /**
   * Envia o pedido abrindo o WhatsApp
   */
  static sendOrder(items: CartItem[]): { success: boolean; error?: string } {
    const validation = this.validateOrder(items);
    
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    try {
      const link = this.generateWhatsAppLink(items);
      window.open(link, "_blank");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Erro ao abrir WhatsApp. Tente novamente.",
      };
    }
  }

  /**
   * Obtém o resumo do pedido (útil para exibição)
   */
  static getOrderSummary(items: CartItem[]): {
    totalItems: number;
    uniqueItems: number;
    itemsList: string[];
  } {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueItems = items.length;
    const itemsList = items.map(item => `${item.quantity}x ${item.nome}`);

    return {
      totalItems,
      uniqueItems,
      itemsList,
    };
  }
}
