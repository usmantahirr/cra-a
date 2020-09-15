import API, { contentType } from '../../../api';
import { API_BASE_URL3 } from '../../../config';
import {
  GET_MANAGE_APPLICATION_SERVICE,
  GET_MANAGE_APPLICATION_SERVICE_DETAILS,
  GET_FILE_MANAGE_APPLICATION,
} from '../../../api/endpoints';

class ManageApplicationSerivce {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL3,
    });
  }

  getManageApplications = id => {
    return this.http.get(GET_MANAGE_APPLICATION_SERVICE, id);
  };

  getManageApplicationDetail = id => {
    return this.http.get(GET_MANAGE_APPLICATION_SERVICE_DETAILS, id);
  };

  getFile = id => {
    return this.http.get(GET_FILE_MANAGE_APPLICATION, id);
  };
}
export default new ManageApplicationSerivce();
