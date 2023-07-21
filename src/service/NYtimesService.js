import axios from 'axios';

class NYtimesService {
  getNYtimesNews = async () => {
    try {
      const response = await axios.get(
        'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=wuEk5e3rIloI8JElrC3bKdRFEAMu2FR5'
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const instance = new NYtimesService();

export default instance;
