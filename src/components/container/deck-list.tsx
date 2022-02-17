import { Pressable, Text, View, VStack } from 'native-base';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/deck-store';

export const DeckList: FC = () => {
  const dispatch = useDispatch();
  const decks = useSelector(selectors.decksSelector);

  return (
    <View>
      <Text>deck list: {decks.length}</Text>
      <VStack p={4} space={3}>
        {decks.map((deck) => {
          return (
            <Pressable
              key={deck.id}
              px={4}
              py={3}
              borderColor="gray.300"
              borderStyle="solid"
              borderWidth={1}
              onPress={() => {
                dispatch(actions.selectDeck({ deckId: deck.id }));
              }}
            >
              <Text>
                {deck.id}: {deck.title}
              </Text>
            </Pressable>
          );
        })}
      </VStack>
    </View>
  );
};
