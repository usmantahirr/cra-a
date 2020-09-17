export const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

export const columnDefs = actionParam => {
  return [
    {
      headerName: 'Applicant Name',
      field: 'applicant_name',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Lab Name',
      field: 'lab_name',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Test Date',
      field: 'test_date',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Test Result',
      field: 'test_result',
      cellRenderer: 'StatusRendrer',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Application Status',
      field: 'application_status',
      headerClass: 'resizable-header',
    },
    {
      headerName: 'Service Type',
      field: 'service_type',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Source Country',
      field: 'source_country',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Source State',
      field: 'source_state',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Source City',
      field: 'source_city',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Destination Country',
      field: 'destination_country',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Destination City',
      field: 'destination_city',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Passport Number',
      field: 'passport_number',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'NIC Number',
      field: 'nic_number',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      headerClass: 'resizable-header',
      hide: true,
    },
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'ActionMenuRendrer',
      cellRendererParams: {
        actionParam,
        propertyToCompare: 'application_status',
      },
      suppressFilter: true,
      suppressSorting: true,
    },
  ];
};
