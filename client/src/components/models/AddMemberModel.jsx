import React from "react";
import DefaultModal from "./DefaultModal"
import MemberInfoCard from "./MemberInfoCard";
const AddMemberModel = ({ open, setOpen,fetchMembers }) => {
  return (
    <DefaultModal
      modalHeaderTitle={"Add A Member"}
      open={open}
      setOpen={setOpen}
    >
      <MemberInfoCard setModalOpen={setOpen}  fetchMembers={fetchMembers} />
    </DefaultModal>
  );
};
export default AddMemberModel;
