import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import DefaultModal from "./DefaultModal";
export default function Camera({ open, setOpen,setpicture }) {
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  // const [deviceId, setDeviceId] = useState({});
  // const [devices, setDevices] = useState([]);

  // const handleDevices = useCallback(
  //   (mediaDevices) =>
  //     setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
  //   [setDevices]
  // );

  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices);
  // }, [handleDevices]);

  return (
    <DefaultModal
      open={open}
      modalHeaderTitle={"take a photo"}
      setOpen={setOpen}
    >
      <Stack>
        {/* <FormControl sx={{ my: "1rem" }} fullWidth>
          <InputLabel id="Devices">Devices</InputLabel>
          <Select
            labelId="Devices"
            label="Plan"
            value={deviceId}
            // onChange={(e) => {
            //   setDeviceId(e.target.value);
            // }}
          >
            {devices.map((device) => (
              <MenuItem key={device.kind} value={device.id} onChange={()=>setDeviceId(device.id)}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Webcam
          style={{ borderRadius: "1rem", margin: "1rem auto" }}
          audio={false}
          screenshotFormat="image/jpeg"
          height={400}
          width={400}
     
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <Button
              onClick={() => {
                const imageSrc = getScreenshot();
                setpicture(imageSrc)
              }}
              sx={{fontWeight:"bold",textTransform:"none"}}
              variant="contained"
            >
              Capture photo
            </Button>
          )}
        </Webcam>
      </Stack>
    </DefaultModal>
  );
}


    
      //  const url = "data:image/png;base6....";
      //  fetch(url)
      //    .then((res) => res.blob())
      //    .then((blob) => {
      //      const file = new File([blob], "File name", { type: "image/png" });
      //    });
        
      // const imageSrc = webcamRef.current.getScreenshot();
      // const blob = await fetch(imageSrc).then((res) => res.blob());
      // const formData = new FormData();

      // formData.append("images", blob);
