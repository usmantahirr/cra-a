import API, { contentType } from '../../../../api';
import { API_AUTH_BASE_URL } from '../../../../config';

class LabManagementService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_AUTH_BASE_URL,
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
}
export default new LabManagementService();
