import { FC } from 'react';
import { View, Pressable, Divider } from 'native-base';
import * as Haptics from 'expo-haptics';

export const FilterItem: FC<{
  showDivider?: boolean;
  isPressable?: boolean;
  onPress?: () => void;
}> = ({ showDivider = true, isPressable = true, onPress, children }) => {
  return isPressable ? (
    <Pressable
      _pressed={{ backgroundColor: 'gray.100' }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress && onPress();
      }}
      overflow="hidden"
    >
      {children}
      {showDivider && <Divider marginLeft={4} />}
    </Pressable>
  ) : (
    <View>
      {children}
      {showDivider && <Divider marginLeft={4} />}
    </View>
  );
};
