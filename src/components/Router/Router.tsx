import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import { observer } from 'mobx-react';
import ROUTES from '../../constants/routes';
import i18n, { localizationTokens } from '../../localization';

const Stack = createNativeStackNavigator();

const Router = () => {
  // check await api key
  // replace this var to store
  const isLogged = false;

  // make isFetch screen for await api key

  const { LoginScreenTitle, MainScreenTitle, RegistationScreenTitle } =
    localizationTokens.Router.index;
  const loginScreenTitle = i18n.t(LoginScreenTitle);
  const registrationTitle = i18n.t(RegistationScreenTitle);
  const mainScreenTitle = i18n.t(MainScreenTitle);

  if (!isLogged) {
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
    </Stack.Navigator>
  );
};

export default observer(Router);
