import React, { useState, useEffect } from 'react';
import Header from '../../shared/molecules/header';
import CustomBreadcrumb from '../../shared/molecules/breadcrumb';
import GridOptions from '../../shared/organisms/grid/gridOptions';
import GridView from '../../shared/organisms/grid/container';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';

const columnDefs = actionParam => {
  return [
    {
      headerName: 'Make',
      field: 'make',
    },
    {
      headerName: 'Model',
      field: 'model',
    },
    {
      headerName: 'Price',
      field: 'price',
      cellRenderer: 'StatusRendrer',
    },
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'ActionMenuRendrer',
      cellRendererParams: {
        actionParam,
      },
    },
  ];
};

const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

const ManageApplication = () => {
  const [gridReference, setGridReference] = useState(initialState);
  // eslint-disable-next-line
  const [rowDataSource, setRowDataSource] = useState([]);

  // eslint-disable-next-line
  const actionClick = (e, type, data) => {};

  const onGridReady = param => {
    param.api.sizeColumnsToFit();
    setGridReference({ gridApiRef: param.api, gridColumnApiRef: param.columnApi });
  };

  const gridOptions = GridOptions.createGridOptions({ columnDefs: columnDefs(actionClick) });
  const frameworkComponents = GridOptions.createFrameworkComponentsOptions();

  useEffect(() => {
    const ref = gridReference.gridApiRef;
    if (ref) {
      ref.setRowData([
        {
          make: 'Toyota',
          model: 'Celica',
          price: 35000,
        },
        {
          make: 'Ford',
          model: 'Mondeo',
          price: 32000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
      ]);
    }
  }, [gridReference]);

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
