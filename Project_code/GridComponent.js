import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab, Button } from '@mui/material';

const columns = [
  { field: 'Sl_no', headerName: 'Sl No', width: 100 },
  { field: 'CUSTOMER_ORDER_ID', headerName: 'Customer Order ID', width: 200 },
  { field: 'SALES_ORG', headerName: 'Sales Org', width: 150 },
  { field: 'DISTRIBUTION_CHANNEL', headerName: 'Distribution Channel', width: 200 },
  { field: 'COMPANY_CODE', headerName: 'Company Code', width: 150 },
  { field: 'ORDER_CREATION_DATE', headerName: 'Order Creation Date', width: 200 },
  { field: 'ORDER_CURRENCY', headerName: 'Order Currency', width: 150 },
  { field: 'CUSTOMER_NUMBER', headerName: 'Customer Number', width: 150 },
  { field: 'AMOUNT_IN_USD', headerName: 'Amount in USD', width: 150 },
  { field: 'ORDER_AMOUNT', headerName: 'Order Amount', width: 150 },
];

function GridComponent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/h2h_final_project/DataLoadingServlet');
      if (response.ok) {
        const data = await response.json();
        setRows(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ...

const handleSelectionChange = (selection) => {
  const selectedRowId = selection.selectionModel.length === 1 ? selection.selectionModel[0] : null;
  setSelectedRow(selectedRowId);
};

// ...


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRefreshData = () => {
    fetchData();
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      const selectedRowData = rows.find((row) => row.Sl_no === selectedRow);
      const customerOrderId = selectedRowData.CUSTOMER_ORDER_ID;
  
      // Send HTTP request to EditServlet
      fetch(`http://localhost:8080/EditServlet?CUSTOMER_ORDER_ID=${customerOrderId}`)
        .then((response) => {
          if (response.ok) {
            // Perform desired action upon successful edit
            alert(`Editing row with CUSTOMER_ORDER_ID: ${customerOrderId}`);
          } else {
            console.error(`Error editing row with CUSTOMER_ORDER_ID ${customerOrderId}: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error('Error editing row:', error);
        });
    } else {
      alert('Please select a single row to edit.');
    }
  };
  

  const handleDelete = async () => {
    if (selectedRow !== null) {
      const confirmDelete = window.confirm('Are you sure you want to delete the selected row?');
      if (confirmDelete) {
        const selectedRowData = rows.find((row) => row.Sl_no === selectedRow);
        const customerOrderId = selectedRowData.CUSTOMER_ORDER_ID;
  
        try {
          const response = await fetch(`http://localhost:8080/DeleteServlet?CUSTOMER_ORDER_ID=${customerOrderId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            // Remove the deleted row from the state
            setRows((prevRows) => prevRows.filter((row) => row.Sl_no !== selectedRow));
          } else {
            console.error(`Error deleting row with CUSTOMER_ORDER_ID ${customerOrderId}: ${response.status}`);
          }
        } catch (error) {
          console.error('Error deleting row:', error);
        }
      }
    } else {
      alert('Please select a row to delete.');
    }
  };
  
  

  const handlePredict = () => {
    // Handle predict functionality
  };

  return (
    <div>
      <h2>Section 1: Grid</h2>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Homepage" />
        <Tab label="Add data" />
        <Tab label="Analytics view" />
        <Tab label="Search and Advance Search" />
      </Tabs>

      {selectedTab === 0 && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedRow !== null ? [selectedRow] : []}
            getRowId={(row) => row.Sl_no}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10 }}>
            <Button variant="outlined" onClick={handleRefreshData}>Refresh Data</Button>
            <Button
  variant="outlined"
  onClick={handleEdit}
  style={{ marginLeft: 10 }}
  disabled={selectedRow === null || selectedRow.length !== 1}
>
  Edit
</Button>

<Button
  variant="outlined"
  onClick={handleDelete}
  style={{ marginLeft: 10 }}
>
  Delete
</Button>


            <Button variant="outlined" onClick={handlePredict} style={{ marginLeft: 10 }}>Predict</Button>
          </div>
        </div>
      )}

      {selectedTab === 1 && <div>Add data tab content</div>}
      {selectedTab === 2 && <div>Analytics view tab content</div>}
      {selectedTab === 3 && <div>Search and Advance Search tab content</div>}
    </div>
  );
}

export default GridComponent;
