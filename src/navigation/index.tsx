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
import { FC } from 'react';
import { DeckFilterModalScreen } from '../screen/deck-filter-modal-screen';
import { DeckScreen } from '../screen/deck-screen';
import { VSScreen } from '../screen/vs-screen';

type RootParamList = {
  Main: undefined;
  DeckFilterModal: undefined;
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();
  return (
    <Drawer.Navigator initialRouteName="Deck">
      <Drawer.Screen
        name="Deck"
        component={DeckScreen}
        options={{
          title: 'デッキ構築',
          headerLeft: () => {
            return (
              <View paddingLeft={2}>
                <Button
                  size="xs"
                  variant="ghost"
                  _pressed={{
                    background: '#fff',
                  }}
                  onPress={() => {
                    navigate('DeckFilterModal');
                  }}
                >
                  <Ionicons name="ios-filter" size={24} />
                </Button>
              </View>
            );
          },
          headerTitle: () => {
            return (
              <SegmentControl
                values={['デッキ', 'カード一覧']}
                selectedIndex={0}
                style={{
                  width: 200,
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
