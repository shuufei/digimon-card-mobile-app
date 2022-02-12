import { ScrollView, VStack } from 'native-base';
import { FC } from 'react';
import { ColorFilter } from '../components/container/color-filter';
import { CardTypeFilter } from '../components/container/card-type-filter';
import { DigimonLevelFilter } from '../components/container/digimon-level-filter';

export const DeckFilterModalScreen: FC = () => {
  return (
    <ScrollView>
      <VStack space={4} px={4} pt={4} pb={20}>
        <ColorFilter />
        <CardTypeFilter />
        <DigimonLevelFilter />
      </VStack>
    </ScrollView>
  );
};
