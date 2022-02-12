import { View, Text, Switch } from 'native-base';
import { FC, useState } from 'react';
import { FilterItem } from '../presentation/filter-item';

export const ParallelFilter: FC = () => {
  const [includesParallel, setIncludesParallel] = useState<boolean>(true);
  return (
    <View backgroundColor="white" borderRadius={5} marginTop={1}>
      <FilterItem showDivider={false} isPressable={false}>
        <View
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          px={4}
          py={3}
        >
          <Text fontSize={14} color="black" fontWeight="semibold">
            パラレルカード
          </Text>
          <Switch
            onTrackColor="green.500"
            isChecked={includesParallel}
            onToggle={() => {
              setIncludesParallel((current) => !current);
            }}
          />
        </View>
      </FilterItem>
    </View>
  );
};
