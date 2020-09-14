import API, { contentType } from '../../../api';
import { API_BASE_URL } from '../../../config';

class MapSerivces {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL,
    });
  }

  getStatesByCountry = id => {
    return this.http.get(`country/${id}/states`);
  };

  getCitiesByState = id => {
    return this.http.get(`state/${id}/cities`);
  };

  getCitiesByCountry = id => {
    return this.http.get(`country/${id}/cities`);
  };

  getLabsByCity = id => {
    return this.http.get(`city/${id}/labs`);
  };
}
export default new MapSerivces();
