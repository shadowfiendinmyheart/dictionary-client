import React from 'react';
import { Center, ScrollView, Skeleton, VStack } from 'native-base';

const SkeletonDictionariesList = () => {
  return (
    <ScrollView>
      <Center mt={3} mb={3}>
        <VStack w="90%" maxW="400" space={4} overflow="hidden" rounded="md">
          <Skeleton h="32" />
          <Skeleton h="32" />
          <Skeleton h="32" />
          <Skeleton h="32" />
          <Skeleton h="32" />
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default SkeletonDictionariesList;
