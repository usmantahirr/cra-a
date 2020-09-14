import axios from 'axios';

import { GET_JSON_SCHEMA, APPLICATION } from '../../../api/endpoints';
import Logger from '../../../shared/modules/logger';
import API from '../../../api';
import { API_BASE_URL3 } from '../../../config';

class DashboardService {
  constructor() {
    this.api = new API({
      baseURL: API_BASE_URL3,
    });
  }

  getJsonSchema = () => {
    return axios.get(`/${GET_JSON_SCHEMA}`);
  };

  getApplicationById = id =>
    this.api
      .get(APPLICATION, id)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  createApplication = body =>
    this.api
      .post(APPLICATION, body)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  updateApplication = (uid, body) =>
    this.api
      .put(APPLICATION, body, uid)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  saveDraft = formData => {
    Logger.info(formData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          applicationId: '575721',
        });
      }, 2000);
    });
  };
}
export default new DashboardService();
