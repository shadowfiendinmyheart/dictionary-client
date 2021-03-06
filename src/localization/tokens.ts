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
  PhraseTranslationGameScreen,
  TranslationPhraseGameScreen,
  EndGameScreen,
} from './keys';

export const localizationTokens = {
  Router: {
    index: Router,
  },

  LoginScreen: {
    index: LoginScreen,
    loginForm: LoginForm,
  },

  RegistrationScreen: {
    registrationForm: RegistrationForm,
  },

  MainScreen: {
    index: MainScreen,
  },

  CardScreen: {
    index: CardScreen,
    associationModal: AssociationModal,
    imagesModal: ImagesModal,
  },

  PersonalDictionariesScreen: {
    index: PersonalDictionariesScreen,
    createDictionaryModal: CreateDictionaryModal,
  },

  DictionaryScreen: {
    showAssociationsModal: ShowAssociationsModal,
  },

  PhraseTranslationGameScreen: {
    index: PhraseTranslationGameScreen,
  },

  TranslatePhraseGameScreen: {
    index: TranslationPhraseGameScreen,
  },

  EndGameScreen: {
    index: EndGameScreen,
  },
};
