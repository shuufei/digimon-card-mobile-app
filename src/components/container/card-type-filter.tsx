import { last } from 'lodash';
import { Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import {
  CardType,
  CARD_TYPE,
  convertToDisplayCardTypeFromCardType,
} from '../../domains/card';
import { FilterCheckItem } from '../presentation/filter-check-item';

const cardTypeList: CardType[] = Object.entries(CARD_TYPE).map(
  (v) => v[0] as CardType
);

export const CardTypeFilter = () => {
  const [filteredCardTypes, setFilteredCardTypes] = useState(cardTypeList);

  const toggleFilteredColor = useCallback(
    (cardType: CardType) => {
      setFilteredCardTypes((currentCardTypes) => {
        const includes = currentCardTypes.includes(cardType);
        return includes
          ? currentCardTypes.filter((v) => v !== cardType)
          : [...currentCardTypes, cardType];
      });
    },
    [setFilteredCardTypes]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        カードタイプ
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {cardTypeList.map((cardType) => {
          return (
            <FilterCheckItem
              key={cardType}
              checked={filteredCardTypes.includes(cardType)}
              showDivider={cardType !== last(cardTypeList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(cardType)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <Text fontSize={14} color="black" fontWeight="semibold">
                  {convertToDisplayCardTypeFromCardType(cardType)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
};
