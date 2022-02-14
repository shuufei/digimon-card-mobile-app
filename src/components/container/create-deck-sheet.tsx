import BottomSheet from '@gorhom/bottom-sheet';
import { Text } from 'native-base';
import { FC, useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as deckStore from '../../store/deck-store';

export const CreateDeckSheet: FC = () => {
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);

  const isCreateMode = useSelector(deckStore.selectors.isCreateModeSelector);

  useEffect(() => {
    isCreateMode
      ? bottomSheetRef.current?.expand()
      : bottomSheetRef.current?.close();
  }, [isCreateMode, bottomSheetRef]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        dispatch(deckStore.actions.setCreateMode({ isCreateMode: false }));
      }}
      style={styles.bottonSheet}
    >
      <Text>create deck</Text>
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
