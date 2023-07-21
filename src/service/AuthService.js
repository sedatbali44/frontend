import axios from 'axios';

class AuthService {
  logOut = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/logout'
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  logIn = async (name, email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
      name,
      email,
      password,
    });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const instance = new AuthService();

export default instance;