export interface MenuItem {
  nome: string;
  desc: string;
  ingredientes: string;
  img?: string; 
}

export interface MenuData {
  [category: string]: MenuItem[];
}

import { entradas } from './cardapio/entradas';
import { pratosPrincipais } from './cardapio/pratos_principais';
import { acompanhamentos } from './cardapio/acompanhamentos';
import { sobremesas } from './cardapio/sobremesas';
import { bebidas } from './cardapio/bebidas';
import { vegano } from './cardapio/vegano';

export const menuData: MenuData = {
  Entradas: entradas,
  "Pratos Principais": pratosPrincipais,
  Acompanhamentos: acompanhamentos,
  Sobremesas: sobremesas,
  Bebidas: bebidas,
  Vegano: vegano,
};
