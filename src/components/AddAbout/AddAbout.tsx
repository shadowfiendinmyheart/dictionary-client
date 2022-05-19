import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, VStack, TextArea } from 'native-base';

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

  return (
    <VStack>
      <Button onPress={handleButtonPress}>
        {isOpen ? 'Удалить описание' : 'Добавить описание'}
      </Button>
      {isOpen ? (
        <TextArea
          value={textAreaValue}
          onChangeText={handleTextAreaChange}
          mt={2}
          h={20}
          placeholder="Введите описание"
          w={'100%'}
        />
      ) : null}
    </VStack>
  );
};

export default observer(AddAbout);
