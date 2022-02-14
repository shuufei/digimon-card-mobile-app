import { Button, Text, View } from 'native-base';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/deck-store';

export const DeckList: FC = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>deck list</Text>
      <View p={4}>
        <Button
          onPress={() => {
            dispatch(actions.selectDeck({ deckId: 'dummy' }));
          }}
        >
          select deck
        </Button>
      </View>
    </View>
  );
};
