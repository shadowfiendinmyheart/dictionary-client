import axios from 'axios';
import { Card } from './types';

async function getCardsByDictionaryId(dictionaryId: number) {
  try {
    const { data } = await axios.get<Card[]>(`/card/dictionary/${dictionaryId}`);

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getCardsByDictionaryId;
