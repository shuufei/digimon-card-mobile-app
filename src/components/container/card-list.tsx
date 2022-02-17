import { omit, orderBy } from 'lodash';
import { View } from 'native-base';
import React, { FC, useMemo, useRef } from 'react';
import { Dimensions, FlatList, ListRenderItemInfo } from 'react-native';
import { cardImageAspectRate, CardInfo } from '../../domains/card';
import { Card } from '../presentation/card';

const RenderItem: FC<{
  item: FlatListItemData;
  AppendToDeckButton: FC<{ card: CardInfo }>;
}> = ({ item, AppendToDeckButton }) => {
  const card: CardInfo = omit(item, ['width', 'height', 'padding']);
  return (
    <View>
      <Card
        card={card}
        width={item.width}
        height={item.height}
        padding={item.padding}
      />
      <AppendToDeckButton card={card} />
      {
        /**
         * NOTE:
         * Bare workflowじゃないと利用できない
         * https://github.com/DylanVann/react-native-fast-image/issues/692
         * https://github.com/DylanVann/react-native-fast-image/issues/704
         * https://docs.expo.dev/introduction/managed-vs-bare/?redirected
         */
        // <FastImage
        //   style={{ width: item.width, height: item.height, margin: item.padding }}
        //   source={{
        //     uri: `${ENDPOINT}/BT01/${item.no}.png?${signedQueryStrings}`,
        //     priority: FastImage.priority.normal,
        //   }}
        //   resizeMode={FastImage.resizeMode.contain}
        // />
      }
    </View>
  );
};

type FlatListItemData = CardInfo & {
  width: number;
  height: number;
  padding: number;
};

export const CardList: FC<{
  cardList: CardInfo[];
  AppendToDeckButton: FC<{ card: CardInfo }>;
}> = React.memo(({ cardList, AppendToDeckButton }) => {
  const scrollViewRef = useRef<FlatList>(null);

  /**
   * NOTE:
   * フィルタ変更しない時もスクロールされてしまうため、一時的に無効化する
   */
  // useEffect(() => {
  //   scrollViewRef.current?.scrollToOffset({ offset: 0 });
  // }, [cardList]);

  const columns = 4;
  const gap = 1.5;
  const windowWidth = Dimensions.get('window').width;
  const { cardWidth, cardHeight } = useMemo(() => {
    const nativeBaseSizeKey = 4; // NOTE: native baseのスペースの基準値
    const totalSpace = gap * nativeBaseSizeKey * (columns * 2);
    const cardWidth = (windowWidth - totalSpace) / 4;
    const cardHeight = cardWidth * cardImageAspectRate;
    return {
      cardWidth,
      cardHeight,
    };
  }, [windowWidth]);

  return (
    <View>
      {/**
       * NOTE:
       * native-baseのFlatListがrefプロパティを受け付けないため、react-nativeのFlatListを利用する
       */}
      <FlatList
        ref={scrollViewRef}
        keyExtractor={(item) => `${item.no}-${item.parallel || 'regular'}`}
        initialNumToRender={25}
        removeClippedSubviews={true}
        data={orderBy(cardList, ['cardtype', 'lv', 'color']).map((d) => ({
          ...d,
          width: cardWidth,
          height: cardHeight,
          padding: gap,
        }))}
        renderItem={(props: ListRenderItemInfo<FlatListItemData>) => {
          return (
            <RenderItem
              item={props.item}
              AppendToDeckButton={AppendToDeckButton}
            />
          );
        }}
        /**
         * FIXME: スクロール時の描画が安定したいないためgetItemLayoutを無効にする
         */
        // getItemLayout={(_, index) => ({
        //   length: cardHeight,
        //   offset: cardHeight * (index / columns),
        //   index,
        // })}
        numColumns={columns}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 200 }}
      />
    </View>
  );
});
