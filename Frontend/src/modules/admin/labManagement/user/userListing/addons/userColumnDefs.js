export const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

export const columnDefs = actionParam => {
  return [
    {
      headerName: 'Test Type',
      field: 'testType',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Service Type',
      field: 'serviceType',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Test Fee Amount',
      field: 'feesAmount',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Fee Tax',
      field: 'feesTax',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Currency',
      field: 'currency',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Payment Mode',
      field: 'paymentMode',
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
