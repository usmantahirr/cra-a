import React, { useEffect, useState } from 'react';
import ManageApplicationDetailView from './detail';
import { parseDetailView, getField, viewFields, data } from './mapper';
import CustomSpinner from '../../../shared/atoms/spinner';
import DashboardTemplate from '../../../shared/templates/dashboardTemplate';
import Header from '../../../shared/molecules/header';
// import ManageApplicationSerivce from '../services/manage.service';

const ManageApplicationDetailContainer = props => {
  const [viewData, setViewData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    async function Init() {
      setShowLoader(true);
      // const { data } = await ManageApplicationSerivce.getManageApplicationDetail('');
      const reponse = data;
      const mappedData = parseDetailView(reponse);
      setViewData(mappedData);
      setShowLoader(false);
    }
    try {
      Init();
    } catch (error) {
      setShowLoader(false);
    }
  }, []);

  return (
    <DashboardTemplate>
      <Header pageHeader />
      {showLoader ? <CustomSpinner /> : ''}
      <ManageApplicationDetailView viewFields={viewFields} data={viewData} getField={getField} {...props} />
    </DashboardTemplate>
  );
};

export default ManageApplicationDetailContainer;
