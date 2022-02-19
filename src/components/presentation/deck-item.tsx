import dayjs from 'dayjs';
import { first } from 'lodash';
import { Text, View } from 'native-base';
import { FC } from 'react';
import { cardImageAspectRate } from '../../domains/card';
import { Deck } from '../../domains/deck';
import { Card } from './card';

const getKeyCard = (deck: Deck) => {
  if (Object.keys(deck.cards['Lv.7']).length >= 1) {
    return first(Object.values(deck.cards['Lv.7']))?.card;
  }
  if (Object.keys(deck.cards['Lv.6']).length >= 1) {
    return first(Object.values(deck.cards['Lv.6']))?.card;
  }
  if (Object.keys(deck.cards['Lv.5']).length >= 1) {
    return first(Object.values(deck.cards['Lv.5']))?.card;
  }
  if (Object.keys(deck.cards['Lv.4']).length >= 1) {
    return first(Object.values(deck.cards['Lv.4']))?.card;
  }
  if (Object.keys(deck.cards['Lv.3']).length >= 1) {
    return first(Object.values(deck.cards['Lv.3']))?.card;
  }
  return;
};

export const DeckItem: FC<{ deck: Deck }> = ({ deck }) => {
  const keyCard = getKeyCard(deck);
  const width = 85;
  const height = width * cardImageAspectRate;
  return (
    <View px={2} pt={2} pb={8} alignItems="center">
      {keyCard ? (
        <Card width={width} height={height} card={keyCard} />
      ) : (
        <View
          width={width}
          height={height}
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray.400"
          borderRadius="sm"
        >
          <Text fontSize={9} color="white" fontWeight="semibold">
            NONE KEYCARD
          </Text>
        </View>
      )}
      <Text fontSize={12} fontWeight="semibold" marginTop="2" maxWidth={20}>
        {deck.title}
      </Text>
      <Text fontSize={12} fontWeight="medium" color="gray.400">
        {dayjs(deck.createdAt).format('YYYY/MM/DD')}
      </Text>
    </View>
  );
};
