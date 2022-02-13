import { last } from 'lodash';
import { Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import {
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
  lvList,
} from '../../domains/card';
import { FilterCheckItem } from '../presentation/filter-check-item';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../../store/card-list-filter-store';

export const DigimonLevelFilter = () => {
  const dispatch = useDispatch();
  const filteredLv = useSelector(selectors.lvListSelector);

  const setFilteredLv = useCallback((_lvList: Lv[]) => {
    dispatch(actions.updateLv({ lvList: _lvList }));
  }, []);

  const toggleFilteredColor = useCallback(
    (lv: Lv) => {
      const includes = filteredLv.includes(lv);
      const updated = includes
        ? filteredLv.filter((v) => v !== lv)
        : [...filteredLv, lv];
      setFilteredLv(updated);
    },
    [filteredLv, setFilteredLv]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        レベル
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {lvList.map((lv) => {
          return (
            <FilterCheckItem
              key={lv}
              checked={filteredLv.includes(lv)}
              showDivider={lv !== last(lvList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(lv)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <Text fontSize={14} color="black" fontWeight="semibold">
                  {convertToDisplayDigimonLvFromDigimonLv(lv)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
};
