import { FC } from 'react';
import { CreateDeckSheet } from './create-deck-sheet';
import { DeckDetailSheet } from './deck-detail-sheet';

export const DeckScreenSheet: FC = () => {
  return (
    <>
      <DeckDetailSheet />
      <CreateDeckSheet />
    </>
  );
};
