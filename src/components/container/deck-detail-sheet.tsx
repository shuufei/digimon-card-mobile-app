import BottomSheet from '@gorhom/bottom-sheet';
import { Button, Text, View } from 'native-base';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as deckStore from '../../store/deck-store';

export const DeckDetailSheet = () => {
  const dispatch = useDispatch();
  const selectedDeckId = useSelector(
    deckStore.selectors.selectedDeckIdSelector
  );
  const isCreateMode = useSelector(deckStore.selectors.isCreateModeSelector);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '60%', '95%'], []);

  useEffect(() => {
    selectedDeckId
      ? bottomSheetRef.current?.expand()
      : bottomSheetRef.current?.close();
  }, [selectedDeckId, bottomSheetRef]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      style={styles.bottonSheet}
    >
      <View flexDirection="row" px={2}>
        <Button
          variant="ghost"
          colorScheme="blue"
          onPress={() => {
            dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
          }}
        >
          閉じる
        </Button>
      </View>
      <Text>Deck Detail</Text>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  bottonSheet: {
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
