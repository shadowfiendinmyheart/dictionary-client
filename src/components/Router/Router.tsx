import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import { observer } from 'mobx-react';
import ROUTES from '../../constants/routes';

const Stack = createNativeStackNavigator();

const Router = () => {
  const isLogged = false;

  if (!isLogged) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ title: 'Авторизация' }}
        />
        <Stack.Screen
          name={ROUTES.REGISTRATION_SCREEN}
          component={RegistrationScreen}
          options={{ title: 'Регистрация' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.MAIN_SCREE}
        component={MainScreen}
        options={{ title: 'Главное меню' }}
      />
    </Stack.Navigator>
  );
};

export default observer(Router);
