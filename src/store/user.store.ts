import { observable, action, makeObservable, computed, runInAction } from 'mobx';
import * as SecureStore from 'expo-secure-store';

import { TOKEN_SECURE_STORE } from '../constants/store';

export class UserStore {
  username = '';
  token = '';
  isAuth = false;
  isFetching = false;

  constructor() {
    makeObservable(this, {
      username: observable,
      token: observable,
      isAuth: observable,
      isFetching: observable,
    });
  }

  public async setToken(token: string) {
    if (!token) {
      return;
    }

    try {
      await SecureStore.setItemAsync(TOKEN_SECURE_STORE, token);
      runInAction(() => {
        this.token = token;
        this.isAuth = true;
      });
    } catch (error) {
      console.log('Error while set token', error);
      // show error for user
    }
  }

  public setIsAuth = (value: boolean) => {
    runInAction(() => {
      this.isAuth = value;
    });
  };

  public initUser = async () => {
    this.isFetching = true;
    const storedToken = await SecureStore.getItemAsync(TOKEN_SECURE_STORE);

    if (!storedToken) {
      this.isAuth = false;
      this.isFetching = false;
      return;
    }

    this.token = storedToken;
    this.isAuth = true;
    this.isFetching = false;
  };
}
