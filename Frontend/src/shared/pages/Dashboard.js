import React, { useState, useEffect } from 'react';

// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import Button from '../atoms/buttons';
// import NotificationContext from '../modules/notification/context';
// import ErrorContext from '../modules/error/context';
import GridOptions from '../organisms/grid/gridOptions';
import GridView from '../organisms/grid/container';

const columnDefs = actionParam => {
  return [
    {
      headerName: 'Make',
      field: 'make',
    },
    {
      headerName: 'Model',
      field: 'model',
    },
    {
      headerName: 'Price',
      field: 'price',
      cellRenderer: 'StatusRendrer',
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

const initialState = {
  gridApiRef: null,
  gridColumnApiRef: null,
};

const Dashboard = () => {
  // const notification = useContext(NotificationContext);
  // const errorContext = useContext(ErrorContext);
  // const { t } = useTranslation();

  const [gridReference, setGridReference] = useState(initialState);
  // eslint-disable-next-line
  const [rowDataSource, setRowDataSource] = useState([]);

  // eslint-disable-next-line
  const actionClick = (e, type, data) => {};

  const onGridReady = param => {
    param.api.sizeColumnsToFit();
    setGridReference({ gridApiRef: param.api, gridColumnApiRef: param.columnApi });
  };

  const gridOptions = GridOptions.createGridOptions({ columnDefs: columnDefs(actionClick) });
  const frameworkComponents = GridOptions.createFrameworkComponentsOptions();

  useEffect(() => {
    const ref = gridReference.gridApiRef;
    if (ref) {
      ref.setRowData([
        {
          make: 'Toyota',
          model: 'Celica',
          price: 35000,
        },
        {
          make: 'Ford',
          model: 'Mondeo',
          price: 32000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
      ]);
    }
  }, [gridReference]);

  return (
    <React.Fragment>
      {/* Click it to get notification
       <Button
        type="primary"
        onClick={e => {
          e.preventDefault();
          notification.setNotification(
            {
              type: 'success',
              message: 'This is message',
            },
            true
          );
        }}
      >
        Show Notification
      </Button>
      <Button
        onClick={e => {
          e.preventDefault();
          errorContext.setError(new Error('Something happened'), true);
        }}
      >
        Show Error
      </Button> 
      <ul>
        <li>
          <Link to="/dynamic-form">New Registration</Link>
        </li>
        <li>{/* <Link to="/manageRegistration">Manage Registration</Link> </li>
      </ul>  */}
      <GridView
        gridApiRef={gridReference.gridApiRef}
        gridColumnApiRef={gridReference.gridColumnApiRef}
        gridOptions={gridOptions}
        frameworkComponents={frameworkComponents}
        rowDataSource={rowDataSource}
        onGridReady={onGridReady}
      />
    </React.Fragment>
  );
};

export default Dashboard;
