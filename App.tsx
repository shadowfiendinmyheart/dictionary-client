import React, { useEffect } from 'react';
import { configure } from 'mobx';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import Router from './src/components/Router';
import { useStore } from './src/store/root.store';
import axios from 'axios';
import { API_URL } from './src/constants/api';
import { observer } from 'mobx-react';

// used for async reaction in mobx
setTimeout(() =>
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f),
  }),
);

const App = () => {
  const { userStore } = useStore();
  const { initUser, token } = userStore;

  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    void (async () => {
      await initUser();
    })();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default observer(App);
