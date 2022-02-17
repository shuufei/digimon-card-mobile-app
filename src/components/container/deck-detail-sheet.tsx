import BottomSheet from '@gorhom/bottom-sheet';
import { Button, Heading, HStack, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardType,
  convertToDisplayCardTypeFromCardType,
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
} from '../../domains/card';
import * as deckStore from '../../store/deck-store';
import { DeckCardList } from './deck-card-list';

export const DeckDetailSheet = React.memo(() => {
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

  const totalCount = Object.values(selectedDeck?.cards ?? {}).reduce(
    (acc, curr) => {
      const count = Object.values(curr).reduce((_acc, _curr) => {
        return _acc + _curr.count;
      }, 0);
      return acc + count;
    },
    0
  );

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
      <ScrollView marginTop={2}>
        <View px={4} paddingBottom={20}>
          <HStack justifyContent="space-between">
            <Heading fontSize={18} fontWeight="semibold">
              {selectedDeck?.title}
            </Heading>
            <Text>{totalCount} / 55</Text>
          </HStack>
          <View marginTop={3}>
            {Object.entries(selectedDeck?.cards ?? {}).map(([key, value]) => {
              const displayCardType = convertToDisplayCardTypeFromCardType(
                key as CardType
              );
              const displayLv = convertToDisplayDigimonLvFromDigimonLv(
                key as Lv
              );
              const title =
                displayCardType !== '-' ? displayCardType : displayLv;
              return (
                <DeckCardList
                  key={key}
                  title={title}
                  cardsGroupedByNo={value}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});
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
