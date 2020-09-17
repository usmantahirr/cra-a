import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import GridOptions from '../../../../../shared/organisms/grid/gridOptions';
import { initialState, columnDefs } from './addons/testColumnDefs';
import labSerivce from '../../services/labManagement.service';
import TestPage from '.';
import { ContextMenuCmd } from '../../../../../config';

const TestPageContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [gridReference, setGridReference] = useState(initialState);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    function Init() {
      setShowLoader(true);
      labSerivce
        .getTests(match.params.labId)
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
    // need revisit
    if (gridReference.gridApiRef) {
      if (!match.params.labId) {
        history.goBack();
      } else {
        Init();
      }
    }
  }, [gridReference]);

  // const redirectToApplicationForm = data => {
  //   // const url = ApplicationFormUrl.replace('{0}', data.applicationId);
  //   // history.push(url);
  // };

  // const redirectToDetailApplicationForm = data => {
  //   // const url = ApplicationFormDetailUrl.replace('{0}', data.applicationId);
  //   // history.push(url);
  // };

  // eslint-disable-next-line
  const actionClick = (e, type, data) => {
    e.preventDefault();
    if (type === ContextMenuCmd.edit) {
      // redirectToApplicationForm(data);
    } else if (type === ContextMenuCmd.view) {
      // redirectToDetailApplicationForm(data);
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
    <TestPage
      onGridReady={onGridReady}
      gridOptions={gridOptions}
      frameworkComponents={frameworkComponents}
      actionClick={actionClick}
      showLoader={showLoader}
      gridReference={gridReference}
    />
  );
};

export default TestPageContainer;
