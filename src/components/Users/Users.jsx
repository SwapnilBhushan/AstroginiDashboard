import { Box, Button, Typography, colors, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../Theme/Theme";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Header from "../Header/Header";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const Users = ({ users }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "index", headerName: "#", width: 80 },
    { field: "_id", headerName: "User ID", hide: true, width: 200 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Joining Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerAlign: "center",
      align: "left",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="50%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            backgroundColor={colors.greenAccent[600]}
          >
            {role === "user" && <VerifiedOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Enabled
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows = users.map((user, index) => ({
    ...user,
    index: index + 1,
  }));

  const string = `Total Users ${users.length}`;

  return (
    <Box m="20px">
      <Header title="User" subtitle={string} />
      <Box m="40px 0 0 0" height="75vh">
        {users.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[2]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        ) : (
          <Typography>No data found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Users;
