import { NavigationProp, useNavigation } from '@react-navigation/native';
import { orderBy } from 'lodash';
import { FlatList, Image, View } from 'native-base';
import { FC, useMemo } from 'react';
import { Dimensions, ListRenderItemInfo, Pressable } from 'react-native';
import { ALL_CARD_LIST } from '../configs/all-card-list';
import { CardInfo } from '../domains/card';
import { RootParamList } from '../navigation';
import { getCardImageSrc } from '../utils/get-card-image-src';

type FlatListItemData = CardInfo & {
  width: number;
  height: number;
  padding: number;
};

export const CardList: FC = () => {
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
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();

  return (
    <View>
      <FlatList
        keyExtractor={(item) => `${item.no}-${item.parallel || 'regular'}`}
        data={orderBy(ALL_CARD_LIST, ['cardtype', 'lv', 'color']).map((d) => ({
          ...d,
          width: cardWidth,
          height: cardHeight,
          padding: gap,
        }))}
        renderItem={({ item }: ListRenderItemInfo<FlatListItemData>) => {
          return (
            <Pressable
              onPress={() => {
                navigate('CardModal', {
                  name: item.name,
                  cardImageSrc: getCardImageSrc(item),
                });
              }}
            >
              <Image
                source={{
                  uri: getCardImageSrc(item),
                }}
                resizeMode="contain"
                height={item.height}
                width={item.width}
                alt={`${item.name}`}
                m={item.padding}
              />
            </Pressable>
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
};
