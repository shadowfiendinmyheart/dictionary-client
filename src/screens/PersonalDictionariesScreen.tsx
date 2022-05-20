import React from 'react';
import { Center, Heading, Button } from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';
import { NavigationStackProp } from 'react-navigation-stack';
import ROUTES from '../constants/routes';

interface Props {
  navigation: NavigationStackProp;
}

const PersonalDictionariesScreen: React.FC<Props> = ({ navigation }) => {
  const { userStore } = useStore();
  const { username, logout } = userStore;

  return <Center flex={1}>PersonalDictionariesScreen</Center>;
};

export default PersonalDictionariesScreen;
