import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable } from 'native-base';
import React, { FC } from 'react';
import { CardInfo } from '../../domains/card';
import { RootParamList } from '../../navigation';
import { getCardImageSrc } from '../../utils/get-card-image-src';

export type CardProps = {
  card: CardInfo;
  height: number;
  width: number;
  padding?: number;
};

export const Card: FC<CardProps> = React.memo(
  ({ card, height, width, padding }) => {
    const { navigate } = useNavigation<NavigationProp<RootParamList>>();
    return (
      <Pressable
        onPress={() => {
          navigate('CardModal', {
            name: card.name,
            cardImageSrc: getCardImageSrc(card),
          });
        }}
      >
        <Image
          source={{
            uri: getCardImageSrc(card),
          }}
          resizeMode="contain"
          height={height}
          width={width}
          alt={`${card.name}`}
          m={padding}
        />
      </Pressable>
    );
  }
);
