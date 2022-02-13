import { omit, orderBy } from 'lodash';
import { FlatList, View } from 'native-base';
import React, { FC, useMemo } from 'react';
import { Dimensions, ListRenderItemInfo } from 'react-native';
import { CardInfo } from '../../domains/card';
import { Card } from '../presentation/card';

type FlatListItemData = CardInfo & {
  width: number;
  height: number;
  padding: number;
};

export const CardList: FC<{ cardList: CardInfo[] }> = React.memo(
  ({ cardList }) => {
    const columns = 4;
    const gap = 1.5;
    const windowWidth = Dimensions.get('window').width;
    const { cardWidth, cardHeight } = useMemo(() => {
      const nativeBaseSizeKey = 4; // NOTE: native baseのスペースの基準値
      const totalSpace = gap * nativeBaseSizeKey * (columns * 2);
      const cardWidth = (windowWidth - totalSpace) / 4;
      const cardHeight = cardWidth * 1.395;
      return {
        cardWidth,
        cardHeight,
      };
    }, [windowWidth]);

    return (
      <View>
        <FlatList
          keyExtractor={(item) => `${item.no}-${item.parallel || 'regular'}`}
          data={orderBy(cardList, ['cardtype', 'lv', 'color']).map((d) => ({
            ...d,
            width: cardWidth,
            height: cardHeight,
            padding: gap,
          }))}
          renderItem={({ item }: ListRenderItemInfo<FlatListItemData>) => {
            return (
              <Card
                card={omit(item, ['width', 'height', 'padding'])}
                width={item.width}
                height={item.height}
                padding={item.padding}
              />
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
            );
          }}
          removeClippedSubviews={true}
          /**
           * FIXME: スクロール時の描画が安定したいないためgetItemLayoutを無効にする
           */
          // getItemLayout={(_, index) => ({
          //   length: cardHeight,
          //   offset: cardHeight * (index / columns),
          //   index,
          // })}
          numColumns={columns}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}
        />
      </View>
    );
  }
);
