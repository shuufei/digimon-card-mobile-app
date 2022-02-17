import { FC } from 'react';
import { CardInfo, cardImageAspectRate } from '../../domains/card';
import { View, Heading, Text, Divider, HStack, Button } from 'native-base';
import { Card } from './card';
import { Ionicons } from '@expo/vector-icons';

export type CardsGroupedByNo = {
  [no: string]: {
    card: CardInfo;
    count: number;
  };
};

export const DeckCardList: FC<{
  title: string;
  cardsGroupedByNo: CardsGroupedByNo;
}> = ({ title, cardsGroupedByNo }) => {
  const totalCount = Object.values(cardsGroupedByNo).reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
  return (
    <View>
      <View flexDirection="row" justifyContent="space-between" px={2} py={1}>
        <Heading fontSize={14} fontWeight="medium">
          {title}
        </Heading>
        <View>
          <Text fontSize={12}>{totalCount}</Text>
        </View>
      </View>
      <Divider />
      <HStack
        flexDirection="row"
        flexWrap="wrap"
        marginTop={2}
        space={2}
        px={2}
      >
        {Object.values(cardsGroupedByNo).map(({ card, count }) => {
          return (
            <View key={card.no} paddingBottom={3}>
              <Card
                card={card}
                width={100}
                height={100 * cardImageAspectRate}
                padding={0}
              />
              <View flexDirection="row" justifyContent="center" marginTop={1}>
                <Text>{count} / 4</Text>
              </View>
              <HStack space={1}>
                <Button colorScheme="gray" variant="subtle" flex={1}>
                  <Ionicons name="add-sharp" size={12} />
                </Button>
                <Button colorScheme="gray" variant="subtle" flex={1}>
                  <Ionicons name="remove-sharp" size={12} />
                </Button>
              </HStack>
            </View>
          );
        })}
      </HStack>
    </View>
  );
};
