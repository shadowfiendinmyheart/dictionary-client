import React from 'react';
import { observer } from 'mobx-react';
import { Box, IconButton, Icon, Center } from 'native-base';
import { Entypo } from '@native-base/icons';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';

type Props = {
  imageUrl: string;
  translations: string[];
  about?: string;
  height: string;
  width: string;
};

const AssociationItem: React.FC<Props> = ({
  imageUrl,
  translations,
  height,
  width,
  about,
}) => {
  return (
    <Box height={height} width={width}>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        borderRadius={4}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          {translations.map((translation, index) => {
            return (
              <Text style={styles.text} key={index}>
                {translation}
              </Text>
            );
          })}
        </ScrollView>
        {about && (
          <IconButton
            style={styles.iconButton}
            backgroundColor={'warmGray.50'}
            size="6"
            paddingTop={1}
            icon={
              <Center>
                <Icon
                  as={Entypo}
                  name="dots-three-vertical"
                  size="4"
                  color="trueGray.400"
                />
              </Center>
            }
            onPress={() => alert(about)}
          />
        )}
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#0000004b',
  },
  iconButton: {
    position: 'absolute',
    right: 7,
    top: 7,
  },
});

export default observer(AssociationItem);
