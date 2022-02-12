import { FC } from 'react';
import { View } from 'native-base';
import { FilterItem } from './filter-item';
import { Ionicons } from '@expo/vector-icons';
import { primaryColorCode } from '../../configs/styles';

export const FilterCheckItem: FC<{
  checked?: boolean;
  showDivider?: boolean;
  isPressable?: boolean;
  onPress?: () => void;
}> = ({
  checked = false,
  showDivider = true,
  isPressable = true,
  onPress,
  children,
}) => {
  return (
    <FilterItem
      showDivider={showDivider}
      isPressable={isPressable}
      onPress={onPress}
    >
      <View
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        px={4}
        py={3}
      >
        {children}
        <Ionicons
          name="checkmark-sharp"
          size={24}
          color={primaryColorCode}
          style={{
            opacity: checked ? 1 : 0,
          }}
        />
      </View>
    </FilterItem>
  );
};
