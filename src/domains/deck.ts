export type Deck = {
  id: string;
  title: string;
};

export const createDeck = (deck: Partial<Deck>): Deck => {
  return {
    id: `${new Date().valueOf()}-${Math.random()}`,
    title: '',
    ...deck,
  };
};
