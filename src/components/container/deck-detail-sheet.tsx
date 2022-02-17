import BottomSheet from '@gorhom/bottom-sheet';
import { Button, Heading, HStack, ScrollView, Text, View } from 'native-base';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardInfo,
  CardType,
  convertToDisplayCardTypeFromCardType,
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
} from '../../domains/card';
import * as deckStore from '../../store/deck-store';
import { DeckCardList } from './deck-card-list';

type CardsGroupedByNo = {
  [no: string]: {
    card: CardInfo;
    count: number;
  };
};

type CardsGropedByLvAndCardType = {
  'Lv.2': CardInfo[];
  'Lv.3': CardInfo[];
  'Lv.4': CardInfo[];
  'Lv.5': CardInfo[];
  'Lv.6': CardInfo[];
  'Lv.7': CardInfo[];
  '-': CardInfo[];
  '3_テイマー': CardInfo[];
  '4_オプション': CardInfo[];
};

type CardsGroupedByLvAndCardTypeAndNo = {
  [key in keyof CardsGropedByLvAndCardType]: CardsGroupedByNo;
};

const groupByNo = (cards: CardInfo[]): CardsGroupedByNo => {
  return cards.reduce((acc, current) => {
    const includes = acc[current.no];
    const card: CardsGroupedByNo['card'] = includes
      ? {
          ...acc[current.no],
          count: acc[current.no].count + 1,
        }
      : {
          card: current,
          count: 1,
        };
    return {
      ...acc,
      [current.no]: card,
    };
  }, {} as CardsGroupedByNo);
};

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

  const cardsGroupedByLvAndCardType: CardsGropedByLvAndCardType = useMemo(
    () => ({
      'Lv.2':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '1_デジタマ' && card.lv === 'Lv.2'
        ) ?? [],
      'Lv.3':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === 'Lv.3'
        ) ?? [],
      'Lv.4':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === 'Lv.4'
        ) ?? [],
      'Lv.5':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === 'Lv.5'
        ) ?? [],
      'Lv.6':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === 'Lv.6'
        ) ?? [],
      'Lv.7':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === 'Lv.7'
        ) ?? [],
      '-':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '2_デジモン' && card.lv === '-'
        ) ?? [],
      '3_テイマー':
        selectedDeck?.cards.filter((card) => card.cardtype === '3_テイマー') ??
        [],
      '4_オプション':
        selectedDeck?.cards.filter(
          (card) => card.cardtype === '4_オプション'
        ) ?? [],
    }),
    [selectedDeck]
  );

  const cardsGroupedByNo: CardsGroupedByLvAndCardTypeAndNo = useMemo(() => {
    return {
      'Lv.2': groupByNo(cardsGroupedByLvAndCardType['Lv.2']),
      'Lv.3': groupByNo(cardsGroupedByLvAndCardType['Lv.3']),
      'Lv.4': groupByNo(cardsGroupedByLvAndCardType['Lv.4']),
      'Lv.5': groupByNo(cardsGroupedByLvAndCardType['Lv.5']),
      'Lv.6': groupByNo(cardsGroupedByLvAndCardType['Lv.6']),
      'Lv.7': groupByNo(cardsGroupedByLvAndCardType['Lv.7']),
      '-': groupByNo(cardsGroupedByLvAndCardType['-']),
      '3_テイマー': groupByNo(cardsGroupedByLvAndCardType['3_テイマー']),
      '4_オプション': groupByNo(cardsGroupedByLvAndCardType['4_オプション']),
    };
  }, [cardsGroupedByLvAndCardType]);

  const totalCount = Object.values(cardsGroupedByNo).reduce((acc, curr) => {
    const count = Object.values(curr).reduce((_acc, _curr) => {
      return _acc + _curr.count;
    }, 0);
    return acc + count;
  }, 0);

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
            {Object.entries(cardsGroupedByNo).map(([key, value]) => {
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
