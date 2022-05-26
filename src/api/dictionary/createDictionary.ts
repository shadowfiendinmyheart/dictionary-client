import axios from 'axios';
import { Language } from '../card/types';

export type createDictionaryResponse = {
  id: number;
  name: string;
  description: string;
  from: Language;
  to: Language;
  private: boolean;
  user_id: number;
};

export type createDictionaryRequest = {
  name: string;
  description: string;
  from: Language;
  to: Language;
  privateDictionary: boolean;
};

async function createDictionary(request: createDictionaryRequest) {
  const { name, description, from, to, privateDictionary } = request;

  try {
    const { data } = await axios.post<createDictionaryResponse>('/dictionary', {
      name,
      description,
      from,
      to,
      private: privateDictionary,
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default createDictionary;
