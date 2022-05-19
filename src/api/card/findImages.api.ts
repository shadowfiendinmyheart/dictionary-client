import axios from 'axios';

async function findImages(text: string) {
  try {
    const { data } = await axios.get<string[]>('/image/find', {
      params: {
        text,
      },
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default findImages;
