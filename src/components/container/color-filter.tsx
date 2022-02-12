import { Ionicons } from '@expo/vector-icons';
import { last } from 'lodash';
import { Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import {
  COLOR,
  Color,
  convertToColorCodeFromColor,
  convertToDisplayColorFromColor,
} from '../../domains/card';
import { FilterItem } from '../presentation/filter-item';

const colorList: Color[] = Object.entries(COLOR)
  .map((v) => v[0] as Color)
  .filter((v) => v !== '8_multicolor');

export const convertToBorderColorCodeFromColor = (color: Color): string => {
  switch (color) {
    case '1_red':
      return '#e7052c';
    case '2_blue':
      return '#2697e1';
    case '3_yellow':
      return '#fde105';
    case '4_green':
      return '#2a9b69';
    case '5_black':
      return '#211715';
    case '6_purple':
      return '#6356a3';
    case '7_white':
      return '#e0e0e0';
    default:
      return '#a0a0a0';
  }
};

export const ColorFilter = () => {
  const [filteredColors, setFilteredColors] = useState(colorList);

  const toggleFilteredColor = useCallback(
    (color: Color) => {
      setFilteredColors((currentColors) => {
        const includes = currentColors.includes(color);
        return includes
          ? filteredColors.filter((v) => v !== color)
          : [...filteredColors, color];
      });
    },
    [filteredColors]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        カラー
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {colorList.map((color) => {
          return (
            <FilterItem
              key={color}
              showDivider={color !== last(colorList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(color)}
            >
              <View
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
                px={4}
                py={3}
              >
                <View display="flex" alignItems="center" flexDirection="row">
                  <View
                    width={14}
                    height={14}
                    backgroundColor={convertToColorCodeFromColor(color)}
                    borderColor={convertToBorderColorCodeFromColor(color)}
                    borderStyle="solid"
                    borderWidth={1}
                    borderRadius={14}
                  ></View>
                  <Text
                    marginLeft={2}
                    fontSize={14}
                    color="black"
                    fontWeight="semibold"
                  >
                    {convertToDisplayColorFromColor(color)}
                  </Text>
                </View>
                <Ionicons
                  name="checkmark-sharp"
                  size={24}
                  color="#2F80ED"
                  style={{
                    opacity: filteredColors.includes(color) ? 1 : 0,
                  }}
                />
              </View>
            </FilterItem>
          );
        })}
      </View>
    </View>
  );
};
