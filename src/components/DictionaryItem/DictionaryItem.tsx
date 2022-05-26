import React from 'react';
import { Box, VStack, Text, HStack, IBoxProps } from 'native-base';
import { Dictionary } from '../../store/types';

type Props = Dictionary & IBoxProps;

const PersonalDictionariesScreen: React.FC<Props> = (props) => {
  const { name, user_id, description, from, to } = props;

  return (
    <Box {...props} p={2} borderRadius="md" background={'trueGray.200'}>
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
