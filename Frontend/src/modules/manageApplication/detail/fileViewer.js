import React, { Fragment } from 'react';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import ManageApplicationSerivce from '../services/manage.service';

const FileViewer = props => {
  const { data } = props;

  const save = url => {
    saveAs(url, data.name);
  };

  const view = url => {
    window.open(url);
  };

  const getFile = async (isSave = false) => {
    const payload = {
      fileName: data.path,
    };

    ManageApplicationSerivce.getFile(payload)
      .then(response => {
        if (response && response.data && response.data.link) {
          // eslint-disable-next-line
          isSave ? save(response.data.link) : view(response.data.link);
        }
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <div>
        <Button
          onClick={() => {
            getFile(true);
          }}
        >
          download here
        </Button>

        <Button
          onClick={() => {
            getFile();
          }}
        >
          View File
        </Button>
      </div>
    </Fragment>
  );
};

export default FileViewer;
