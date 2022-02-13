import { View, Text, Switch } from 'native-base';
import { FC, useState, useCallback } from 'react';
import { FilterItem } from '../presentation/filter-item';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from '../../store/card-list-filter-store';

export const ParallelFilter: FC = () => {
  const dispatch = useDispatch();
  const includesParallel = useSelector(selectors.includesParallelSelector);

  const setIncludesParallel = useCallback((includesParallel: boolean) => {
    dispatch(actions.updateIncludesParallel({ includesParallel }));
  }, []);

  return (
    <View backgroundColor="white" borderRadius={5} marginTop={1}>
      <FilterItem showDivider={false} isPressable={false}>
        <View
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          px={4}
          py={3}
        >
          <Text fontSize={14} color="black" fontWeight="semibold">
            パラレルカード
          </Text>
          <Switch
            onTrackColor="green.500"
            isChecked={includesParallel}
            onToggle={() => {
              setIncludesParallel(!includesParallel);
            }}
          />
        </View>
      </FilterItem>
    </View>
  );
};
