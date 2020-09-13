import API, { contentType } from '../../../api';
import { API_BASE_URL3 } from '../../../config';
import { GET_MANAGE_APPLICATION_SERVICE } from '../../../api/endpoints';

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
}
export default new ManageApplicationSerivce();
