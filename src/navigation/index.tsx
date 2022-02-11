import { Ionicons } from '@expo/vector-icons';
import SegmentControl from '@react-native-segmented-control/segmented-control';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'native-base';
import { FC, useState } from 'react';
import { DeckFilterModalScreen } from '../screen/deck-filter-modal-screen';
import { DeckScreen } from '../screen/deck-screen';
import { VSScreen } from '../screen/vs-screen';

type RootParamList = {
  Main: undefined;
  DeckFilterModal: undefined;
};

const Drawer = createDrawerNavigator();

const DeckScreenTab = {
  deck: 0,
  cardList: 1,
} as const;

export const DrawerNavigator: FC = () => {
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();
  const [currentTab, setTab] = useState<number>(DeckScreenTab.deck);
  return (
    <Drawer.Navigator initialRouteName="Deck">
      <Drawer.Screen
        name="Deck"
        component={DeckScreen}
        options={{
          title: 'デッキ構築',
          headerLeft: () => {
            return currentTab == DeckScreenTab.cardList ? (
              <View paddingLeft={2}>
                <Button
                  size="xs"
                  variant="ghost"
                  _pressed={{
                    background: '#ffffff00',
                  }}
                  onPress={() => {
                    navigate('DeckFilterModal');
                  }}
                >
                  <Ionicons name="ios-filter" size={24} />
                </Button>
              </View>
            ) : undefined;
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
        }}
      />
      <Drawer.Screen
        name="VS"
        component={VSScreen}
        options={{ title: '対戦' }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator<RootParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeckFilterModal"
        component={DeckFilterModalScreen}
        options={{ presentation: 'modal', title: 'フィルタ' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
