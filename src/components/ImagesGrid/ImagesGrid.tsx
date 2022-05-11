import React from 'react';
import { observer } from 'mobx-react';
import { Image, VStack, HStack } from 'native-base';
import { chunkArray } from './utils';
import { TouchableHighlight } from 'react-native';

type Props = {
  images: string[];
  onImagePress: () => void;
};

const NumberOfColumns = 3;

const ImagesGrid: React.FC<Props> = ({ images, onImagePress }) => {
  const imagesGrid = chunkArray(images, NumberOfColumns);

  return (
    <VStack space={1}>
      {imagesGrid.map((row, rowIndex) => {
        return (
          <HStack justifyContent={'space-between'} key={rowIndex}>
            {row.map((image, columnIndex) => {
              return (
                <TouchableHighlight onPress={onImagePress} key={columnIndex}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 95,
                      height: 95,
                    }}
                    alt={'somesome'}
                  />
                </TouchableHighlight>
              );
            })}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default observer(ImagesGrid);
