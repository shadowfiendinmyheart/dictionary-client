import axios from 'axios';
import { Card } from './types';

export enum RandomCardMode {
  MORE,
  LESS,
  EQUAL,
  MORE_OR_EQUAL,
  LESS_OR_EQUAL,
}

export type getRandomCardsRequest = {
  dictionaryId: number;
  counter: number;
  mode: RandomCardMode;
  size: number;
};

async function getRandomCards(request: getRandomCardsRequest) {
  const { dictionaryId, counter, mode, size } = request;

  try {
    const { data } = await axios.get<Card[]>(`/card/dictionary/random/${dictionaryId}`, {
      params: {
        counter,
        mode,
        size,
      },
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getRandomCards;
