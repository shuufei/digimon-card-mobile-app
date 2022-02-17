import { CardInfo } from '../domains/card';

export type Deck = {
  id: string;
  title: string;
  cards: CardInfo[];
};

export const createDeck = (deck: Partial<Deck>): Deck => {
  return {
    id: `${new Date().valueOf()}-${Math.random()}`,
    title: '',
    cards: [],
    ...deck,
  };
};
