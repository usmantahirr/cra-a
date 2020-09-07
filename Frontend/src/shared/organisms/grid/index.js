import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GroupBox from '../../modules/groupCheckbox/index';

const GridView = ({
  onGridReady,
  gridOptions,
  frameworkComponents,
  rowDataSource,
  columnsSelected,
  columnsOptions,
  handleFormGroupChange,
}) => {
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <GroupBox {...columnsSelected} options={columnsOptions} handleChange={handleFormGroupChange} />
      <AgGridReact
        gridOptions={gridOptions}
        rowData={rowDataSource}
        frameworkComponents={frameworkComponents}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
};

export default GridView;
