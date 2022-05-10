import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import i18n, { localizationTokens } from '../../localization';
import { useStore } from '../../store/root.store';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import ROUTES from '../../constants/routes';
import LoadingScreen from '../../screens/LoadingScreen';
import CardScreen from '../../screens/CardScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { userStore } = useStore();
  const { isAuth, isFetching } = userStore;

  const { LoginScreenTitle, MainScreenTitle, RegistationScreenTitle, CardScreenTitle } =
    localizationTokens.Router.index;
  const loginScreenTitle = i18n.t(LoginScreenTitle);
  const registrationTitle = i18n.t(RegistationScreenTitle);
  const mainScreenTitle = i18n.t(MainScreenTitle);
  const cardScreenTitle = i18n.t(CardScreenTitle);

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
    </Stack.Navigator>
  );
};

export default observer(Router);
