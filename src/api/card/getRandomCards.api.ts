import axios from 'axios';
import { Assoctiation } from './types';

export enum RandomCardMode {
  MORE,
  LESS,
  EQUAL,
  MORE_OR_EQUAL,
  LESS_OR_EQUAL,
}

export type getRandomCardsResponse = {
  id: number;
  counter: number;
};

export type getRandomCardsRequest = {
  dictionaryId: number;
  counter: number;
  mode: RandomCardMode;
  size: number;
};

async function getRandomCards(request: getRandomCardsRequest) {
  const { dictionaryId, counter, mode, size } = request;

  try {
    const { data } = await axios.get<getRandomCardsResponse>(
      `/card/dictionary/random/${dictionaryId}`,
      {
        params: {
          counter,
          mode,
          size,
        },
      },
    );

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getRandomCards;
