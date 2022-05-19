import axios from 'axios';
import { Dictionary } from '../../store/types';

async function getPersonalDictionaries() {
  try {
    const { data } = await axios.get<Dictionary[]>('/dictionary');

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default getPersonalDictionaries;
