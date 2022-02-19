import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Button,
  Heading,
  HStack,
  Menu,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { primaryColorCode } from '../../configs/styles';
import {
  CardType,
  convertToDisplayCardTypeFromCardType,
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
} from '../../domains/card';
import * as deckStore from '../../store/deck-store';
import { EditDeckTitleForm } from '../presentation/edit-deck-title-form';
import { MenuItem } from '../presentation/menu-item';
import { DeckCardList } from './deck-card-list';
import { SelectKeyCardForDeck } from '../presentation/select-key-card-for-deck';

type ViewMode = 'list' | 'edit-title' | 'select-keycard' | 'share' | 'delete';

export const DeckDetailSheet = React.memo(() => {
  const dispatch = useDispatch();
  const selectedDeckId = useSelector(
    deckStore.selectors.selectedDeckIdSelector
  );
  const selectedDeck = useSelector(deckStore.selectors.selectedDeckSelector);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
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
      {viewMode === 'list' && (
        <>
          <View flexDirection="row" px={2} justifyContent="space-between">
            <Button
              variant="ghost"
              colorScheme="blue"
              onPress={() => {
                setViewMode('list');
                dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
              }}
            >
              閉じる
            </Button>
            <Menu
              trigger={(triggerProps) => {
                return (
                  <Button
                    size="xs"
                    variant="ghost"
                    _pressed={{
                      background: '#f0f0f0',
                    }}
                    onPress={() => {}}
                    colorScheme="blue"
                    {...triggerProps}
                  >
                    <Ionicons
                      name="ellipsis-horizontal-circle-outline"
                      size={24}
                      color={primaryColorCode}
                    />
                  </Button>
                );
              }}
              width="160"
              backgroundColor="white"
              px={2}
              mr={4}
            >
              <MenuItem
                label="タイトル変更"
                onPress={() => {
                  setViewMode('edit-title');
                }}
              />
              <MenuItem label="複製" />
              <MenuItem label="共有" />
              <MenuItem label="対戦" />
              <MenuItem
                label="キーカードを選択"
                onPress={() => {
                  setViewMode('select-keycard');
                }}
              />
              <MenuItem
                label="削除"
                color="red.500"
                onPress={() => {
                  if (selectedDeck == null) {
                    return;
                  }
                  dispatch(
                    deckStore.actions.deleteDeck({ deckId: selectedDeck.id })
                  );
                  dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
                }}
              />
            </Menu>
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
                {Object.entries(selectedDeck?.cards ?? {}).map(
                  ([key, value]) => {
                    const displayCardType =
                      convertToDisplayCardTypeFromCardType(key as CardType);
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
                  }
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {viewMode === 'edit-title' && (
        <EditDeckTitleForm
          defaultValue={selectedDeck?.title ?? ''}
          onCancel={() => {
            setViewMode('list');
          }}
          onUpdate={(title) => {
            setViewMode('list');
            if (selectedDeck != null) {
              dispatch(
                deckStore.actions.updateDeckTitle({
                  id: selectedDeck.id,
                  title,
                })
              );
            }
          }}
        />
      )}
      {viewMode === 'select-keycard' && selectedDeck != null && (
        <SelectKeyCardForDeck
          deck={selectedDeck}
          onCancel={() => {
            setViewMode('list');
          }}
          onSelect={(card) => {
            dispatch(
              deckStore.actions.updateDeckKeyCard({
                id: selectedDeck.id,
                keyCard: card,
              })
            );
            setViewMode('list');
          }}
        />
      )}
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
