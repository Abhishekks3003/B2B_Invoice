import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab, Button, Dialog, DialogTitle, TextField, ButtonGroup } from '@mui/material';
//import ColumnDescription from './Component/ColumnDescription.json';

function Table() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
  const columns=[   {
    "field":"SL_No",
    "headerName":"Sl No",
    "width":180
},
    {
    "field": "CUSTOMER_NUMBER",
    "headerName": "Customer Number",
    "width": 260
  },
    {
      "field": "CUSTOMER_ORDER_ID",
      "headerName": "Customer Order ID",
      "width":260
    },
    {
      "field": "SALES_ORG",
      "headerName": "Sales Org",
      "width": 200
    },
    {
      "field": "DISTRIBUTION_CHANNEL",
      "headerName": "Distribution Channel",
      "width": 200
    },
    {
      "field": "DIVISION",
      "headerName": "Division",
      "width": 200
    },
    {
      "field": "RELEASED_CREDIT_VALUE",
      "headerName": "Released Credit Value",
      "width": 230
    },
    {
      "field": "PURCHASE_ORDER_TYPE",
      "headerName": "Purchase Order Type",
      "width": 230
    },
    {
      "field": "COMPANY_CODE",
      "headerName": "Company Code",
      "width": 230
    },
    {
      "field": "ORDER_CREATION_DATE",
      "headerName": "Order Creation Date",
      "width": 230
    },
    {
      "field": "ORDER_AMOUNT",
      "headerName": "Order Amount",
      "width": 230
    },
    {
      "field": "REQUESTED_DELIVERY_DAT",
      "headerName": "Requested Delivery Date",
      "width": 230
    },
    {
      "field": "ORDER_CURRENCY",
      "headerName": "Order Currency",
      "width": 230
    },
    {
      "field": "CREDIT_STATUS",
      "headerName": "Credit Status",
      "width": 230
    },
    
    {
      "field": "AMOUNT_IN_USD",
      "headerName": "Amount in USD",
      "width": 230
    },
    {
      "field": "UNIQUE_CUST_ID",
      "headerName": "Unique Cust ID",
      "width": 230
    }
  ]
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/h2h_final_project/DataLoadingServlet');
      if (response.ok) {
        const data = await response.json();
        const rowsWithId = data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection.selectionModel);
    console.log(selection.selectionModel);
    setIsEditButtonDisabled(selection.selectionModel.length !== 1);
    setIsDeleteButtonDisabled(selection.selectionModel.length === 0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRefreshData = () => {
    fetchData();
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedRow = rows.find((row) => row.id === selectedRows[0]);
      setSelectedRowData(selectedRow);
    }
      setOpenModal(true);
    
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handlePredict = () => {
    console.log('Predict button clicked');
  };


  const handleSave = () => {
    setOpenModal(false);
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditDialogOpen(false);
  };
  return (
    <div>
      <div>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Homepage" />
          <Tab label="Add data" />
          <Tab label="Analytics view" />
        </Tabs>
      </div>

      {selectedTab === 0 && (
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedRows}
            getRowId={(row) => row.id}
            pageSize={10} // Show 10 rows per page
            pageSizeOptions={[10, 20, 50, 100]} // Page size options
            style={{
              height: '800px',
              width: 'auto',
              backgroundColor: 'grey',
              fontSize: '20px',
              border: '7px solid orange',
              color: 'whitesmoke',
             
            }}
          />
          <div className="footer">
            <Button variant="outlined" onClick={handleRefreshData}>
              Refresh Data
            </Button>
            <Button variant="outlined" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={handlePredict}>
              Predict
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 1 && <div>Add data tab content</div>}

      {selectedTab === 2 && <div>Analytics view tab content</div>}

<Dialog open={openModal}id="Dialog">
        <DialogTitle id="Dialog-header">Edit</DialogTitle>

        <form>
          <div id="Dialog-content">
            <TextField id="outlined-basic" label="Company Code" variant="outlined" />
            <TextField id="outlined-basic" label="Order Currency" variant="outlined" />
            <TextField id="outlined-basic" label="Distribution Channel" variant="outlined" />
          </div>

          <div>
            <ButtonGroup>
              <Button variant="outlined" color="primary" onClick={handleSave}
              >
                Save
              </Button>
              <Button variant="outlined" color="primary" onClick={handleCancel}>Cancel</Button>
            </ButtonGroup>
          </div>
        </form>
</Dialog>
    </div>
  );
}

export default Table;
