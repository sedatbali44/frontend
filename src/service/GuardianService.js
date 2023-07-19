import axios from 'axios';

class GuardianService {
  getGuardianNews = async () => {
    try {
      const response = await axios.get(
        'https://content.guardianapis.com/search?api-key=1398e706-9e58-412a-9810-5cf2617eafef'
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const instance = new GuardianService();

export default instance;
