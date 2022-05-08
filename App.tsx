import React, { useEffect } from 'react';
import { configure } from 'mobx';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import Router from './src/components/Router';
import { useStore } from './src/store/root.store';

// used for async reaction in mobx
setTimeout(() =>
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f),
  }),
);

export default function App() {
  const { userStore } = useStore();
  const { initUser } = userStore;

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
}
