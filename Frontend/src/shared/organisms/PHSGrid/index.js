import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import PHSGroupBox from '../../modules/PHSGroupCheckbox/index';
import StatusRendrer from '../../molecules/cellComponents/status/index';
import ActionMenuRendrer from '../../molecules/cellComponents/actionMenu/index';

const GridView = () => {
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

  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const [selectedColumn, setSelectedColumn] = useState(Object.fromEntries(columnDefs().map(x => [x.headerName, true])));
  const options = columnDefs().map(x => x.headerName);

  // eslint-disable-next-line
  const actionClick = (e, type, data) => {};
  const [state] = useState({
    frameworkComponents: {
      StatusRendrer,
      ActionMenuRendrer,
    },
    gridOptions: {
      columnDefs: columnDefs(actionClick),
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: false,
        // allow every column to be pivoted
        enablePivot: false,
        sortable: true,
        filter: true,
      },
      sideBar: true,
    },
    rowData: [
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
    ],
  });

  const showHideColumns = (columnName, isVisible) => {
    // eslint-disable-next-line
    const grapi = gridApi;
    const columns = columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === columnName)[0];

    const newState = isVisible;
    columnApi.setColumnVisible(valueColumn, newState);
    // gridOptions.api.sizeColumnsToFit();
  };

  const handleFormGroupChange = ({ target: { label, checked } }) => {
    setSelectedColumn({ ...selectedColumn, [label]: checked });
    showHideColumns(label, checked);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <PHSGroupBox {...selectedColumn} options={options} handleChange={handleFormGroupChange} />

      <AgGridReact
        gridOptions={state.gridOptions}
        rowData={state.rowData}
        frameworkComponents={state.frameworkComponents}
        onGridReady={params => {
          setGridApi(params.api);
          setColumnApi(params.columnApi);
        }}
      ></AgGridReact>
    </div>
  );
};

export default GridView;
