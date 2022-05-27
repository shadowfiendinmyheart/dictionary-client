import axios from 'axios';

async function increaseCardCounter(cardId: number) {
  try {
    const response = await axios.patch(`/card/counter/${cardId}`);

    if (response.status !== 204) {
      return false;
    }

    return true;
  } catch (error) {
    console.log('error', error);
  }
}

export default increaseCardCounter;
