import { observable, action, makeObservable, computed } from 'mobx';
import createUser from '../api/auth/registration.api';
import { UserStore } from './user.store';
import { UserAuthData } from '../components/RegistrationForm/types';
import { validateEmail } from '../components/RegistrationForm/utils';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants/user';
import i18n, { localizationTokens } from '../localization';

const {
  UsernameErrorRequired,
  UsernameErrorShort,
  UsernameErrorLong,
  MailErrorRequired,
  MailErrorInvalid,
  PasswordErrorRequired,
  PasswordErrorShort,
  PasswordErrorRepeat,
  PasswordErrorMatch,
} = localizationTokens.RegistrationScreen.registrationForm;

const usernameErrorRequiredText = i18n.t(UsernameErrorRequired);
const usernameErrorShortText = i18n.t(UsernameErrorShort);
const usernameErrorLongText = i18n.t(UsernameErrorLong);
const mailErrorRequired = i18n.t(MailErrorRequired);
const mailErrorInvalid = i18n.t(MailErrorInvalid);
const passwordErrorRequired = i18n.t(PasswordErrorRequired);
const passwordErrorShort = i18n.t(PasswordErrorShort);
const passwordErrorRepeat = i18n.t(PasswordErrorRepeat);
const passwordErrorMatch = i18n.t(PasswordErrorMatch);

export class AuthStore implements UserAuthData {
  private userStore: UserStore;

  username = '';
  mail = '';
  password = '';
  repeatPassword = '';
  loading = false;

  errorUsername = '';
  errorMail = '';
  errorPassword = '';
  errorRepeatPassword = '';

  constructor(userStore: UserStore) {
    makeObservable(this, {
      username: observable,
      mail: observable,
      password: observable,
      repeatPassword: observable,
      loading: observable,

      errorUsername: observable,
      errorMail: observable,
      errorPassword: observable,
      errorRepeatPassword: observable,

      handleUsernameChange: action.bound,
      handleMailChange: action.bound,
      handlePasswordChange: action.bound,
      handleRepeatPasswordChange: action.bound,
      handleSubmit: action.bound,
      validate: computed,
    });

    this.userStore = userStore;
  }

  public handleUsernameChange = (value: string) => {
    if (value === undefined) {
      this.errorUsername = usernameErrorRequiredText;
      return false;
    }

    if (value.length < MIN_USERNAME_LENGTH) {
      this.errorUsername = usernameErrorShortText;
      return;
    }

    if (value.length > MAX_USERNAME_LENGTH) {
      this.errorUsername = usernameErrorLongText;
      return false;
    }

    this.errorUsername = '';
    this.username = value;
  };

  public handleMailChange = (value: string) => {
    if (value === undefined) {
      this.errorMail = mailErrorRequired;
      return false;
    }

    if (!validateEmail(value)) {
      this.errorMail = mailErrorInvalid;
      return false;
    }

    this.errorMail = '';
    this.mail = value;
  };

  public handlePasswordChange = (value: string) => {
    this.password = value;

    if (value === undefined) {
      this.errorPassword = passwordErrorRequired;
      return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      this.errorPassword = passwordErrorShort;
      return false;
    }

    if (value !== this.repeatPassword) {
      this.errorRepeatPassword = passwordErrorMatch;
    } else {
      this.errorRepeatPassword = '';
    }

    this.errorPassword = '';
  };

  public handleRepeatPasswordChange = (value: string) => {
    this.repeatPassword = value;

    if (value === undefined) {
      this.errorRepeatPassword = passwordErrorRepeat;
      return false;
    }

    if (value !== this.password) {
      this.errorRepeatPassword = passwordErrorMatch;
      return false;
    }

    this.errorRepeatPassword = '';
  };

  public handleSubmit = async () => {
    this.loading = true;
    const token = await createUser({
      username: this.username,
      email: this.mail,
      password: this.password,
    });

    if (!token) {
      // show error message for user
      this.loading = false;
      return;
    }

    await this.userStore.setToken(token);
    this.loading = false;
  };

  get validate() {
    if (this.loading) {
      return false;
    }

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
