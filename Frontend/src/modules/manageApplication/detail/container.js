import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import ManageApplicationDetailView from './detail';
import { parseDetailView, getField, viewFields } from './mapper';
import CustomSpinner from '../../../shared/atoms/spinner';
import DashboardTemplate from '../../../shared/templates/dashboardTemplate';
import Header from '../../../shared/molecules/header';
import ManageApplicationSerivce from '../services/manage.service';

const ManageApplicationDetailContainer = props => {
  const [viewData, setViewData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    async function Init() {
      setShowLoader(true);
      const { data } = await ManageApplicationSerivce.getManageApplicationDetail(match.params.appId);
      const currentLab = data && data.application_data && data.application_data.lab;
      const { data: lab = null } =
        currentLab && currentLab.labId ? await ManageApplicationSerivce.getLabByLabId(currentLab.labId) : {};
      const mappedData = parseDetailView(data, lab);
      setViewData(mappedData);
      setShowLoader(false);
    }
    try {
      if (!match.params.appId) {
        history.goBack();
      } else {
        Init();
      }
    } catch (error) {
      setShowLoader(false);
    }
  }, []);

  return (
    <DashboardTemplate>
      <Header pageHeader heading="Manage Application" />
      {showLoader ? <CustomSpinner /> : ''}
      <ManageApplicationDetailView viewFields={viewFields} data={viewData} getField={getField} {...props} />
    </DashboardTemplate>
  );
};

export default ManageApplicationDetailContainer;
