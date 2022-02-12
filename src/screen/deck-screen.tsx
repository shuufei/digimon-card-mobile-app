import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, View } from 'native-base';
import { useEffect, useState } from 'react';
import { CardList } from '../components/container/card-list';
import { DeckList } from '../components/container/deck-list';
import { RootParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import SegmentControl from '@react-native-segmented-control/segmented-control';
import { FC } from 'react';

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
          background: '#ffffff00',
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
        <CardList />
      </View>
    </View>
  );
};
