/**
 * Models - Camada de modelos de negócio
 * 
 * Implementa padrões de design orientado a objetos:
 * - Singleton: Cart
 * - Observer: Cart + CartObserver
 * - SRP (Single Responsibility Principle): Cada classe tem uma responsabilidade específica
 */

export { CartItem } from "./CartItem";
export { Cart, type CartObserver } from "./Cart";
export { OrderManager } from "./OrderManager";
