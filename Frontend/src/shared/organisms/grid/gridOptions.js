import StatusRendrer from '../../molecules/cellComponents/status/index';
import ActionMenuRendrer from '../../molecules/cellComponents/actionMenu/index';

const defaultGridOptions = {
  //   columnDefs: columnDefs(actionClick),
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
  //   sideBar: true,
  pagination: true,
  paginationPageSize: 10,
};

const createGridOptions = (options = {}, override = false) => {
  // columnDefs are mandatory
  if (override) {
    return options;
  }
  return {
    ...defaultGridOptions,
    ...options,
  };
};

const defaultFrameworkComponentsOptions = {
  StatusRendrer,
  ActionMenuRendrer,
};

const createFrameworkComponentsOptions = (components = {}, override = false) => {
  if (override) {
    return components;
  }
  return {
    ...defaultFrameworkComponentsOptions,
    ...components,
  };
};

export default { createGridOptions, createFrameworkComponentsOptions };
