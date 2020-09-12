// import API, { contentType } from '../../../api';
import axios from 'axios';
import { GET_JSON_SCHEMA } from '../../../api/endpoints';
import { mergeObjects } from '../../../shared/utilities';

class DashboardService {
  // constructor() {
  //   this.http = new API({
  //     headers: { contentType: contentType.json },
  //     baseURL: './' // API_AUTH_BASE_URL,
  //   });
  // }

  // getJsonSchema = () => {
  //   return this.http.get(GET_JSON_SCHEMA);
  // };

  getJsonSchema = () => {
    return axios.get(`./${GET_JSON_SCHEMA}`);
  };

  saveDraft = formData => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mergeObjects(formData));
      }, 2000);
    });
  };
}
export default new DashboardService();
