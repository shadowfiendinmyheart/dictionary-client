import {
  MAX_DICTIONARY_DESCRIPTION_LENGTH,
  MAX_DICTIONARY_NAME_LENGTH,
  MIN_DICTIONARY_NAME_LENGTH,
} from '../constants/dictionary';
import {
  Router,
  LoginScreen,
  LoginForm,
  RegistrationForm,
  MainScreen,
  CardScreen,
  AssociationModal,
  ImagesModal,
  PersonalDictionariesScreen,
  CreateDictionaryModal,
  ShowAssociationsModal,
} from './keys';

export const en = {
  [Router.RegistationScreenTitle]: 'Registration',
  [Router.LoginScreenTitle]: 'Authorization',
  [Router.MainScreenTitle]: 'Menu',
  [Router.CardScreenTitle]: 'Card',
  [Router.DictionariesScreenTitle]: 'Dictionaries',
  [Router.DictionaryScreenTitle]: 'Dictionary',
  [Router.PublicDictionariesTitle]: 'Public dictionaries',
  [Router.PersonalDictionariesTitle]: 'Personal dictionaries',

  [LoginForm.UsernameLabel]: 'Username',
  [LoginForm.UsernamePlaceholder]: 'Enter your username',
  [LoginForm.PasswordErrorRequired]: 'Password is required',
  [LoginForm.UsernameErrorShort]: 'Username is too short',
  [LoginForm.UsernameErrorLong]: 'Username is too long',
  [LoginForm.PasswordLabel]: 'Password',
  [LoginForm.PasswordErrorShort]: 'Password is too short',
  [LoginForm.UsernameErrorLong]: 'Password is too long',
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

  [MainScreen.Header]: 'Welcome,',
  [MainScreen.AddCardButton]: 'Add card',
  [MainScreen.LookDictionariesButton]: 'Dictionaries',
  [MainScreen.GamesButton]: 'Games',
  [MainScreen.LogoutButton]: 'Logout',

  [CardScreen.PhrasePlaceholder]: 'Enter a phrase',
  [CardScreen.PhraseButton]: 'Find translations',
  [CardScreen.TranslatePlaceholder]: 'Enter a translation',
  [CardScreen.TranslateButton]: 'Add translation',
  [CardScreen.AssociationButton]: 'Create associations',

  [AssociationModal.Header]: 'Association list',
  [AssociationModal.DictionaryPlaceholder]: 'Pick a dictionary',
  [AssociationModal.CardButton]: 'Create card',

  [ImagesModal.Header]: 'Creating associations',
  [ImagesModal.TranslationsLabel]: 'Pick translations to add to the association',
  [ImagesModal.AddAboutButton]: 'Add about',
  [ImagesModal.DeleteAboutButton]: 'Delete about',
  [ImagesModal.AboutPlaceholder]: 'Enter text',
  [ImagesModal.ImagePlaceholder]: 'Enter text to find images',
  [ImagesModal.ImageButton]: 'Find images',
  [ImagesModal.AssociationButton]: 'Create association',

  [PersonalDictionariesScreen.CreateDictionaryButton]: 'Create new dictionary',
  [PersonalDictionariesScreen.DictionariesNotFoundText]: 'Dictionaries was not found :(',

  [CreateDictionaryModal.Header]: 'New dictionary',
  [CreateDictionaryModal.NameLabel]: 'Enter dictionary name',
  [CreateDictionaryModal.NamePlaceholder]: 'Dictionary name',
  [CreateDictionaryModal.NameErrorRequired]: 'This field is required',
  [CreateDictionaryModal.NameErrorShort]: `Dictionary name should be larger than ${MIN_DICTIONARY_NAME_LENGTH}`,
  [CreateDictionaryModal.NameErrorLong]: `Dictionary name should be smaller than ${MAX_DICTIONARY_NAME_LENGTH}`,
  [CreateDictionaryModal.DescriptionLabel]: 'Enter dictionary description',
  [CreateDictionaryModal.DescriptionPlaceholder]: 'Dictionary description',
  [CreateDictionaryModal.DescriptionErrorRequired]: 'This field is required',
  [CreateDictionaryModal.DescriptionErrorLong]: `Dictionary description should be smaller ${MAX_DICTIONARY_DESCRIPTION_LENGTH}`,
  [CreateDictionaryModal.PrivateCheckboxLabel]: 'Private dictionary',
  [CreateDictionaryModal.CreateButton]: 'Create',

  [ShowAssociationsModal.Header]: 'Associations',
};
