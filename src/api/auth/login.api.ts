import axios from 'axios';
import { API_URL } from '../../constants/api';
import { User } from './types';

type LoginUserResponse = {
  token: string;
};

async function loginUser(user: Omit<User, 'email'>): Promise<string | undefined> {
  const { username, password } = user;

  try {
    const { data } = await axios.post<LoginUserResponse>(`${API_URL}/auth/login`, {
      username,
      password,
    });

    return data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
  }
}

export default loginUser;
