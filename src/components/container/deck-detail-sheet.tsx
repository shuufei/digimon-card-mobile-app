import BottomSheet from '@gorhom/bottom-sheet';
import { Button, Heading, ScrollView, View } from 'native-base';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cardImageAspectRate } from '../../domains/card';
import * as deckStore from '../../store/deck-store';
import { Card } from '../presentation/card';

export const DeckDetailSheet = () => {
  const dispatch = useDispatch();
  const selectedDeckId = useSelector(
    deckStore.selectors.selectedDeckIdSelector
  );
  const selectedDeck = useSelector(deckStore.selectors.selectedDeckSelector);

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
      <ScrollView>
        <View px={4} paddingBottom={20}>
          <Heading fontSize={14} fontWeight="semibold">
            {selectedDeck?.title}
          </Heading>
          <View flexDirection="row" flexWrap="wrap">
            {selectedDeck?.cards?.map((card, i) => {
              return (
                <View key={i}>
                  <Card
                    card={card}
                    width={90}
                    height={90 * cardImageAspectRate}
                    padding={0}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
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
