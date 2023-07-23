import axios from 'axios';

class PreferencesService {
  getPreferencesByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/preferences/user/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  createPreferencesWithUserIdAndName = async (userId,username,category,author,source,url) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/preferences", {
        userId,username,category,author,source,url
    });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteLikedNewsByid = async(id) =>{
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/preferences/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
const instance = new PreferencesService();

export default instance;
