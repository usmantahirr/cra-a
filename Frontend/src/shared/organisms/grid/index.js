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
      className="ag-theme-alpine custom-table"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div className="custom-columns">
        <div className="column-btnbox">
          <button type="button" className="ag-side-button-button">
            <div className="ag-side-button-icon-wrapper">
              <span className="ag-icon" unselectable="on">
                <img src="/assets/img/icon-column.svg" alt="" />
              </span>
              <span className="ag-side-button-label">Columns</span>
            </div>
          </button>
        </div>
        <div className="column-options">
          <h5 className="column-title">Column Options</h5>
          <GroupBox
            {...columnsSelected}
            options={columnsOptions}
            handleChange={handleFormGroupChange}
            className="small-buttons"
          />
        </div>
      </div>

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
