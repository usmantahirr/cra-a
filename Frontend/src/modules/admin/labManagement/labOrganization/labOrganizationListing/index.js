import React from 'react';
import Header from '../../../../../shared/molecules/header';
import GridView from '../../../../../shared/organisms/grid/container';
import DashboardTemplate from '../../../../../shared/templates/dashboardTemplate';
import CustomSpinner from '../../../../../shared/atoms/spinner';

const LabOrgPage = props => {
  const { gridReference, gridOptions, frameworkComponents, onGridReady, showLoader } = props;
  return (
    <DashboardTemplate>
      <Header pageHeader />
      {showLoader ? <CustomSpinner /> : ''}
      <div className="content-scrollbar">
        <GridView
          gridApiRef={gridReference.gridApiRef}
          gridColumnApiRef={gridReference.gridColumnApiRef}
          gridOptions={gridOptions}
          frameworkComponents={frameworkComponents}
          // rowDataSource={rowDataSource}
          onGridReady={onGridReady}
          showSideBar={false}
        />
      </div>
    </DashboardTemplate>
  );
};

export default LabOrgPage;
