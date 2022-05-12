import React from 'react';
import { observer } from 'mobx-react';
import { Image, VStack, HStack } from 'native-base';
import { chunkArray } from './utils';
import { TouchableHighlight } from 'react-native';
import { ImageItem } from '../../store/card.store';

type Props = {
  images: ImageItem[];
  onImagePress?: (url: string) => void;
};

const NumberOfColumns = 3;

const ImagesGrid: React.FC<Props> = ({ images, onImagePress }) => {
  const imagesGrid = chunkArray(images, NumberOfColumns);

  const handleImagePress = (url: string) => {
    if (!onImagePress) {
      return;
    }

    onImagePress(url);
  };

  return (
    <VStack space={1}>
      {imagesGrid.map((row, rowIndex) => {
        return (
          <HStack justifyContent={'space-between'} key={rowIndex}>
            {row.map((item, columnIndex) => {
              return (
                <TouchableHighlight
                  onPress={() => handleImagePress(item.url)}
                  key={columnIndex}
                >
                  {item.isPicked ? (
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: 95,
                        height: 95,
                        borderWidth: 2,
                        borderRadius: 2,
                        borderColor: 'blue',
                      }}
                      alt={'somesome'}
                    />
                  ) : (
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: 95,
                        height: 95,
                      }}
                      alt={'somesome'}
                    />
                  )}
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
