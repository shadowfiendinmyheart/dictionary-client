import { observable, action, makeObservable, computed } from 'mobx';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants/user';
import i18n, { localizationTokens } from '../localization';
import { UserStore } from './user.store';

const {
  UsernameErrorRequired,
  UsernameErrorShort,
  UsernameErrorLong,
  PasswordErrorRequired,
  PasswordErrorShort,
} = localizationTokens.LoginScreen.LoginForm;

const usernameErrorRequiredText = i18n.t(UsernameErrorRequired);
const usernameErrorShortText = i18n.t(UsernameErrorShort);
const usernameErrorLongText = i18n.t(UsernameErrorLong);
const passwordErrorRequired = i18n.t(PasswordErrorRequired);
const passwordErrorShort = i18n.t(PasswordErrorShort);

export class LoginStore {
  private userStore: UserStore;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      username: observable,
      password: observable,

      errorUsername: observable,
      errorPassword: observable,

      handleUsernameChange: action.bound,
      handlePasswordChange: action.bound,
      handleOnLoginSubmit: action.bound,

      validate: computed,
    });

    this.userStore = userStore;
  }

  username = '';
  password = '';

  errorUsername = '';
  errorPassword = '';

  public handleUsernameChange = (value: string) => {
    if (value === undefined) {
      this.errorUsername = usernameErrorRequiredText;
      return false;
    }

    if (value.length < MIN_USERNAME_LENGTH) {
      this.errorUsername = usernameErrorShortText;
      return false;
    }

    if (value.length > MAX_USERNAME_LENGTH) {
      this.errorUsername = usernameErrorLongText;
      return false;
    }

    this.errorUsername = '';
    this.username = value;
  };

  public handlePasswordChange = (value: string) => {
    if (value === undefined) {
      this.errorPassword = passwordErrorRequired;
      return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      this.errorPassword = passwordErrorShort;
      return false;
    }

    this.errorPassword = '';
    this.password = value;
  };

  public handleOnLoginSubmit() {
    console.log('is making api request...');
    try {
      // ...
      this.userStore.token = '...';
      this.userStore.isAuth = true;
    } catch (error) {
      // ...
      this.userStore.isAuth = false;
    }
  }

  get validate() {
    if (!this.username || !this.password) {
      return false;
    }

    if (this.errorUsername || this.errorPassword) {
      return false;
    }

    return true;
  }
}
