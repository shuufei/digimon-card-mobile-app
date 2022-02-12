import { last } from 'lodash';
import { Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import {
  CATEGORY,
  Category,
  convertToDisplayCategoryFromCategory,
} from '../../domains/card';
import { FilterCheckItem } from '../presentation/filter-check-item';

const categoryList: Category[] = Object.entries(CATEGORY).map(
  (v) => v[0] as Category
);

export const CategoryFilter = () => {
  const [filteredCategory, setFilteredCategory] = useState(categoryList);

  const toggleFilteredColor = useCallback(
    (lv: Category) => {
      setFilteredCategory((currentCategory) => {
        const includes = currentCategory.includes(lv);
        return includes
          ? currentCategory.filter((v) => v !== lv)
          : [...currentCategory, lv];
      });
    },
    [setFilteredCategory]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        収録ブースター・スタートデッキ
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {categoryList.map((category) => {
          return (
            <FilterCheckItem
              key={category}
              checked={filteredCategory.includes(category)}
              showDivider={category !== last(categoryList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(category)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <Text fontSize={14} color="black" fontWeight="semibold">
                  {convertToDisplayCategoryFromCategory(category)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
};
