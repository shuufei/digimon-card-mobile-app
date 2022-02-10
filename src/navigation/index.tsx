import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { DeckScreen } from '../screen/deck-screen';
import { VSScreen } from '../screen/vs-screen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => (
  <Drawer.Navigator initialRouteName="Deck">
    <Drawer.Screen name="Deck" component={DeckScreen} />
    <Drawer.Screen name="VS" component={VSScreen} />
  </Drawer.Navigator>
);

export const Navigation = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);
