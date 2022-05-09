import React from 'react';
import { RegistrationStore } from './registration.store';
import { LoginStore } from './login.store';
import { UserStore } from './user.store';

class RootStore {
  registrationStore: RegistrationStore;
  loginStore: LoginStore;
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
    this.registrationStore = new RegistrationStore(this.userStore);
    this.loginStore = new LoginStore(this.userStore);
  }
}

const store = new RootStore();

export type RootStoreType = typeof RootStore;
export const storeContext = React.createContext(store);
export const useStore = () => React.useContext(storeContext);
