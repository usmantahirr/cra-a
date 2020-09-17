import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Header from '../../shared/molecules/header';
// import CustomBreadcrumb from '../../shared/molecules/breadcrumb';
import GridOptions from '../../shared/organisms/grid/gridOptions';
import GridView from '../../shared/organisms/grid/container';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import { initialState, columnDefs } from './manageApplicationGridColDefs';
import ManageApplicationSerivce from './services/manage.service';
import { ContextMenuCmd, ApplicationFormUrl, ApplicationFormDetailUrl } from '../../config';
import CustomSpinner from '../../shared/atoms/spinner';

const ManageApplication = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [gridReference, setGridReference] = useState(initialState);
  const history = useHistory();
  // const [t, i18n] = useTranslation();
  // eslint-disable-next-line
  // const [rowDataSource, setRowDataSource] = useState([]);

  useEffect(() => {
    function Init() {
      setShowLoader(true);
      const user = JSON.parse(localStorage.getItem('user')).id; // NEED REFECTOR
      ManageApplicationSerivce.getManageApplications(user)
        .then(data => {
          const response = data.data || [];
          gridReference.gridApiRef.setRowData(response);
          setShowLoader(false);
        })
        .catch(() => {
          gridReference.gridApiRef.setRowData([]);
          setShowLoader(false);
        });
    }
    try {
      // need revisit
      if (gridReference.gridApiRef) {
        Init();
      }
      // eslint-disable-next-line
    } catch (error) {
      setShowLoader(false);
    }
  }, [gridReference]);

  const redirectToApplicationForm = data => {
    const url = ApplicationFormUrl.replace('{0}', data.applicationId);
    history.push(url);
  };

  const redirectToDetailApplicationForm = data => {
    const url = ApplicationFormDetailUrl.replace('{0}', data.applicationId);
    history.push(url);
  };

  const actionClick = (e, type, data) => {
    e.preventDefault();
    if (type === ContextMenuCmd.edit) {
      redirectToApplicationForm(data);
    } else if (type === ContextMenuCmd.view) {
      redirectToDetailApplicationForm(data);
    }
  };

  const onGridReady = param => {
    param.api.hideOverlay();
    param.api.sizeColumnsToFit();
    setGridReference({ gridApiRef: param.api, gridColumnApiRef: param.columnApi });
  };

  const gridOptions = GridOptions.createGridOptions({ columnDefs: columnDefs(actionClick) });
  const frameworkComponents = GridOptions.createFrameworkComponentsOptions();

  return (
    <DashboardTemplate>
      <Header pageHeader />
      {/* <CustomBreadcrumb /> */}
      {showLoader ? <CustomSpinner /> : ''}
      <div className="content-scrollbar">
        <GridView
          gridApiRef={gridReference.gridApiRef}
          gridColumnApiRef={gridReference.gridColumnApiRef}
          gridOptions={gridOptions}
          frameworkComponents={frameworkComponents}
          // rowDataSource={rowDataSource}
          onGridReady={onGridReady}
        />
      </div>
    </DashboardTemplate>
  );
};

export default ManageApplication;
