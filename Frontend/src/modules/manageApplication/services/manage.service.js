import API, { contentType } from '../../../api';
import { API_BASE_URL3, API_BASE_URL } from '../../../config';
import {
  GET_MANAGE_APPLICATION_SERVICE,
  GET_MANAGE_APPLICATION_SERVICE_DETAILS,
  GET_FILE_MANAGE_APPLICATION,
  GET_LAB_BY_LAB_ID,
} from '../../../api/endpoints';

class ManageApplicationSerivce {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: '',
    });
  }

  getManageApplications = id => {
    return this.http.get(API_BASE_URL3 + GET_MANAGE_APPLICATION_SERVICE, id);
  };

  getManageApplicationDetail = id => {
    return this.http.get(API_BASE_URL3 + GET_MANAGE_APPLICATION_SERVICE_DETAILS, id);
  };

  getFile = model => {
    return this.http.post(API_BASE_URL + GET_FILE_MANAGE_APPLICATION, model);
  };

  getLabByLabId = id => {
    return this.http.get(API_BASE_URL + GET_LAB_BY_LAB_ID, id);
  };
}
export default new ManageApplicationSerivce();
