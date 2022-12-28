import React from "react";
import DefaultModal from "./DefaultModal"
import AddMemberForm from "./AddMemberForm";
const AddMemberModel = ({ open, setOpen }) => {
  return (
    <DefaultModal
      modalHeaderTitle={"Add A Member"}
      open={open}
      setOpen={setOpen}
    >
      <AddMemberForm setModalOpen={setOpen} />
    </DefaultModal>
  );
};

export default AddMemberModel;
