import axios from 'axios';
import { Dictionary } from '../../store/types';

async function addPublicDictionary(dictionaryId: number) {
  try {
    const { data } = await axios.post<Dictionary>(`/dictionary/add/${dictionaryId}`);

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default addPublicDictionary;
