import type { MenuItem } from "../data/menuData";
import { CartItem } from "./CartItem";

/**
 * CartObserver - Interface para observadores do carrinho
 * Implementa o padrão Observer para notificar mudanças no carrinho
 */
export interface CartObserver {
  onCartChange(items: CartItem[]): void;
}

/**
 * Cart - Gerenciador do carrinho de compras
 * 
 * Implementa o padrão Singleton para garantir uma única instância do carrinho
 * e o padrão Observer para notificar componentes sobre mudanças.
 * 
 * Responsabilidades:
 * - Adicionar/remover itens
 * - Gerenciar quantidades
 * - Notificar observadores sobre mudanças
 * - Persistir dados no localStorage
 */
export class Cart {
  private static instance: Cart;
  private items: Map<string, CartItem>;
  private observers: CartObserver[];
  private readonly STORAGE_KEY = "cl-buffet-cart";

  private constructor() {
    this.items = new Map();
    this.observers = [];
    this.loadFromStorage();
  }

  /**
   * Obtém a instância única do carrinho (Singleton)
   */
  static getInstance(): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
  }

  /**
   * Registra um observador para mudanças no carrinho
   */
  addObserver(observer: CartObserver): void {
    this.observers.push(observer);
  }

  /**
   * Remove um observador
   */
  removeObserver(observer: CartObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  /**
   * Notifica todos os observadores sobre mudanças
   */
  private notifyObservers(): void {
    const items = Array.from(this.items.values());
    this.observers.forEach(observer => observer.onCartChange(items));
    this.saveToStorage();
  }

  /**
   * Adiciona um item ao carrinho
   * Se o item já existe, incrementa a quantidade
   */
  addItem(menuItem: MenuItem): void {
    const tempItem = new CartItem(menuItem);
    const itemId = tempItem.id;

    if (this.items.has(itemId)) {
      this.items.get(itemId)!.incrementQuantity();
    } else {
      this.items.set(itemId, tempItem);
    }

    this.notifyObservers();
  }

  /**
   * Remove um item do carrinho
   */
  removeItem(itemId: string): void {
    this.items.delete(itemId);
    this.notifyObservers();
  }

  /**
   * Incrementa a quantidade de um item
   */
  incrementItem(itemId: string): void {
    const item = this.items.get(itemId);
    if (item) {
      item.incrementQuantity();
      this.notifyObservers();
    }
  }

  /**
   * Decrementa a quantidade de um item
   * Remove o item se a quantidade chegar a 0
   */
  decrementItem(itemId: string): void {
    const item = this.items.get(itemId);
    if (item) {
      const stillExists = item.decrementQuantity();
      if (!stillExists) {
        this.items.delete(itemId);
      }
      this.notifyObservers();
    }
  }

  /**
   * Obtém todos os itens do carrinho
   */
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Obtém a quantidade total de itens (soma de todas as quantidades)
   */
  getTotalItems(): number {
    return Array.from(this.items.values()).reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  /**
   * Verifica se o carrinho está vazio
   */
  isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * Limpa todos os itens do carrinho
   */
  clear(): void {
    this.items.clear();
    this.notifyObservers();
  }

  /**
   * Verifica se um item está no carrinho
   */
  hasItem(menuItem: MenuItem): boolean {
    const tempItem = new CartItem(menuItem);
    return this.items.has(tempItem.id);
  }

  /**
   * Salva o carrinho no localStorage
   */
  private saveToStorage(): void {
    try {
      const data = Array.from(this.items.values()).map(item => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }

  /**
   * Carrega o carrinho do localStorage
   */
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const items = JSON.parse(data);
        items.forEach((item: { menuItem: MenuItem; quantity: number }) => {
          const cartItem = new CartItem(item.menuItem, item.quantity);
          this.items.set(cartItem.id, cartItem);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  }
}
