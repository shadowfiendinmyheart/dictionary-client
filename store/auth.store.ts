import { observable, action, makeObservable, computed } from 'mobx';
import { UserAuthData } from '../components/RegistrationForm/types';
import { validateEmail } from '../components/RegistrationForm/utils';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants/user';

export class AuthStore implements UserAuthData {
  constructor() {
    makeObservable(this, {
      username: observable,
      mail: observable,
      password: observable,
      repeatPassword: observable,

      errorUsername: observable,
      errorMail: observable,
      errorPassword: observable,
      errorRepeatPassword: observable,

      handleUsernameChange: action.bound,
      handleMailChange: action.bound,
      handlePasswordChange: action.bound,
      handleRepeatPasswordChange: action.bound,
      validate: computed,
    });
  }

  username = '';
  mail = '';
  password = '';
  repeatPassword = '';

  errorUsername = '';
  errorMail = '';
  errorPassword = '';
  errorRepeatPassword = '';

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

  public handleMailChange = (value: string) => {
    if (value === undefined) {
      this.errorMail = 'Mail is required';
      return false;
    }

    if (!validateEmail(value)) {
      this.errorMail = 'Mail is invalid';
      return false;
    }

    this.errorMail = '';
    this.mail = value;
  };

  public handlePasswordChange = (value: string) => {
    this.password = value;

    if (value === undefined) {
      this.errorPassword = 'Password is required';
      return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      this.errorPassword = 'Password is too short';
      return false;
    }

    if (value !== this.repeatPassword) {
      this.errorRepeatPassword = 'Passwords do not match';
    } else {
      this.errorRepeatPassword = '';
    }

    this.errorPassword = '';
  };

  public handleRepeatPasswordChange = (value: string) => {
    this.repeatPassword = value;

    if (value === undefined) {
      this.errorRepeatPassword = 'Repeat the password, please';
      return false;
    }

    if (value !== this.password) {
      this.errorRepeatPassword = 'Passwords do not match';
      return false;
    }

    this.errorRepeatPassword = '';
  };

  get validate() {
    if (!this.username || !this.mail || !this.password || !this.repeatPassword) {
      return false;
    }

    if (
      this.errorUsername ||
      this.errorMail ||
      this.errorPassword ||
      this.errorRepeatPassword
    ) {
      return false;
    }

    return true;
  }
}
