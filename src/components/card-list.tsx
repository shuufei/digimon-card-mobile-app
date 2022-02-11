import { SIGNED_QS } from '@env';
import { FlatList, Image, View } from 'native-base';
import { FC, useMemo } from 'react';
import { Dimensions, ListRenderItemInfo } from 'react-native';
import BT01 from '../../assets/cardInfo/BT01.json';
import { CardInfo } from '../domains/card';

const signedQueryStrings = SIGNED_QS;

type FlatListItemData = CardInfo & {
  width: number;
  height: number;
  padding: number;
};

const CardItem = ({ item }: ListRenderItemInfo<FlatListItemData>) => {
  /**
   * TODO:
   * apply cache
   * https://reactnative.dev/docs/optimizing-flatlist-configuration#use-cached-optimized-images
   */
  return (
    <Image
      source={{ uri: `${ENDPOINT}/BT01/${item.no}.png?${signedQueryStrings}` }}
      resizeMode="contain"
      height={item.height}
      width={item.width}
      alt={`${item.name}`}
      m={item.padding}
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
};

const DIGIMON_DUMMY_DATA: CardInfo[] = BT01.cardInfoList;

const ENDPOINT = 'https://d2399fwvfjwbi3.cloudfront.net/images';

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
  return (
    <View>
      <FlatList
        keyExtractor={(item) => `${item.no}-${item.parallel || 'regular'}`}
        data={DIGIMON_DUMMY_DATA.map((d) => ({
          ...d,
          width: cardWidth,
          height: cardHeight,
          padding: gap,
        }))}
        renderItem={CardItem}
        removeClippedSubviews={true}
        /**
         * FIXME: スクロール時の描画が安定したいないためgetItemLayoutを無効にする
         */
        getItemLayout={(_, index) => ({
          length: cardHeight,
          offset: cardHeight * (index / columns),
          index,
        })}
        numColumns={columns}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}
      />
    </View>
  );
};
