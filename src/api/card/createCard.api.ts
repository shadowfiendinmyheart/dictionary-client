import axios from 'axios';
import { Assoctiation } from './types';

export type createCardResponse = {
  id: number;
  counter: number;
};

export type createCardRequest = {
  dictionaryId: number;
  phrase: string;
  description: string;
  associations: Assoctiation[];
};

async function createCard(request: createCardRequest) {
  const { dictionaryId, phrase, description, associations } = request;

  try {
    const { data } = await axios.post<createCardResponse>('/card', {
      dictionaryId,
      phrase,
      description,
      associations,
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default createCard;
