import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useHistory } from 'react-router-dom';
import GridOptions from '../../../../../shared/organisms/grid/gridOptions';
import { initialState, columnDefs } from './addons/labColumnDefs';
import labSerivce from '../../services/labManagement.service';
import LabPage from '.';
import { ContextMenuCmd } from '../../../../../config';

const LabContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [gridReference, setGridReference] = useState(initialState);
  // const history = useHistory();

  useEffect(() => {
    function Init() {
      setShowLoader(true);
      labSerivce
        .getLabs()
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
      Init();
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
    <LabPage
      onGridReady={onGridReady}
      gridOptions={gridOptions}
      frameworkComponents={frameworkComponents}
      actionClick={actionClick}
      showLoader={showLoader}
      gridReference={gridReference}
    />
  );
};

export default LabContainer;
