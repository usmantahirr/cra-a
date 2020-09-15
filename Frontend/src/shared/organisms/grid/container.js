import React, { useState } from 'react';
import GridView from './index';

const GridViewContainer = ({
  onGridReady,
  gridOptions,
  frameworkComponents,
  rowDataSource,
  gridApiRef,
  gridColumnApiRef,
}) => {
  const [columnsSelected, setColumnsSelected] = useState(
    Object.fromEntries(gridOptions.columnDefs.map(x => [x.headerName, false]))
  );
  const columnsOptions = gridOptions.columnDefs.filter(x => x.hide).map(x => x.headerName);

  const showHideColumns = (columnName, isVisible) => {
    const columns = gridColumnApiRef.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === columnName)[0];
    gridColumnApiRef.setColumnVisible(valueColumn, isVisible);

    const allColumnIds = [];
    columns.forEach(column => {
      allColumnIds.push(column.colId);
    });

    if (columnsSelected) {
      const keys = Object.keys(columnsSelected);
      let count = 0;
      keys.forEach(key => {
        if (columnsSelected[key]) {
          count += 1;
        }
      });
      if (count > 3) {
        gridColumnApiRef.autoSizeColumns(allColumnIds, false);
      } else {
        gridApiRef.sizeColumnsToFit();
      }
    }
  };

  const handleFormGroupChange = ({ target: { label, checked } }) => {
    setColumnsSelected({ ...columnsSelected, [label]: checked });
    showHideColumns(label, checked);
  };

  return (
    <GridView
      onGridReady={onGridReady}
      gridOptions={gridOptions}
      frameworkComponents={frameworkComponents}
      rowDataSource={rowDataSource}
      columnsSelected={columnsSelected} // marking checkboxes selected, if is for groupbox
      columnsOptions={columnsOptions} // for populating columns to dynamically show hide columns, it is for groupbox
      handleFormGroupChange={handleFormGroupChange} // for columns filter
    />
  );
};

export default GridViewContainer;
