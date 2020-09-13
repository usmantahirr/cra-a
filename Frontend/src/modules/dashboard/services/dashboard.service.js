import axios from 'axios';
import { GET_JSON_SCHEMA } from '../../../api/endpoints';
import Logger from '../../../shared/modules/logger';

class DashboardService {
  getJsonSchema = () => {
    return axios.get(`/${GET_JSON_SCHEMA}`);
  };

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
