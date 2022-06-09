import React from 'react';
import { Box, VStack, Text, HStack, IBoxProps } from 'native-base';
import { Dictionary } from '../../store/types';
import { LanguageInterface } from '../../api/card/types';

type Props = Dictionary & IBoxProps;

export const LanguageFlag: LanguageInterface = {
  russian: '🇷🇺',
  english: '🇬🇧',
  chinese: '🇨🇳',
  german: '🇩🇪',
  spanish: '🇪🇸',
  french: '🇫🇷',
  japanese: '🇯🇵',
};

const DictionaryItem: React.FC<Props> = (props) => {
  const { name, description, fromLanguage, toLanguage, user } = props;

  return (
    <Box {...props} p={2} borderRadius="md" background={'trueGray.200'}>
      <VStack>
        <HStack>
          <Text fontSize={'xs'}>{LanguageFlag[fromLanguage.name]}</Text>
          <Text fontSize={'xs'}>{'→'}</Text>
          <Text fontSize={'xs'}>{LanguageFlag[toLanguage.name]}</Text>
        </HStack>
        <HStack alignItems={'baseline'} space={2}>
          <Text fontSize={'2xl'}>{name}</Text>
          <Text pb={1} fontSize={'xs'} color={'coolGray.400'}>
            {user.username}
          </Text>
        </HStack>
        <Text fontSize={'sm'}>{description}</Text>
      </VStack>
    </Box>
  );
};

export default DictionaryItem;
