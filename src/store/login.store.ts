import { observable, action, makeObservable, computed } from 'mobx';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants/user';

export class LoginStore {
  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,

      errorUsername: observable,
      errorPassword: observable,

      handleUsernameChange: action.bound,
      handlePasswordChange: action.bound,
      validate: computed,
    });
  }

  username = '';
  password = '';

  errorUsername = '';
  errorPassword = '';

  public handleUsernameChange = (value: string) => {
    if (value === undefined) {
      this.errorUsername = 'Name is required';
      return false;
    }

    if (value.length < MIN_USERNAME_LENGTH) {
      this.errorUsername = 'Name is too short';
      return;
    }

    if (value.length > MAX_USERNAME_LENGTH) {
      this.errorUsername = 'Name is too long';
      return false;
    }

    this.errorUsername = '';
    this.username = value;
  };

  public handlePasswordChange = (value: string) => {
    if (value === undefined) {
      this.errorPassword = 'Password is required';
      return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      this.errorPassword = 'Password is too short';
      return false;
    }

    this.errorPassword = '';
    this.password = value;
  };

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
