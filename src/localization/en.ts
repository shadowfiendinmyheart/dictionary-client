import { Router, LoginScreen, LoginForm, RegistrationForm } from './keys';

export const en = {
  [Router.RegistationScreenTitle]: 'Registration',
  [Router.LoginScreenTitle]: 'Authorization',
  [Router.MainScreenTitle]: 'Menu',

  [LoginForm.UsernameLabel]: 'Username',
  [LoginForm.UsernamePlaceholder]: 'Enter your username',
  [LoginForm.PasswordErrorRequired]: 'Name is required',
  [LoginForm.PasswordErrorShort]: 'Name is too short',
  [LoginForm.UsernameErrorLong]: 'Name is too long',
  [LoginForm.PasswordLabel]: 'Password',
  [LoginForm.PasswordErrorRequired]: 'Password is required',
  [LoginForm.PasswordErrorShort]: 'Password is too short',
  [LoginForm.AuthButton]: 'Join',
  [LoginScreen.RegistrationButton]: 'Create account',

  [RegistrationForm.UsernameLabel]: 'Username',
  [RegistrationForm.UsernamePlaceholder]: 'Garfield',
  [RegistrationForm.UsernameErrorRequired]: 'Username is required',
  [RegistrationForm.UsernameErrorShort]: 'Username is too short',
  [RegistrationForm.UsernameErrorLong]: 'Username is too long',
  [RegistrationForm.MailLabel]: 'E-mail',
  [RegistrationForm.MailPlaceholder]: 'garfield@cat.com',
  [RegistrationForm.MailErrorRequired]: 'Mail is required',
  [RegistrationForm.MailErrorInvalid]: 'Mail is invalid',
  [RegistrationForm.PasswordLabel]: 'Password',
  [RegistrationForm.RepeatPasswordLabel]: 'Repeat Password',
  [RegistrationForm.PasswordErrorRequired]: 'Password is required',
  [RegistrationForm.PasswordErrorShort]: 'Password is too short',
  [RegistrationForm.PasswordErrorMatch]: 'Passwords do not match',
  [RegistrationForm.PasswordErrorRepeat]: 'Repeat the password, please',
  [RegistrationForm.RegistrationButton]: 'Create account',
};
