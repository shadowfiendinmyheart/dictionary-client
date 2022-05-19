import { observable, action, makeObservable } from 'mobx';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

import { TOKEN_SECURE_STORE } from '../constants/store';
import { Token } from './types';

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

      setToken: action.bound,
      setIsAuth: action.bound,
      initUser: action.bound,
      logout: action.bound,
    });
  }

  public async setToken(token: string) {
    if (!token) {
      return;
    }

    try {
      await SecureStore.setItemAsync(TOKEN_SECURE_STORE, token);
      this.token = token;
      this.isAuth = true;
    } catch (error) {
      console.log('Error while set token', error);
      // show error for user
    }
  }

  public setIsAuth = (value: boolean) => {
    this.isAuth = value;
  };

  public initUser = async () => {
    this.isFetching = true;
    const storedToken = await SecureStore.getItemAsync(TOKEN_SECURE_STORE);

    if (!storedToken) {
      this.isAuth = false;
      this.isFetching = false;
      return;
    }

    const decoded: Token = jwt_decode(storedToken);

    this.token = storedToken;
    this.username = decoded.username;
    this.isAuth = true;
    this.isFetching = false;
  };

  public logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_SECURE_STORE);
      this.token = '';
      this.isAuth = false;
    } catch (error) {
      console.log('Error while delete token', error);
      // show error for user
    }
  };
}
