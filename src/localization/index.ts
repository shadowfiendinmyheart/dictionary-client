import * as Localisation from 'expo-localization';
import i18n from 'i18n-js';
import { en } from './en';
import { ru } from './ru';
export { localizationTokens } from './tokens';

i18n.translations = {
  en,
  ru,
};

i18n.locale = 'en';
i18n.fallbacks = true;

export default i18n;
