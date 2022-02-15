import BottomSheet from '@gorhom/bottom-sheet';
import { Button, Heading, Input, View } from 'native-base';
import { FC, useEffect, useMemo, useRef } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as deckStore from '../../store/deck-store';

export const CreateDeckSheet: FC = () => {
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  const isCreateMode = useSelector(deckStore.selectors.isCreateModeSelector);

  useEffect(() => {
    isCreateMode
      ? bottomSheetRef.current?.snapToIndex(0)
      : bottomSheetRef.current?.close();
  }, [isCreateMode, bottomSheetRef]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      bottomSheetRef.current?.snapToIndex(1);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      isCreateMode && bottomSheetRef.current?.snapToIndex(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isCreateMode]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      onClose={() => {
        dispatch(deckStore.actions.setCreateMode({ isCreateMode: false }));
      }}
      keyboardBehavior="extend"
      style={styles.bottonSheet}
    >
      <View px={4}>
        <Heading fontSize={14}>新しいデッキを作成</Heading>
        <Input
          w="100%"
          placeholder="デッキ名を入力"
          fontSize={16}
          fontWeight="semibold"
          _focus={{ borderColor: 'gray.500' }}
          mt={2}
        />
        <View flexDirection="row" justifyContent="flex-end" mt={3}>
          <Button
            variant="ghost"
            colorScheme="blue"
            onPress={() => {
              Keyboard.dismiss();
              dispatch(
                deckStore.actions.setCreateMode({ isCreateMode: false })
              );
            }}
          >
            キャンセル
          </Button>
          <Button colorScheme="blue" px={6} ml={2}>
            作成
          </Button>
        </View>
      </View>
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
