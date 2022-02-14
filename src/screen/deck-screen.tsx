import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentControl from '@react-native-segmented-control/segmented-control';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Menu, View } from 'native-base';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList } from '../components/container/card-list';
import { DeckList } from '../components/container/deck-list';
import { useValueRef } from '../components/hooks/use-value-ref';
import { ALL_CARD_LIST } from '../configs/all-card-list';
import { storageKeys } from '../configs/storage';
import { Category } from '../domains/card';
import { RootParamList } from '../navigation';
import {
  actions,
  selectors,
  State as CardListFilterState,
} from '../store/card-list-filter-store';

const useInitStore = () => {
  const dispatch = useDispatch();

  /**
   * card list filter store
   */
  useEffect(() => {
    const dispatchInitCardListFilterStore = async () => {
      try {
        const value = await AsyncStorage.getItem(
          storageKeys.cardListFilterStore
        );
        const filterSettings =
          value && (JSON.parse(value) as CardListFilterState);
        filterSettings && dispatch(actions.set({ state: filterSettings }));
        dispatch(actions.executeFilter());
      } catch (error) {}
    };
    dispatchInitCardListFilterStore();
  }, [dispatch]);
};

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

const CardListFilterButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
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
  );
};

const DeckMenuButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Button
            size="xs"
            variant="ghost"
            _pressed={{
              background: '#f0f0f0',
            }}
            onPress={onPress}
            {...triggerProps}
          >
            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} />
          </Button>
        );
      }}
    >
      <Menu.Item>新規作成</Menu.Item>
    </Menu>
  );
};

export const DeckScreen = () => {
  useInitStore();

  const { navigate, setOptions } =
    useNavigation<NavigationProp<RootParamList>>();
  const [currentTab, setTab] = useState<number>(DeckScreenTab.deck);

  const filteredCardList = useExecuteCardListFilter();

  useEffect(() => {
    setOptions({
      title: 'デッキ構築',
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
      headerRight: () => {
        return (
          <View paddingRight={2}>
            {currentTab === DeckScreenTab.deck ? (
              <DeckMenuButton onPress={() => {}} />
            ) : (
              <CardListFilterButton
                onPress={() => {
                  navigate('DeckFilterModal');
                }}
              />
            )}
          </View>
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
