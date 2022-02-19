import { CardsGroupedByLvAndCardTypeAndNo, CardInfo } from './card';

export type Deck = {
  id: string;
  title: string;
  cards: CardsGroupedByLvAndCardTypeAndNo;
  createdAt: number;
};

export const createDeck = (deck: Partial<Deck>): Deck => {
  return {
    id: `${new Date().valueOf()}-${Math.random()}`,
    title: '',
    cards: {
      'Lv.2': {},
      'Lv.3': {},
      'Lv.4': {},
      'Lv.5': {},
      'Lv.6': {},
      'Lv.7': {},
      '-': {},
      '3_テイマー': {},
      '4_オプション': {},
    },
    createdAt: new Date().valueOf(),
    ...deck,
  };
};
