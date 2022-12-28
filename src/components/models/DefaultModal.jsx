import React, { memo } from "react";

import { Box, Modal, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./modals.style";
const DefaultModal = ({
  open,
  setOpen,
  children,
  modalHeaderTitle,
  customStyles,
}) => {
  return (
    <Modal
      sx={{ ...styles.modalContainer, ...customStyles }}
      open={open}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby={`${modalHeaderTitle} modal`}
      aria-describedby={`${modalHeaderTitle} modals`}
    >
      <Box sx={styles.modalBox}>
        {/* modal header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {modalHeaderTitle}
          </Typography>
          <Button
            onClick={() => setOpen(false)}
            variant="text"
            sx={{
              p: 0,
              width: 40,
              minWidth: 0,
              height: 40,
              borderRadius: "50%",
            }}
          >
            <CloseIcon sx={{ p: 0, width: 25, height: 25 }} />
          </Button>
        </Box>

      {children}
      </Box>
    </Modal>
  );
}

export default DefaultModal;
