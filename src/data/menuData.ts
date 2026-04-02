export interface MenuItem {
  nome: string;
  desc: string;
  ingredientes: string;
}

export interface MenuData {
  [category: string]: MenuItem[];
}

export const menuData: MenuData = {
  Entradas: [
    { nome: "Bruschetta Caprese", desc: "Pão artesanal, tomate confitado, burrata cremosa e manjericão fresco", ingredientes: "Pão de fermentação natural, tomate cereja, burrata DOP, manjericão, azeite extra virgem, flor de sal" },
    { nome: "Canapés Sortidos", desc: "Seleção de canapés finos com patês artesanais e geleias especiais", ingredientes: "Pão brioche, patê de foie gras, geleia de pimenta, cream cheese, ervas frescas" },
    { nome: "Carpaccio de Filé", desc: "Fatias finas de filé ao molho de alcaparras, rúcula e parmesão", ingredientes: "Filé mignon, alcaparras, rúcula selvagem, parmesão reggiano, azeite trufado, limão siciliano" },
    { nome: "Ceviche Tropical", desc: "Peixe branco marinado em leite de tigre, manga e coentro", ingredientes: "Peixe branco fresco, leite de tigre, manga Palmer, coentro, pimenta dedo-de-moça, cebola roxa" },
  ],
  "Pratos Principais": [
    { nome: "Filé ao Molho Madeira", desc: "Medalhão de filé mignon ao tradicional molho madeira com cogumelos Paris", ingredientes: "Filé mignon, vinho Madeira, cogumelos Paris, manteiga, caldo de carne, cebola, tomilho" },
    { nome: "Salmão Grelhado Premium", desc: "Salmão norueguês com crosta de ervas, limão siciliano e alcaparras", ingredientes: "Salmão norueguês, ervas finas, limão siciliano, alcaparras, manteiga de ervas, azeite" },
    { nome: "Frango Recheado", desc: "Peito de frango recheado com queijo brie, tomate seco e rúcula", ingredientes: "Peito de frango, queijo brie, tomate seco, rúcula, alho, azeite, páprica defumada" },
    { nome: "Risoto de Camarão", desc: "Arroz arbóreo cremoso com camarões, açafrão e raspas de limão", ingredientes: "Arroz arbóreo, camarões VG, açafrão em pistilos, limão siciliano, parmesão, vinho branco seco, manteiga" },
  ],
  Acompanhamentos: [
    { nome: "Batata Rústica ao Alecrim", desc: "Batatas ao forno com azeite extra virgem, alecrim e alho", ingredientes: "Batata asterix, azeite extra virgem, alecrim fresco, alho, flor de sal, pimenta do reino" },
    { nome: "Legumes Salteados", desc: "Mix de legumes da estação salteados na manteiga com ervas finas", ingredientes: "Aspargos, abobrinha, cenoura baby, ervilha torta, manteiga, ervas finas, flor de sal" },
    { nome: "Arroz à Grega Premium", desc: "Arroz soltinho com passas, ervilhas, cenoura e amendoim", ingredientes: "Arroz agulhinha, passas douradas, ervilhas, cenoura, amendoim tostado, azeite, temperos" },
  ],
  Sobremesas: [
    { nome: "Mesa de Doces Finos", desc: "Seleção de brigadeiros gourmet, beijinhos, trufa e macarons", ingredientes: "Chocolate belga, leite condensado, creme de leite, pistache, maracujá, macarons importados" },
    { nome: "Crème Brûlée Clássico", desc: "Creme francês caramelizado com frutas vermelhas frescas", ingredientes: "Creme de leite fresco, gemas, açúcar, baunilha madagascar, frutas vermelhas frescas" },
    { nome: "Cheesecake de Frutas", desc: "Base crocante de biscoito, recheio cremoso e calda de frutas vermelhas", ingredientes: "Cream cheese, biscoito amanteigado, frutas vermelhas, gelatina, açúcar, limão" },
    { nome: "Petit Gâteau", desc: "Bolinho quente de chocolate com sorvete de baunilha artesanal", ingredientes: "Chocolate 70% cacau, manteiga, ovos, farinha, sorvete de baunilha artesanal, cacau em pó" },
  ],
  Bebidas: [
    { nome: "Drinks de Boas-vindas", desc: "Seleção de drinks autorais sem e com álcool para recepção", ingredientes: "Espumante, suco de frutas frescas, ervas aromáticas, xaropes artesanais, frutas da estação" },
    { nome: "Água Aromatizada", desc: "Água com pétalas, frutas cítricas e ervas frescas em display elegante", ingredientes: "Água mineral, pétalas de rosa, limão siciliano, manjericão, hortelã, gengibre" },
    { nome: "Estação de Café Premium", desc: "Espresso, cappuccino e variedades especiais de café", ingredientes: "Café especial single origin, leite integral, chocolate em pó, canela, açúcar demerara" },
  ],
  Vegano: [
    { nome: "Nhoque de Mandioquinha", desc: "Nhoque artesanal ao molho de tomate fresco com manjericão", ingredientes: "Mandioquinha, farinha de arroz, azeite, sal, molho de tomate fresco, manjericão, azeite trufado" },
    { nome: "Bowl de Quinoa", desc: "Quinoa real com legumes grelhados, homus artesanal e sementes", ingredientes: "Quinoa tricolor, grão-de-bico, tahine, legumes grelhados, sementes mistas, azeite, limão" },
    { nome: "Mousse Vegano de Chocolate", desc: "Mousse de chocolate 70% cacau com calda de frutas vermelhas", ingredientes: "Chocolate 70% cacau, leite de coco, aquafaba, baunilha, calda de frutas vermelhas frescas" },
  ],
};
