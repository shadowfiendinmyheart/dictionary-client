import axios from 'axios';
import { Example, Language } from './types';

export type TranslationsResponse = {
  text: string;
  from: string;
  to: string;
  translation: string[];
  examples: Example[];
};

export type getTranslationsRequest = {
  phrase: string;
  from: Language;
  to: Language;
};

async function getTranslations(request: getTranslationsRequest) {
  const { phrase, from, to } = request;

  try {
    const { data } = await axios.post<TranslationsResponse>('/translate/phrase', {
      phrase,
      from,
      to,
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getTranslations;
