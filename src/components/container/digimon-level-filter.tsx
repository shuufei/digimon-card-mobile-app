import { last } from 'lodash';
import { Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import {
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
  LV,
} from '../../domains/card';
import { FilterCheckItem } from '../presentation/filter-check-item';

const lvList: Lv[] = Object.entries(LV).map((v) => v[0] as Lv);

export const DigimonLevelFilter = () => {
  const [filteredLv, setFilteredLv] = useState(lvList);

  const toggleFilteredColor = useCallback(
    (lv: Lv) => {
      setFilteredLv((currentLv) => {
        const includes = currentLv.includes(lv);
        return includes
          ? currentLv.filter((v) => v !== lv)
          : [...currentLv, lv];
      });
    },
    [setFilteredLv]
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
