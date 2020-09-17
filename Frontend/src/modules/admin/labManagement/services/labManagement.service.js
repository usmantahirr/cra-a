import API, { contentType } from '../../../../api';
import { API_BASE_URL_ADMIN_PORTAL } from '../../../../config';
import { GET_LAB_GROUP, GET_LABS } from '../../../../api/endpoints';

class LabManagementService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL_ADMIN_PORTAL,
    });
  }

  createLabOrganization = payload => {
    return this.http.post('lab-org', payload);
  };

  updateLabOrganization = payload => {
    return this.http.put('lab-org', payload);
  };

  getLabOrganizations = () => {
    return this.http.get('lab-org');
  };

  getLabOrganizationById = id => {
    return this.http.get('lab-org', id);
  };

  getLabOrganizationByLookup = id => {
    return this.http.get('lab-org/lookup', id);
  };

  activateDeactivateOrganization = payload => {
    return this.http.get('lab-org/active-deactive', payload);
  };

  getLabGroups = () => {
    return this.http.get(GET_LAB_GROUP);
  };

  getLabs = () => {
    return this.http.get(GET_LABS);
  };
}
export default new LabManagementService();
