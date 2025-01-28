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

const ReactTable = ({ enableExportAndPrint, columns,loading, data,pageSize, ...props }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
      loading={loading} 
      // slots={{ toolbar: GridToolbar }}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
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
