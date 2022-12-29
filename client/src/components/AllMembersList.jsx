import React, { useState } from "react";
import { DataGrid, GridToolbar, GridToolbarDensitySelector } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { formatDate } from "../utils/formatDate";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback } from "react"
const cols = [
  {
    field: "photo",
    headerName: "Photo",
    minWidth: 180,
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Box
            component={"img"}
            src={
              params.value != null
                ? `http://localhost:3001/photos/${params.value}`
                : "/avatar.svg"
            }
            alt="no photo"
            sx={{ mx: "auto", width: 150, height: 150, objectFit: "cover" }}
          />
        </div>
      );
    },
  },
  { field: "fullName", headerName: "Full name", minWidth: 180, flex: 1 },
  { field: "phoneNumber", headerName: "Phone number", minWidth: 140, flex: 1 },

  {
    field: "age",
    headerName: "Age",
    type: "number",
    minWidth: 90,
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "startDate",
    headerName: "Start date",
    minWidth: 150,
    type: "dateTime",
    valueGetter: ({ value }) => value && formatDate(value),
    align: "left",
    flex: 1,
  },
  {
    field: "endDate",
    headerName: "End date",
    minWidth: 150,
    type: "dateTime",
    valueGetter: ({ value }) => value && formatDate(value),
    align: "left",
    flex: 1,
  },
  {
    field: "totalAmount",
    headerName: "Total amount",
    minWidth: 120,
    type: "number",
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "paidAmount",
    headerName: "Paid",
    minWidth: 120,
    type: "number",
    headerAlign: "left",
    flex: 1,
    align: "left",
  },
  {
    field: "amountLeft",
    headerName: "Amount left",
    minWidth: 120,
    type: "number",
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "membership",
    headerName: "Membership plan",
    minWidth: 140,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
 
];
const AllMembersList = ({ members = [], setEditMemberModalOpen,setMemberId }) => {
  const newCols = useCallback(
    () => [
      ...cols,
      {
        field:"Edit",
        headerName: "Edit",
        minWidth: 140,
        align: "center",
        headerAlign: "center",
        flex: 1,
        renderCell: (params) => {
          return (
            <div>
              <Button
                onClick={() => {
                  setEditMemberModalOpen(true);
                  setMemberId(params.id)
                }}
              >
                <EditIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid
        rows={members}
        columns={newCols()}
        components={{
          Toolbar: GridToolbar,
        }}
        pageSize={5}
        rowHeight={150}
        rowSpacingType="margin"
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default AllMembersList;
