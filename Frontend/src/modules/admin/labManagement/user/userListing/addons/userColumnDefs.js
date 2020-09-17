export const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

export const columnDefs = actionParam => {
  return [
    {
      headerName: 'Lab Name',
      field: 'labId.name',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'User Name',
      field: 'userName',
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
