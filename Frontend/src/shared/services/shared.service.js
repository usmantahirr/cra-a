import API, { contentType } from '../../api';
import { API_BASE_URL } from '../../config';
import { GET_COUNTRIES, GET_CITIES_BY_STATE, GET_STATES_BY_COUNTRY } from '../../api/endpoints';

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
    return this.http.get(GET_CITIES_BY_STATE, id);
  };

  getStates = id => {
    return this.http.get(GET_STATES_BY_COUNTRY, id);
  };
}
export default new SharedService();
