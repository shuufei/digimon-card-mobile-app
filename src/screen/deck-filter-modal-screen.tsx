import { ScrollView } from 'native-base';
import { FC } from 'react';
import { ColorFilter } from '../components/container/color-filter';

export const DeckFilterModalScreen: FC = () => {
  return (
    <ScrollView px={4} pt={4} pb={8}>
      <ColorFilter />
    </ScrollView>
  );
};
