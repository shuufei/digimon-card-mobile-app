import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, ScrollView, VStack } from 'native-base';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CardTypeFilter } from '../components/container/card-type-filter';
import { CategoryFilter } from '../components/container/category-filter';
import { ColorFilter } from '../components/container/color-filter';
import { DigimonLevelFilter } from '../components/container/digimon-level-filter';
import { ParallelFilter } from '../components/container/parallel-filter';
import { RootParamList } from '../navigation';
import { actions } from '../store/card-list-filter-store';

export const CardListFilterModalScreen: FC = () => {
  const dispatch = useDispatch();

  const { setOptions, goBack } = useNavigation<NavigationProp<RootParamList>>();
  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Button
            variant="ghost"
            colorScheme="blue"
            _pressed={{ background: '#f0f0f0' }}
            onPress={() => {
              goBack();
              dispatch(actions.executeFilter());
            }}
          >
            完了
          </Button>
        );
      },
    });
  }, []);

  return (
    <ScrollView>
      <VStack space={4} px={4} pt={4} pb={20}>
        <ColorFilter />
        <CardTypeFilter />
        <DigimonLevelFilter />
        <CategoryFilter />
        <ParallelFilter />
      </VStack>
    </ScrollView>
  );
};
