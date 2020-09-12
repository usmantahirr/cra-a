// import API, { contentType } from '../../../api';
import axios from 'axios';
import { GET_JSON_SCHEMA } from '../../../api/endpoints';

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
}
export default new DashboardService();
