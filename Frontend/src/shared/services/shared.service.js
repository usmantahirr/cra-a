import API, { contentType } from '../../api';
import { API_BASE_URL } from '../../config';
import { GET_COUNTRIES } from '../../api/endpoints';

class SharedService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL,
    });
  }

  getCountries = () => {
    return this.http.get(GET_COUNTRIES);
  };

  getCities = id => {
    return this.http.get(`country/${id}/cities`);
  };

  getStates = id => {
    return this.http.get(`country/${id}/states`);
  };

  getCityByState = id => {
    return this.http.get(`state/${id}/cities`);
  };

  getDataByUrl = url => {
    return this.http.get(url);
  };
}
export default new SharedService();
