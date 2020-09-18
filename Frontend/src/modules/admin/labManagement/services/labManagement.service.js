import API, { contentType } from '../../../../api';

class LabManagementService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: 'https://ph-admin-portal.azurewebsites.net/api/',
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
}
export default new LabManagementService();
