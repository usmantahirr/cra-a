import API, { contentType } from '../../../api';
import { API_BASE_URL2 } from '../../../config';
import { GET_STATES_BY_COUNTRY, GET_CITIES_BY_STATE, GET_LABS_BY_CITY } from '../../../api/endpoints';

class MapSerivces {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL2,
    });
  }

  getStatesByCountry = id => {
    return this.http.get(GET_STATES_BY_COUNTRY, id);
  };

  getCitiesByState = id => {
    return this.http.get(GET_CITIES_BY_STATE, id);
  };

  getLabsByCity = id => {
    return this.http.get(GET_LABS_BY_CITY, id);
  };
}
export default new MapSerivces();
