import { Ionicons } from '@expo/vector-icons';
import SegmentControl from '@react-native-segmented-control/segmented-control';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, View } from 'native-base';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardList } from '../components/container/card-list';
import { DeckList } from '../components/container/deck-list';
import { useValueRef } from '../components/hooks/use-value-ref';
import { ALL_CARD_LIST } from '../configs/all-card-list';
import { Category } from '../domains/card';
import { RootParamList } from '../navigation';
import { selectors } from '../store/card-list-filter-store';

const useExecuteCardListFilter = () => {
  const executeFilterTimestamp = useSelector(selectors.executeFilterTimestamp);
  const filteredColorsRef = useValueRef(useSelector(selectors.colorsSelector));
  const filteredCardTypesRef = useValueRef(
    useSelector(selectors.cardTypesSelector)
  );
  const filteredLvListRef = useValueRef(useSelector(selectors.lvListSelector));
  const filteredCategoriesRef = useValueRef(
    useSelector(selectors.categoriesSelector)
  );
  const filteredIncludesParallelRef = useValueRef(
    useSelector(selectors.includesParallelSelector)
  );

  const filteredCardList = useMemo(() => {
    return ALL_CARD_LIST.filter((card) => {
      const isColorMatch = !!card.colors.find((color) => {
        return filteredColorsRef.current.includes(color);
      });
      if (!isColorMatch) {
        return false;
      }
      const isCardTypeMatch = filteredCardTypesRef.current.includes(
        card.cardtype
      );
      if (!isCardTypeMatch) {
        return false;
      }
      const isLvMatch = card.lv && filteredLvListRef.current.includes(card.lv);
      if (!isLvMatch) {
        return false;
      }
      const isCategoryMatch = filteredCategoriesRef.current.includes(
        card.category as Category
      );
      if (!isCategoryMatch) {
        return false;
      }
      const isIncludesParallelMatch =
        card.parallel !== undefined
          ? filteredIncludesParallelRef.current
          : true;
      return (
        isColorMatch &&
        isCardTypeMatch &&
        isLvMatch &&
        isCategoryMatch &&
        isIncludesParallelMatch
      );
    });
  }, [
    executeFilterTimestamp,
    filteredColorsRef,
    filteredCardTypesRef,
    filteredLvListRef,
    filteredCategoriesRef,
    filteredIncludesParallelRef,
  ]);

  return filteredCardList;
};

const DeckScreenTab = {
  deck: 0,
  cardList: 1,
} as const;

const HeaderLeft: FC<{ show: boolean; onPress: () => void }> = ({
  show,
  onPress,
}) => {
  return show ? (
    <View paddingLeft={2}>
      <Button
        size="xs"
        variant="ghost"
        _pressed={{
          background: '#f0f0f0',
        }}
        onPress={onPress}
      >
        <Ionicons name="ios-filter" size={24} />
      </Button>
    </View>
  ) : (
    <></>
  );
};

export const DeckScreen = () => {
  const { navigate, setOptions } =
    useNavigation<NavigationProp<RootParamList>>();
  const [currentTab, setTab] = useState<number>(DeckScreenTab.deck);

  const filteredCardList = useExecuteCardListFilter();

  useEffect(() => {
    setOptions({
      title: 'デッキ構築',
      headerLeft: () => {
        return (
          <HeaderLeft
            show={currentTab == DeckScreenTab.cardList}
            onPress={() => {
              navigate('DeckFilterModal');
            }}
          />
        );
      },
      headerTitle: () => {
        const tabTitles = ['デッキ', 'カードリスト'];
        return (
          <SegmentControl
            values={tabTitles}
            selectedIndex={DeckScreenTab.deck}
            style={{
              width: 200,
            }}
            onValueChange={(value) => {
              setTab(tabTitles.findIndex((title) => title === value) ?? 0);
            }}
          />
        );
      },
    });
  }, [setOptions, currentTab]);
  return (
    <View>
      <View display={currentTab === DeckScreenTab.deck ? 'flex' : 'none'}>
        <DeckList />
      </View>
      <View display={currentTab === DeckScreenTab.cardList ? 'flex' : 'none'}>
        <CardList cardList={filteredCardList} />
      </View>
    </View>
  );
};
