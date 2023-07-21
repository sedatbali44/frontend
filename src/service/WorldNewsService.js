import axios from 'axios';

class WorldNewsService {
  getWorldNews = async () => {
    try {
      const response = await axios.get(
        'https://api.worldnewsapi.com/search-news?api-key=65f43190d6f04f38b8a737d0be26efae'
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const instance = new WorldNewsService();

export default instance;
