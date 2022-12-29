import {
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Button,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
// date
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";

// webcame
// modal
import CameraModal from "./CameraModal";
import { addMember } from "../../services";
import axios from "axios";
const membershipsPlans = {
  oneMonth: 1,
  twoMonth: 2,
};

const AddMemberForm = ({ setModalOpen, fetchMembers }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(
    membershipsPlans.oneMonth
  );
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(() => {
    const currentMonth = new Date();
    return new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
  });

  useEffect(() => {
    const currentMonth = new Date(startDate);
    const monthValue = selectedMembership === membershipsPlans.oneMonth ? 1 : 2;
    const newDate = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + monthValue)
    );
    setEndDate(newDate);
  }, [startDate, selectedMembership]);

  useEffect(() => {
    // auto generate the total amount
    const amount =
      selectedMembership === membershipsPlans.oneMonth ? 1500 : 2500;
    setTotalAmount(amount);
  }, [selectedMembership]);

  // amount left
  useEffect(() => {
    const amountLeft = Number(totalAmount) - Number(paidAmount);
    setAmountLeft(amountLeft);
  }, [paidAmount, totalAmount]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    // const photoToUplad =
    try {
      setLoadingUpload(true);
      const formData = new FormData();
      const customId = crypto.randomUUID();
      let newPhoto
      let blob
      if (typeof photo === "object") {
         blob = photo?.slice(0, photo?.size, photo?.type);
         newPhoto = new File(
          [blob],
          customId + "." + photo.name.substr(photo.name.lastIndexOf(".") + 1),
          { type: photo?.type }
        );
        
      } else if (typeof photo === "string") {
        console.log(photo)
        
        //  newPhoto = new File(
        //   [blob],
        //   customId + "." + photo.name.substr(photo.name.lastIndexOf(".") + 1),
        //   { type: photo?.type }
        // );

    
      }

      formData.append("photoUpload", newPhoto);
      formData.append("photo", newPhoto.name);
      formData.append("id", customId);
      formData.append("fullName", fullName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("totalAmount", totalAmount);
      formData.append("paidAmount", paidAmount);
      formData.append("amountLeft", amountLeft);
      formData.append(
        "membership",
        selectedMembership === membershipsPlans.oneMonth
          ? "1 month"
          : "2 months"
      );

      await addMember(formData);
    } catch (error) {
      console.log(error);
    }
    setLoadingUpload(false);
    setModalOpen(false);
    fetchMembers();
    onCancel()
  }

  function onCancel() {
    setSelectedMembership(membershipsPlans.oneMonth);
    setFullName("");
    setPhoneNumber("");
    setPaidAmount(0);
    setPhoto(null);
    setModalOpen(false);
  }

  const matches = useMediaQuery("(min-width:750px)");
  return (
    <Box sx={{ overflowY: "scroll", maxHeight: "80vh" }}>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <FormGroup>
          <Stack
            gap={3}
            direction={matches ? "row" : "column"}
          >
            <Stack flex={0.7} mt={"1.1rem"}>
              <PhotoPicker value={photo} onChange={setPhoto} />
              <Button
                onClick={() => setShowCamera(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  my: "1rem",
                  mt: "1.8rem",
                }}
                variant={"contained"}
              >
                Take a photo <CameraAltIcon sx={{ ml: "10px" }} />
              </Button>

              {showCamera && (
                <CameraModal
                  setpicture={setPhoto}
                  open={showCamera}
                  setOpen={setShowCamera}
                />
              )}
              <CustomInput
                value={fullName}
                onChange={setFullName}
                label={"Full Name"}
              />
              <CustomInput
                type="number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                label={"Phone Number"}
              />
            </Stack>

            <Stack flex={1}>
              <FormControl sx={{ my: "1rem" }} fullWidth>
                <InputLabel id="plan">Plan</InputLabel>
                <Select
                  labelId="plan"
                  label="Plan"
                  value={selectedMembership}
                  onChange={(e) => {
                    setSelectedMembership(e.target.value);
                  }}
                >
                  <MenuItem value={membershipsPlans.oneMonth}>
                    One Month
                  </MenuItem>
                  <MenuItem value={membershipsPlans.twoMonth}>
                    Two Months
                  </MenuItem>
                </Select>
              </FormControl>

              <CustomInput
                type={"number"}
                value={paidAmount}
                onChange={setPaidAmount}
                startAdornment={
                  <InputAdornment position="start">DZ</InputAdornment>
                }
                label={"Paid"}
              />

              <CustomInput
                type="number"
                value={totalAmount}
                onChange={setTotalAmount}
                startAdornment={
                  <InputAdornment position="start">DZ</InputAdornment>
                }
                label={"Total"}
              />

              <CustomInput
                type={"number"}
                onChange={setAmountLeft}
                value={amountLeft}
                startAdornment={
                  <InputAdornment position="start">DZ</InputAdornment>
                }
                disabled
                label={"Amount Left"}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  renderInput={(params) => (
                    <TextField sx={{ my: "1rem" }} {...params} />
                  )}
                />
                <MobileDatePicker
                  sx={{ my: "1rem" }}
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  disabled
                  onChange={(value) => setEndDate(value)}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ my: "1rem" }} />
                  )}
                />
              </LocalizationProvider>

              <Stack gap={2} direction={"row"} justifyContent={"flex-end"}>
                <Button onClick={onCancel} variant="outlined">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loadingUpload}
                  variant="contained"
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </FormGroup>
      </form>
    </Box>
  );
};

function CustomInput({
  type = "text",
  label,
  value,
  onChange,
  startAdornment,
  ...props
}) {
  return (
    <FormControl variant="standard" sx={{ my: "1rem" }}>
      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target?.value)}
        InputProps={{
          startAdornment: startAdornment ? startAdornment : null,
        }}
        label={label}
        variant="standard"
        {...props}
      />
    </FormControl>
  );
}
function PhotoPicker({ value, onChange }) {
  const imageSource = useCallback(() => {
    if (value == null || value == undefined) return "http://localhost:3001/photos/avatar.svg";
    if (typeof value === "string") return value;
    if (typeof value === "object") return URL.createObjectURL(value);
  }, [value, onChange]);
  return (
    <Button
      sx={{
        position: "relative",
        borderRadius: "100%",
        width: "150px",
        height: "150px",
        mx: "auto",
      }}
      variant="outlined"
      component="label"
    >
      <Box sx={{ position: "absolute", inset: "0" }}>
        <Box
          component={"img"}
          sx={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
          src={imageSource()}
          alt="person"
        />

        <ImageIcon
          sx={{
            position: "absolute",
            top: "80%",
            left: "80%",
            scale: "1.2",
          }}
        />
      </Box>
      <input
        type="file"
        name="photo"
        onChange={(e) => onChange(e.target.files[0])}
        hidden
      />
    </Button>
  );
}

export default AddMemberForm;
