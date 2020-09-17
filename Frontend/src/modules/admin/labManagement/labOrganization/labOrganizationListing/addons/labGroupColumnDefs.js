export const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

export const columnDefs = actionParam => {
  return [
    {
      headerName: 'Lab Name',
      field: 'name',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Business Contact Name',
      field: 'businessContact.contactName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Finance Contact Name',
      field: 'financeContact.contactName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Technical Contact Name',
      field: 'technicalContact.contactName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'ActionMenuRendrer',
      cellRendererParams: {
        actionParam,
      },
      suppressFilter: true,
      suppressSorting: true,
    },
  ];
};
