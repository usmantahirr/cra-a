import API, { contentType } from '../../../../../../api';
import { API_BASE_URL_ADMIN_PORTAL } from '../../../../../../config';
import { GET_LAB_GROUP } from '../../../../../../api/endpoints';

class LabOrganizationSerivce {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL_ADMIN_PORTAL,
    });
  }

  getLabGroups = () => {
    return this.http.get(GET_LAB_GROUP);
  };
}
export default new LabOrganizationSerivce();
