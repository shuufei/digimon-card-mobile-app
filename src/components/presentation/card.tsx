import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, Image } from 'native-base';
import { FC } from 'react';
import { CardInfo } from '../../domains/card';
import { RootParamList } from '../../navigation';
import { getCardImageSrc } from '../../utils/get-card-image-src';

export type CardProps = {
  card: CardInfo;
  height: number;
  width: number;
  padding: number;
};

export const Card: FC<CardProps> = ({ card, height, width, padding }) => {
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
};
