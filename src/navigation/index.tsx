import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { CardModalScreen } from '../screen/card-modal-screen';
import { CardListFilterModalScreen } from '../screen/card-list-filter-modal-screen';
import { DeckScreen } from '../screen/deck-screen';
import { VSScreen } from '../screen/vs-screen';

export type RootParamList = {
  Main: undefined;
  DeckFilterModal: undefined;
  CardModal: { cardImageSrc: string; name: string };
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Deck">
      <Drawer.Screen name="Deck" component={DeckScreen} />
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
        component={CardListFilterModalScreen}
        options={{ presentation: 'modal', title: 'フィルタ' }}
      />
      <Stack.Screen
        name="CardModal"
        component={CardModalScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
