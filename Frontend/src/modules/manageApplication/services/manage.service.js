import API, { contentType } from '../../../api';
import { API_BASE_URL3, API_BASE_URL } from '../../../config';
import {
  GET_MANAGE_APPLICATION_SERVICE,
  GET_MANAGE_APPLICATION_SERVICE_DETAILS,
  GET_FILE_MANAGE_APPLICATION,
} from '../../../api/endpoints';

class ManageApplicationSerivce {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: '',
    });
  }

  getManageApplications = id => {
    return this.http.get(GET_MANAGE_APPLICATION_SERVICE, id);
  };

  getManageApplicationDetail = id => {
    return this.http.get(API_BASE_URL3 + GET_MANAGE_APPLICATION_SERVICE_DETAILS, id);
  };

  getFile = model => {
    return this.http.post(API_BASE_URL + GET_FILE_MANAGE_APPLICATION, model);
  };
}
export default new ManageApplicationSerivce();
