import { Button, Pressable, Text, View, VStack } from 'native-base';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/deck-store';

export const DeckList: FC = React.memo(() => {
  const dispatch = useDispatch();
  const decks = useSelector(selectors.decksSelector);
  const sortedDecks = [...decks].sort((v1, v2) => {
    if (v1.createdAt > v2.createdAt) {
      return 1;
    }
    if (v1.createdAt < v2.createdAt) {
      return -1;
    }
    return 0;
  });

  return (
    <View>
      <Text>deck list: {sortedDecks.length}</Text>
      <View p={3}>
        <Button
          onPress={() => {
            dispatch(actions.reset());
          }}
        >
          reset
        </Button>
      </View>
      <VStack p={4} space={3}>
        {sortedDecks.map((deck) => {
          return (
            <Pressable
              key={deck.id}
              px={4}
              py={3}
              borderColor="gray.300"
              borderStyle="solid"
              borderWidth={1}
              _pressed={{
                background: 'gray.300',
              }}
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
});
