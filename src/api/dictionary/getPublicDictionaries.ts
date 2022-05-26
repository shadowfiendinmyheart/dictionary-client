import axios from 'axios';
import { Dictionary } from '../../store/types';

async function getPublicDictionaries() {
  try {
    const { data } = await axios.get<Dictionary[]>('/dictionary/public');

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getPublicDictionaries;
