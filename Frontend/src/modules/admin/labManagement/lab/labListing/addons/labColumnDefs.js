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
      headerName: 'Country',
      field: 'countryFullName',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'City',
      field: 'city',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Lab Address',
      field: 'address',
      headerClass: 'resizable-header',
      tooltip: params => params.value,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Email',
      field: 'email',
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
