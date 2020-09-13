export const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

export const columnDefs = actionParam => {
  return [
    {
      headerName: 'Application Name',
      field: 'applicant_name',
    },
    {
      headerName: 'Lab Name',
      field: 'lab_name',
    },
    {
      headerName: 'Test Date',
      field: 'test_date',
    },
    {
      headerName: 'Test Result',
      field: 'test_result',
    },
    {
      headerName: 'Application Status',
      field: 'application_status',
      cellRenderer: 'StatusRendrer',
    },
    {
      headerName: 'Service Type',
      field: 'service_type',
      hide: true,
    },
    {
      headerName: 'Source Country',
      field: 'source_country',
      hide: true,
    },
    {
      headerName: 'Source State',
      field: 'source_state',
      hide: true,
    },
    {
      headerName: 'Source City',
      field: 'source_city',
      hide: true,
    },
    {
      headerName: 'Destination Country',
      field: 'destination_country',
      hide: true,
    },
    {
      headerName: 'Destination City',
      field: 'destination_city',
      hide: true,
    },
    {
      headerName: 'Passport Number',
      field: 'passport_number',
      hide: true,
    },
    {
      headerName: 'NIC Number',
      field: 'nic_number',
      hide: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      hide: true,
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
