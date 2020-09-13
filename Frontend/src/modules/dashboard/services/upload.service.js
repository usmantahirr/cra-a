import axios from 'axios';
import API, { contentType } from '../../../api';
import { API_BASE_URL1 } from '../../../config';
import { FILE_UPLOAD } from '../../../api/endpoints';

class UploadService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_BASE_URL1,
    });
  }

  createBlob = payload => {
    return this.http.post(FILE_UPLOAD, payload);
  };

  uploadFile = (payload, url) => {
    const options = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/octet-stream',
      },
    };
    return axios.put(url, payload, options);
  };
}
export default new UploadService();
