import axios from 'axios';
import { API_URL } from '../../constants/api';

type CreateUserResponse = {
  token: string;
};

type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
};

async function createUser(user: CreateUserArgs): Promise<string | undefined> {
  const { username, email, password } = user;

  try {
    const { data } = await axios.post<CreateUserResponse>(
      `${API_URL}/auth/registration`,
      {
        username,
        email,
        password,
      },
    );

    return data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
  }
}

export default createUser;
