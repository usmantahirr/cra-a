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
      <div className="doc-mainholder">
        <div className="doc-holder">
          <i>
            <img src="/assets/img/icon-files.svg" alt="" />
          </i>
          <strong>Passport.pdf</strong>
        </div>
        <div className="doc-btnholder">
          <Button
            onClick={() => {
              getFile(true);
            }}
          >
            <i>
              <img src="/assets/img/icon-sdownload.svg" alt="" />
            </i>
            <span>Download</span>
          </Button>

          <Button
            onClick={() => {
              getFile();
            }}
          >
            <i>
              <img src="/assets/img/icon-view.svg" alt="" />
            </i>
            <span>View</span>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default FileViewer;
