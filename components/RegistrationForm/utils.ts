import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../../constants/user';

export const usernameHelperText = `Псевдоним должен быть больше ${MIN_USERNAME_LENGTH} и меньше ${MAX_USERNAME_LENGTH} символов`;

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
