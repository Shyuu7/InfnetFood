import {mockProducts} from './mockProducts'

export const mockRestaurants = [
  {
    id: '1',
    name: 'Confeitaria Colombo',
    rating: 4.8,
    cuisine: 'Café & Confeitaria',
    address: 'R. Gonçalves Dias, 32 - Centro',
    featuredDish: {
      ...mockProducts['4'][4], // Bolo de Chocolate
      quantity: 1
    }
  },
  {
    id: '2',
    name: 'Nova Capela',
    rating: 4.6,
    cuisine: 'Portuguesa',
    address: 'Av. Mem de Sá, 96 - Centro',
    featuredDish: {
      ...mockProducts['1'][0], // Feijoada Completa
      quantity: 1
    }
  },
  {
    id: '3',
    name: 'Bar Luiz',
    rating: 4.5,
    cuisine: 'Alemã',
    address: 'R. da Carioca, 39 - Centro',
    featuredDish: {
      ...mockProducts['2'][1], // Hot Dog Especial
      quantity: 1
    }
  },
  {
    id: '4',
    name: 'Restaurante Garota',
    rating: 4.3,
    cuisine: 'Brasileira',
    address: 'Av. Atlântica, 500 - Centro',
    featuredDish: {
      ...mockProducts['1'][1], // Picanha Grelhada
      quantity: 1
    }
  },
  {
    id: '5',
    name: 'Casa do Sardo',
    rating: 4.7,
    cuisine: 'Italiana',
    address: 'R. do Ouvidor, 187 - Centro',
    featuredDish: {
      ...mockProducts['2'][2], // Pizza Margherita
      quantity: 1
    }
  },
  {
    id: '6',
    name: 'Café do Porto',
    rating: 4.4,
    cuisine: 'Portuguesa',
    address: 'R. Primeiro de Março, 24 - Centro',
    featuredDish: {
      ...mockProducts['1'][0], // Feijoada Completa
      quantity: 1
    }
  },
  {
    id: '7',
    name: 'Cantina da Praça',
    rating: 4.2,
    cuisine: 'Brasileira',
    address: 'Praça XV de Novembro, 32 - Centro',
    featuredDish: {
      ...mockProducts['2'][3], // Coxinha
      quantity: 1
    }
  },
  {
    id: '8',
    name: 'Sushi Rio',
    rating: 4.6,
    cuisine: 'Japonesa',
    address: 'R. do Rosário, 156 - Centro',
    featuredDish: {
      ...mockProducts['1'][4], // Yakisoba
      quantity: 1
    }
  },
  {
    id: '9',
    name: 'Tapas Bar',
    rating: 4.5,
    cuisine: 'Espanhola',
    address: 'R. Buenos Aires, 154 - Centro',
    featuredDish: {
      ...mockProducts['2'][4], // Pastel
      quantity: 1
    }
  },
  {
    id: '10',
    name: 'Bistro Central',
    rating: 4.7,
    cuisine: 'Francesa',
    address: 'R. Sete de Setembro, 55 - Centro',
    featuredDish: {
      ...mockProducts['1'][2], // Salmão ao Molho de Ervas
      quantity: 1
    }
  }
];