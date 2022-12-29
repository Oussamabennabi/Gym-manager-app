import React from 'react'
import DefaultModal from './DefaultModal'
import MemberInfoCard from './MemberInfoCard'

const EditMemberModel = ({
  open,
  setOpen,
  memberId,
  setMemberId,
  fetchMembers,
}) => {
  return (
    <DefaultModal
      modalHeaderTitle={"Edit A Member"}
      open={open}
      setOpen={setOpen}
    >
      
      <MemberInfoCard
        memberId={memberId}
        setModalOpen={setOpen}
        fetchMembers={fetchMembers}
      />
    </DefaultModal>
  );
};

export default EditMemberModel