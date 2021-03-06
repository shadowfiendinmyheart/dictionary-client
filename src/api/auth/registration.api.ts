import axios from 'axios';
import { User } from './types';

type RegistrationUserResponse = {
  token: string;
};

async function registrationUser(user: User): Promise<string | undefined> {
  const { username, email, password } = user;

  try {
    const { data } = await axios.post<RegistrationUserResponse>('/auth/registration', {
      username,
      email,
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

export default registrationUser;
