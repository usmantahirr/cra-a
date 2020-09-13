import React, { useState, useEffect } from 'react';
import Header from '../../shared/molecules/header';
import CustomBreadcrumb from '../../shared/molecules/breadcrumb';
import GridOptions from '../../shared/organisms/grid/gridOptions';
import GridView from '../../shared/organisms/grid/container';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import { initialState, columnDefs } from './manageApplicationGridColDefs';
import ManageApplicationSerivce from './services/manage.service';

const ManageApplication = () => {
  const [gridReference, setGridReference] = useState(initialState);
  // eslint-disable-next-line
  const [rowDataSource, setRowDataSource] = useState([]);

  useEffect(() => {
    async function Init() {
      const { data } = await ManageApplicationSerivce.getManageApplications('asad12345');
      if (data && data.length) {
        gridReference.gridApiRef.setRowData(data);
      }
    }
    if (gridReference.gridApiRef) {
      Init();
    }
  }, [gridReference]);

  // eslint-disable-next-line
  const actionClick = (e, type, data) => {};

  const onGridReady = param => {
    param.api.sizeColumnsToFit();
    setGridReference({ gridApiRef: param.api, gridColumnApiRef: param.columnApi });
  };

  const gridOptions = GridOptions.createGridOptions({ columnDefs: columnDefs(actionClick) });
  const frameworkComponents = GridOptions.createFrameworkComponentsOptions();

  return (
    <DashboardTemplate>
      <Header pageHeader />
      <CustomBreadcrumb />
      <div className="content-scrollbar">
        <GridView
          gridApiRef={gridReference.gridApiRef}
          gridColumnApiRef={gridReference.gridColumnApiRef}
          gridOptions={gridOptions}
          frameworkComponents={frameworkComponents}
          rowDataSource={rowDataSource}
          onGridReady={onGridReady}
        />
      </div>
    </DashboardTemplate>
  );
};

export default ManageApplication;
