import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en } from './en';
import { ru } from './ru';
export { localizationTokens } from './tokens';

i18n.translations = {
  en,
  ru,
};

// TODO: set init locale with mobx
// i18n.locale = Localization.locale;

i18n.locale = 'ru';
i18n.fallbacks = true;

export default i18n;
