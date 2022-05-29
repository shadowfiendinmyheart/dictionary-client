import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import i18n, { localizationTokens } from '../../localization';
import { useStore } from '../../store/root.store';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import ROUTES from '../../constants/routes';
import LoadingScreen from '../../screens/LoadingScreen';
import CardScreen from '../../screens/CardScreen';
import PersonalDictionariesScreen from '../../screens/PersonalDictionariesScreen';
import PublicDictionariesScreen from '../../screens/PublicDictionariesScreen';
import { Icon } from 'native-base';
import { Entypo } from '@native-base/icons';
import DictionaryScreen from '../../screens/DictionaryScreen';
import PhraseTranslationGameScreen from '../../screens/PhraseTranslationGameScreen';
import TranslationPhraseGameScreen from '../../screens/TranslationPhraseGameScreen';

const {
  LoginScreenTitle,
  MainScreenTitle,
  RegistationScreenTitle,
  CardScreenTitle,
  DictionariesScreenTitle,
  DictionaryScreenTitle,
  PersonalDictionariesTitle,
  PublicDictionariesTitle,
  PhraseTranslationGameTitle,
  TranslationPhraseGameTitle,
} = localizationTokens.Router.index;
const loginScreenTitle = i18n.t(LoginScreenTitle);
const registrationTitle = i18n.t(RegistationScreenTitle);
const mainScreenTitle = i18n.t(MainScreenTitle);
const cardScreenTitle = i18n.t(CardScreenTitle);
const dictionariesScreenTitle = i18n.t(DictionariesScreenTitle);
const dictionaryScreenTitle = i18n.t(DictionaryScreenTitle);
const publicDictionariesTabTitle = i18n.t(PublicDictionariesTitle);
const personalDictionariesTabTitle = i18n.t(PersonalDictionariesTitle);
const phraseTranslationGameTitle = i18n.t(PhraseTranslationGameTitle);
const translationPhraseGameTitle = i18n.t(TranslationPhraseGameTitle);

const DictionaryNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === ROUTES.PERSONAL_DICTIONARIES_SCREEN) {
            iconName = 'home';
          } else if (ROUTES.PUBLIC_DICTIONARIES_SCREEN) {
            iconName = 'magnifying-glass';
          }

          return <Icon as={Entypo} name={iconName} color="trueGray.400" />;
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.PERSONAL_DICTIONARIES_SCREEN}
        component={PersonalDictionariesScreen}
        options={{ headerShown: false, title: personalDictionariesTabTitle }}
      />
      <Tab.Screen
        name={ROUTES.PUBLIC_DICTIONARIES_SCREEN}
        component={PublicDictionariesScreen}
        options={{ headerShown: false, title: publicDictionariesTabTitle }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const Router = () => {
  const { userStore } = useStore();
  const { isAuth, isFetching } = userStore;

  if (isFetching) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.MAIN_SCREEN}
          component={LoadingScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    );
  }

  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ title: loginScreenTitle }}
        />
        <Stack.Screen
          name={ROUTES.REGISTRATION_SCREEN}
          component={RegistrationScreen}
          options={{ title: registrationTitle }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.MAIN_SCREEN}
        component={MainScreen}
        options={{ title: mainScreenTitle }}
      />
      <Stack.Screen
        name={ROUTES.CARD_SCREEN}
        component={CardScreen}
        options={{ title: cardScreenTitle }}
      />
      <Stack.Screen
        name={ROUTES.DICTIONARY_NAVIGATOR}
        component={DictionaryNavigator}
        options={{ title: dictionariesScreenTitle }}
      />
      <Stack.Screen
        name={ROUTES.DICTIONARY_SCREEN}
        component={DictionaryScreen}
        options={{ title: dictionaryScreenTitle }}
      />
      <Stack.Screen
        name={ROUTES.PHRASE_TRANSLATION_GAME_SCREEN}
        component={PhraseTranslationGameScreen}
        options={{ title: phraseTranslationGameTitle }}
      />
      <Stack.Screen
        name={ROUTES.TRANSLATION_PHRASE_GAME_SCREEN}
        component={TranslationPhraseGameScreen}
        options={{ title: translationPhraseGameTitle }}
      />
    </Stack.Navigator>
  );
};

export default observer(Router);
