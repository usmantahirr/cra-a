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
      isHidden: true,
    },
    {
      headerName: 'Source Country',
      field: 'source_country',
      isHidden: true,
    },
    {
      headerName: 'Source State',
      field: 'source_state',
      isHidden: true,
    },
    {
      headerName: 'Source City',
      field: 'source_city',
      isHidden: true,
    },
    {
      headerName: 'Destination Country',
      field: 'destination_country',
      isHidden: true,
    },
    {
      headerName: 'Destination City',
      field: 'destination_city',
      isHidden: true,
    },
    {
      headerName: 'Passport Number',
      field: 'passport_number',
      isHidden: true,
    },
    {
      headerName: 'NIC Number',
      field: 'nic_number',
      isHidden: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      isHidden: true,
    },
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'ActionMenuRendrer',
      cellRendererParams: {
        actionParam,
      },
    },
  ];
};
