import { Box, Button } from "@mui/material";
import { formatDate } from "./utils/formatDate";
export const PLANS = {
  oneMonth: 1,
  twoMonth: 2,
};

export const DATE_FORMATE = "medium"; // "long","full","short"

export const TIME_BEFORE_SEND_NOTIFICATION_OPTIONS = [
  {
    label: "in 1 Day",
    valueInDays: 1,
  },
  {
    label: "in 2 Days",
    valueInDays: 2,
  },
  {
    label: "in 3 Days",
    valueInDays: 3,
  },
  {
    label: "in 4 Days",
    valueInDays: 4,
  },
  {
    label: "in 5 Days",
    valueInDays: 5,
  },
  {
    label: "in 6 Days",
    valueInDays: 6,
  },
  {
    label: "in 7 Days",
    valueInDays: 7,
  },
];

export const GRID_TABLE_COLS = [
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
                : "http://localhost:3001/photos/avatar.svg"
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
    field: "status",
    headerName: "Status",
    minWidth: 150,
    type: "boolean",
    // valueGetter: ({ value }) => value && formatDate(value),
    renderCell: (params) => {
      const active = false
      console.log(params)
      return <Button variant="contained" color={active?"success":"error"}>
        {active?"Active":"Inactive"}
      </Button>
    },
    align: "center",
    headerAlign: "left",

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
