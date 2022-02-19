import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable, View } from 'native-base';
import React, { FC } from 'react';
import { CardInfo } from '../../domains/card';
import { RootParamList } from '../../navigation';
import { getCardImageSrc } from '../../utils/get-card-image-src';

export type CardProps = {
  card: CardInfo;
  height: number;
  width: number;
  padding?: number;
  isPressable?: boolean;
};

const CardImage: FC<CardProps> = ({ card, height, width, padding }) => {
  return (
    <Image
      source={{
        uri: getCardImageSrc(card),
        cache: 'force-cache',
      }}
      resizeMode="contain"
      height={height}
      width={width}
      alt={`${card.name}`}
      m={padding}
    />
  );
};
export const Card: FC<CardProps> = React.memo(
  ({ card, height, width, padding, isPressable = true }) => {
    const { navigate } = useNavigation<NavigationProp<RootParamList>>();
    return isPressable ? (
      <Pressable
        onPress={() => {
          navigate('CardModal', {
            name: card.name,
            cardImageSrc: getCardImageSrc(card),
          });
        }}
      >
        <CardImage
          card={card}
          height={height}
          width={width}
          padding={padding}
        />
      </Pressable>
    ) : (
      <View>
        <CardImage
          card={card}
          height={height}
          width={width}
          padding={padding}
        />
      </View>
    );
  }
);
