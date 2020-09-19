import API, { contentType } from '../../../../api';
import { API_BASE_URL_ADMIN_PORTAL } from '../../../../config';
import { GET_LAB_GROUP, GET_LABS, GET_TESTS, GET_USERS } from '../../../../api/endpoints';

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

  createLab = payload => {
    return this.http.post('lab', payload);
  };

  updateLabOrganization = payload => {
    return this.http.put('lab-org', payload);
  };

  updateLab = payload => {
    return this.http.put('lab', payload);
  };

  getLabOrganizations = () => {
    return this.http.get('lab-org');
  };

  getLabOrganizationById = id => {
    return this.http.get('lab-org', id);
  };

  getLabById = id => {
    return this.http.get('lab', id);
  };

  getLabOrganizationByLookup = () => {
    return this.http.get('lab-org/lookup/name');
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

  getUsers = id => {
    return this.http.get(GET_USERS, id);
  };

  getTests = id => {
    return this.http.get(GET_TESTS, id);
  };
}
export default new LabManagementService();
