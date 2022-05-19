import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, VStack, TextArea } from 'native-base';
import i18n, { localizationTokens } from '../../localization';

type Props = {
  onTextareaChange?: (text?: string) => void;
  onButtonPress?: (isOpen?: boolean) => void;
};

const AddAbout: React.FC<Props> = ({ onTextareaChange, onButtonPress }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isOpen, setOpen] = useState(false);

  const handleButtonPress = () => {
    setOpen(!isOpen);

    if (isOpen) {
      setTextAreaValue('');
    }

    if (onButtonPress) {
      onButtonPress(isOpen);
    }
  };

  const handleTextAreaChange = (text: string) => {
    setTextAreaValue(text);

    if (onTextareaChange) {
      onTextareaChange(text);
    }
  };

  const { AddAboutButton, DeleteAboutButton, AboutPlaceholder } =
    localizationTokens.CardScreen.imagesModal;
  const addAboutButtonText = i18n.t(AddAboutButton);
  const deleteAboutButtonText = i18n.t(DeleteAboutButton);
  const aboutPlaceholderText = i18n.t(AboutPlaceholder);

  return (
    <VStack>
      <Button onPress={handleButtonPress}>
        {isOpen ? deleteAboutButtonText : addAboutButtonText}
      </Button>
      {isOpen ? (
        <TextArea
          value={textAreaValue}
          onChangeText={handleTextAreaChange}
          mt={2}
          h={20}
          placeholder={aboutPlaceholderText}
          w={'100%'}
        />
      ) : null}
    </VStack>
  );
};

export default observer(AddAbout);
