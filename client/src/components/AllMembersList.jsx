import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material"

const cols = [
  {
    field: "photo",
    headerName: "Photo",
    width: 180,
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
  { field: "fullName", headerName: "Full name", width: 180 },
  { field: "phoneNumber", headerName: "Phone number", width: 120 },
  {
    field: "startDate",
    headerName: "Start date",
    width: 160,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "endDate",
    headerName: "End date",
    width: 160,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "totalAmount",
    headerName: "Total amount",
    width: 120,
    type: "number",
  },
  { field: "paidAmount", headerName: "Paid", width: 120, type: "number" },
  {
    field: "amountLeft",
    headerName: "Amount left",
    width: 120,
    type: "number",
  },
  {
    field: "membership",
    headerName: "Membership plan",
    width: 140,
  },

  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
];
const AllMembersList = ({ members = [] }) => {

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      

      <DataGrid
        rows={members}
        columns={cols}
        pageSize={5}
        rowHeight={150}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default AllMembersList;
