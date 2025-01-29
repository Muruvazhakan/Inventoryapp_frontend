import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar
} from "@mui/x-data-grid";
import { Box } from "@mui/material";


import "./ReactTable.css";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport 
  //      excelOptions={{
    
  // }}
  />
    </GridToolbarContainer>
  );
};

const ReactTable = ({ enableExportAndPrint, columns,loading, data,pageSize,totalQuantity,totalPrice, ...props }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
      loading={loading} 
      
      // components={{
      //   Footer: () => (
      //     <div style={{ padding: 10, background: '#f5f5f5', textAlign: 'right' }}>
      //       <strong>Total Quantity:</strong> {totalQuantity} | <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      //     </div>
      //   ),
      // }}

        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
          aggregation: {
            model: {
              profit: 'sum',
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        slots={{ toolbar: enableExportAndPrint  ? GridToolbar  : CustomToolbar }}
        {...props}

       
        
      />
    </Box>
  );
};

export default ReactTable;
