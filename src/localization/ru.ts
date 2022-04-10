import { Router, LoginScreen, LoginForm, RegistrationForm } from './keys';

export const ru = {
  [Router.RegistationScreenTitle]: 'Регистрация',
  [Router.LoginScreenTitle]: 'Авторизация',
  [Router.MainScreenTitle]: 'Главное меню',

  [LoginForm.UsernameLabel]: 'Псевдоним',
  [LoginForm.UsernamePlaceholder]: 'Введите ваш псевдоним',
  [LoginForm.PasswordLabel]: 'Пароль',
  [LoginForm.AuthButton]: 'Войти',
  [LoginScreen.RegistrationButton]: 'Создать аккаунт',

  [RegistrationForm.UsernameLabel]: 'Псевдоним',
  [RegistrationForm.UsernamePlaceholder]: 'Гарфилд',
  [RegistrationForm.MailLabel]: 'Электронная почта',
  [RegistrationForm.MailPlaceholder]: 'garfield@cat.com',
  [RegistrationForm.PasswordLabel]: 'Пароль',
  [RegistrationForm.RepeatPasswordLabel]: 'Повторите пароль',
  [RegistrationForm.RegistrationButton]: 'Создать аккаунт',
};
