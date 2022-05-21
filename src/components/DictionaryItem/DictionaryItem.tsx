import React from 'react';
import { Box, VStack, Text, HStack } from 'native-base';
import { Dictionary } from '../../store/types';

const PersonalDictionariesScreen: React.FC<Dictionary> = ({
  name,
  user_id,
  description,
  from,
  to,
}) => {
  return (
    <Box p={2} borderRadius="md" background={'trueGray.200'}>
      <VStack>
        <HStack alignItems={'baseline'} space={2}>
          <Text fontSize={'2xl'}>{name}</Text>
          <Text pb={1} fontSize={'xs'} color={'coolGray.400'}>
            {user_id}
          </Text>
        </HStack>
        <Text fontSize={'sm'}>{description}</Text>
      </VStack>
    </Box>
  );
};

export default PersonalDictionariesScreen;
