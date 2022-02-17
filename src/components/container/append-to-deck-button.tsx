import { Button, View } from 'native-base';
import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardInfo } from '../../domains/card';
import * as deckStore from '../../store/deck-store';
import { useValueRef } from '../hooks/use-value-ref';

export const AppendToDeckButton: FC<{
  card: CardInfo;
}> = React.memo(({ card }) => {
  const dispatch = useDispatch();
  const selectedDeckId = useSelector(
    deckStore.selectors.selectedDeckIdSelector
  );
  const selectedDeckIdRef = useValueRef(selectedDeckId);
  const currentTab = useSelector(deckStore.selectors.currentTabSelector);
  const isAppendable = useMemo(() => {
    return currentTab === 'cardList' && !!selectedDeckIdRef.current;
  }, [selectedDeckIdRef, currentTab]);
  const onPressHandler = useCallback(() => {
    dispatch(deckStore.actions.addCardToDeck({ card }));
  }, [dispatch, card]);

  return !!isAppendable ? (
    <View marginTop={0.5} paddingBottom={2} px={2}>
      <Button colorScheme="gray" variant="outline" onPress={onPressHandler}>
        追加
      </Button>
    </View>
  ) : (
    <></>
  );
});
