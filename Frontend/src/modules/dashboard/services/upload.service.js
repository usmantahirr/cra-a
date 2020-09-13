import axios from 'axios';
import API, { contentType } from '../../../api';
import { API_BASE_URL } from '../../../config';
import { FILE_UPLOAD } from '../../../api/endpoints';

class UploadService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL,
    });
  }

  createContainer = payload => {
    return this.http.post(FILE_UPLOAD, payload);
  };

  uploadFile = (payload, url) => {
    const options = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/octet-stream',
      },
    };
    const formData = new FormData();
    formData.append('file', payload);
    return axios.post(url, formData, options);
  };
}
export default new UploadService();
