export enum Router {
  LoginScreenTitle = 'RouterLoginScreenTitle',
  RegistationScreenTitle = 'RouterRegistationScreenTitle',
  MainScreenTitle = 'RouterMainScreenTitle',
  CardScreenTitle = 'RouterCardScreenTitle',
  DictionariesScreenTitle = 'RouterDictionariesScreenTitle',
  DictionaryScreenTitle = 'RouterDictionaryScreenTitle',
  PublicDictionariesTitle = 'RouterPublicDictionariesTitle',
  PersonalDictionariesTitle = 'RouterPersonalDictionariesTitle',
}

export enum LoginScreen {
  RegistrationButton = 'LoginScreenRegistrationButton',
}

export enum LoginForm {
  UsernameLabel = 'LoginFormUsernameLabel',
  UsernamePlaceholder = 'LoginFormUsernamePlaceholder',
  UsernameErrorRequired = 'LoginFormUsernameErrorRequired',
  UsernameErrorShort = 'LoginFormUsernameErrorShort',
  UsernameErrorLong = 'LoginFormUsernameErrorLong',
  PasswordLabel = 'LoginFormPasswordLabel',
  PasswordErrorRequired = 'LoginFormPasswordErrorRequired',
  PasswordErrorShort = 'LoginFormPasswordErrorShort',
  AuthButton = 'LoginFormAuthButton',
}

export enum RegistrationForm {
  UsernameLabel = 'RegistrationFormUsernameLabel',
  UsernamePlaceholder = 'RegistrationFormUsernamePlaceholder',
  UsernameErrorRequired = 'RegistrationFormUsernameErrorRequired',
  UsernameErrorShort = 'RegistrationFormUsernameErrorShort',
  UsernameErrorLong = 'RegistrationFormUsernameErrorLong',
  MailLabel = 'RegistrationFormMailLabel',
  MailPlaceholder = 'RegistrationFormMailPlaceholder',
  MailErrorRequired = 'RegistrationFormMailErrorRequired',
  MailErrorInvalid = 'RegistrationFormMailErrorInvalid',
  PasswordLabel = 'RegistrationFormPasswordLabel',
  RepeatPasswordLabel = 'RegistrationFormRepeatPasswordLabel',
  PasswordErrorRequired = 'RegistrationFormPasswordErrorRequired',
  PasswordErrorShort = 'RegistrationFormPasswordErrorShort',
  PasswordErrorMatch = 'RegistrationFormPasswordErrorMatch',
  PasswordErrorRepeat = 'RegistrationFormPasswordErrorRepeat',
  RegistrationButton = 'RegistrationFormRegistrationButton',
}

export enum MainScreen {
  Header = 'MainScreenHeader',
  AddCardButton = 'MainScreenAddCardButton',
  LookDictionariesButton = 'MainScreenLookkDictionariesButton',
  GamesButton = 'MainScreenGamesButton',
  LogoutButton = 'MainScreenLogoutButton',
}

export enum CardScreen {
  PhrasePlaceholder = 'CardScreenPhrasePlaceholder',
  PhraseButton = 'CardScreenPhraseButton',
  TranslatePlaceholder = 'CardScreenPhrasePlaceholder',
  TranslateButton = 'CardScreenTranslateButton',
  AssociationButton = 'CardScreenAssociationButton',
}

export enum AssociationModal {
  Header = 'AssociationModalHeader',
  CardButton = 'AssociationModalCardButton',
  DictionaryPlaceholder = 'AssociationModalDictionaryPlaceholder',
}

export enum ImagesModal {
  Header = 'ImagesModalHeader',
  TranslationsLabel = 'ImagesModalTranslationsLabel',
  AddAboutButton = 'ImagesModalAddAboutButton',
  DeleteAboutButton = 'ImagesModalDeleteAboutButton',
  AboutPlaceholder = 'ImagesModalAboutPlaceholder',
  ImagePlaceholder = 'ImagesModalImagePlaceholder',
  ImageButton = 'ImagesModalImageButton',
  AssociationButton = 'ImagesModalAssociationButton',
}

export enum PersonalDictionariesScreen {
  CreateDictionaryButton = 'PersonalDictionariesScreenCreateDictionaryButton',
  DictionariesNotFoundText = 'PersonalDictionariesScreenDictionariesNotFoundText',
}

export enum CreateDictionaryModal {
  Header = 'CreateDictionaryModalHeader',
  NameLabel = 'CreateDictionaryModalNameLabel',
  NamePlaceholder = 'CreateDictionaryModalNamePlaceholder',
  NameErrorRequired = 'CreateDictionaryModalNameErrorRequired',
  NameErrorShort = 'CreateDictionaryModalNameErrorShort',
  NameErrorLong = 'CreateDictionaryModalNameErrorLong',
  DescriptionLabel = 'CreateDictionaryModalDescriptionLabel',
  DescriptionPlaceholder = 'CreateDictionaryModalDescriptionPlaceholder',
  DescriptionErrorRequired = 'CreateDictionaryModalDescriptionErrorRequired',
  DescriptionErrorLong = 'CreateDictionaryModalDescriptionErrorLong',
  PrivateCheckboxLabel = 'CreateDictionaryModalPrivateCheckboxLabel',
  CreateButton = 'CreateDictionaryModalCreateButton',
}

export enum ShowAssociationsModal {
  Header = 'ShowAssociationsModalHeader',
}
