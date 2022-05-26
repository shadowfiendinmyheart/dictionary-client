import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Image, VStack, HStack } from 'native-base';
import { chunkArray } from '../../utils/chunkArray';
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
                      style={styles.pickedImage}
                      alt={'picked-image'}
                    />
                  ) : (
                    <Image
                      source={{ uri: item.url }}
                      style={styles.image}
                      alt={'image'}
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

const styles = StyleSheet.create({
  image: {
    width: 95,
    height: 95,
  },
  pickedImage: {
    width: 95,
    height: 95,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'blue',
  },
});

export default observer(ImagesGrid);
