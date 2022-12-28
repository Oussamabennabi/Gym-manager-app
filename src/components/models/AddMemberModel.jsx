import React from "react";
import DefaultModal from "./DefaultModal"
const AddMemberModel = ({ open, setOpen }) => {
  return (
    // <Modal
    //   sx={styles.modalContainer}
    //   open={open}
    //   keepMounted
    //   onClose={() => setOpen(false)}
    //   aria-labelledby="add member modal"
    //   aria-describedby="modal for adding new members"
    // >
      
    //   <Box sx={styles.modalBox}>
    //     <Box>
    //     <Typography variant="h5" sx={{fontWeight:"bold"}}>Add Member</Typography>
    //       {/* <CloseIcon */}
          
    //     </Box>
    //   </Box>
    // </Modal>
    <DefaultModal modalHeaderTitle={"Add A member"} open={open} setOpen={setOpen}>
      Form of adding a member
    </DefaultModal>
  );
};

export default AddMemberModel;
