import React from 'react';
import { Input, FormControl, VStack, Button, Icon } from 'native-base';
import { Entypo } from '@native-base/icons';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../../constants/user';
import { usernameHelperText, validateEmail } from './utils';

type formInputs = {
  username: string;
  mail: string;
  password: string;
  repeatPassword: string;
};

// TODO: облегчить компонент
//       можно при помощи MobX вынести состояние и разбить форму на отдельные компоненты
//       добавить + на каждый input, если где-то нет +, то кнопка задизейблена
const RegistrationForm = () => {
  const [formData, setData] = React.useState<formInputs>({
    username: '',
    mail: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = React.useState<formInputs>({
    username: '',
    mail: '',
    password: '',
    repeatPassword: '',
  });

  const validate = () => {
    if (
      formData.username.length === 0 ||
      formData.mail.length === 0 ||
      formData.password.length === 0 ||
      formData.repeatPassword.length === 0
    ) {
      return false;
    }

    if (errors.username.length > 0) {
      return false;
    }

    if (errors.mail.length > 0) {
      return false;
    }

    return true;
  };

  const handleUsernameChange = (value: string) => {
    if (value === undefined) {
      setErrors({ ...errors, username: 'Name is required' });
      return false;
    }

    if (value.length < MIN_USERNAME_LENGTH) {
      setErrors({ ...errors, username: 'Name is too short' });
      return false;
    }

    if (value.length > MAX_USERNAME_LENGTH) {
      setErrors({ ...errors, username: 'Name is too long' });
      return false;
    }

    setErrors({ ...errors, username: '' });
    setData({ ...formData, username: value });
  };

  const handleMailChange = (value: string) => {
    if (value === undefined) {
      setErrors({ ...errors, mail: 'Mail is required' });
      return false;
    }

    if (!validateEmail(value)) {
      setErrors({ ...errors, mail: 'Mail is invalid' });
      return false;
    }

    setErrors({ ...errors, mail: '' });
    setData({ ...formData, mail: value });
  };

  const handlePasswordChange = (value: string) => {
    if (value === undefined) {
      setErrors({ ...errors, password: 'Password is required' });
      return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      setErrors({ ...errors, password: 'Password is too short' });
      return false;
    }

    setErrors({ ...errors, password: '' });
    setData({ ...formData, password: value });
  };

  const handleRepeatPasswordChange = (value: string) => {
    if (value === undefined) {
      setErrors({ ...errors, repeatPassword: 'Repeat the password, please' });
      return false;
    }

    if (value !== formData.password) {
      setErrors({ ...errors, repeatPassword: 'Passwords do not match' });
      return false;
    }

    setErrors({ ...errors, repeatPassword: '' });
    setData({ ...formData, repeatPassword: value });
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted!') : console.log('Validation Failed');
  };

  return (
    <VStack space={4} width="90%">
      <FormControl isRequired isInvalid={errors.username.length > 0}>
        <FormControl.Label _text={{ bold: true }}>Псевдоним</FormControl.Label>
        <Input placeholder="Garfield" onChangeText={handleUsernameChange} />
        <FormControl.HelperText _text={{ fontSize: 'xs' }}>
          {usernameHelperText}
        </FormControl.HelperText>
        <FormControl.ErrorMessage color={'warning.400'} _text={{ fontSize: 'xs' }}>
          {errors.username.length > 0 && errors.username}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={errors.mail.length > 0}>
        <FormControl.Label _text={{ bold: true }}>Почта</FormControl.Label>
        <Input
          type="email"
          placeholder="garfield@cat.com"
          onChangeText={handleMailChange}
        />
        <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
          {errors.mail.length > 0 && errors.mail}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={errors.password.length > 0 || errors.repeatPassword.length > 0}
      >
        <FormControl.Label _text={{ bold: true }}>Пароль</FormControl.Label>
        <Input type="password" placeholder="*****" onChangeText={handlePasswordChange} />

        <FormControl.Label mt={2} _text={{ bold: true }}>
          Повторите пароль
        </FormControl.Label>
        <Input
          type="password"
          placeholder="*****"
          onChangeText={handleRepeatPasswordChange}
        />
      </FormControl>
      <Button
        leftIcon={<Icon as={Entypo} name="add-user" />}
        onPress={onSubmit}
        mt={5}
        colorScheme="cyan"
      >
        Зарегистрироваться
      </Button>
    </VStack>
  );
};

export default RegistrationForm;
