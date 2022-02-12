import { ScrollView, VStack } from 'native-base';
import { FC } from 'react';
import { ColorFilter } from '../components/container/color-filter';
import { CardTypeFilter } from '../components/container/card-type-filter';

export const DeckFilterModalScreen: FC = () => {
  return (
    <ScrollView px={4} pt={4} pb={8}>
      <VStack space={4}>
        <ColorFilter />
        <CardTypeFilter />
      </VStack>
    </ScrollView>
  );
};
