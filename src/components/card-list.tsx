import { View, Text, FlatList } from 'native-base';
import { FC } from 'react';
import { ListRenderItemInfo } from 'react-native';

const ITEM_HEIGHT = 10;

const CardItem = ({ item }: ListRenderItemInfo<{ key: string }>) => {
  return (
    <Text color="black" height={ITEM_HEIGHT} flex={1}>
      {item.key}
    </Text>
  );
};

const DUMMY_DATA = [
  { key: 'Devin' },
  { key: 'Dan' },
  { key: 'Dominic' },
  { key: 'Jackson' },
  { key: 'James' },
  { key: 'Joel' },
  { key: 'John' },
  { key: 'Jillian' },
  { key: 'Jimmy' },
  { key: 'Julie' },
]
  .map((v) => new Array(100).fill(v).map((v, i) => ({ key: `${v.key}:${i}` })))
  .flat();
export const CardList: FC = () => {
  const columns = 3;
  return (
    <View>
      <FlatList
        data={DUMMY_DATA}
        renderItem={CardItem}
        removeClippedSubviews={true}
        /**
         * FIXME: スクロール時の描画が安定したいないためgetItemLayoutを無効にする
         */
        // getItemLayout={(_, index) => ({
        //   length: ITEM_HEIGHT,
        //   offset: ITEM_HEIGHT * (index / columns),
        //   index,
        // })}
        numColumns={columns}
      />
    </View>
  );
};
