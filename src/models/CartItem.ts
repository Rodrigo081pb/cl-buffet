import type { MenuItem } from "../data/menuData";

/**
 * CartItem - Representa um item no carrinho de compras
 * 
 * Esta classe encapsula um item do menu junto com sua quantidade,
 * seguindo o princípio de responsabilidade única (SRP).
 */
export class CartItem {
  private _menuItem: MenuItem;
  private _quantity: number;
  private _id: string;

  constructor(menuItem: MenuItem, quantity: number = 1) {
    this._menuItem = menuItem;
    this._quantity = quantity;
    this._id = this.generateId(menuItem);
  }

  /**
   * Gera um ID único baseado no nome do item
   */
  private generateId(item: MenuItem): string {
    return item.nome.toLowerCase().replace(/\s+/g, '-');
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get menuItem(): MenuItem {
    return this._menuItem;
  }

  get quantity(): number {
    return this._quantity;
  }

  get nome(): string {
    return this._menuItem.nome;
  }

  get desc(): string {
    return this._menuItem.desc;
  }

  /**
   * Incrementa a quantidade do item
   */
  incrementQuantity(): void {
    this._quantity++;
  }

  /**
   * Decrementa a quantidade do item
   * @returns true se a quantidade é maior que 0, false caso contrário
   */
  decrementQuantity(): boolean {
    if (this._quantity > 1) {
      this._quantity--;
      return true;
    }
    return false;
  }

  /**
   * Define uma quantidade específica
   */
  setQuantity(quantity: number): void {
    if (quantity > 0) {
      this._quantity = quantity;
    }
  }

  /**
   * Converte o item para formato de mensagem
   */
  toMessageFormat(): string {
    return `• ${this._quantity}x ${this._menuItem.nome}`;
  }
}
