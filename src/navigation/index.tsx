import SegmentControl from '@react-native-segmented-control/segmented-control';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { DeckScreen } from '../screen/deck-screen';
import { VSScreen } from '../screen/vs-screen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => (
  <Drawer.Navigator initialRouteName="Deck">
    <Drawer.Screen
      name="Deck"
      component={DeckScreen}
      options={{
        title: 'デッキ構築',
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
    <Drawer.Screen name="VS" component={VSScreen} options={{ title: '対戦' }} />
  </Drawer.Navigator>
);

export const Navigation = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);
