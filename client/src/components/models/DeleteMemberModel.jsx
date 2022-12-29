import React from 'react'
import DefaultModal from './DefaultModal'
const DeleteMemberModel = ({open,setOpen}) => {
  return (
    <DefaultModal customStyles={ {}} modalHeaderTitle={"Delete A member"} open={open} setOpen={setOpen}>
      Form of deleting a member
    </DefaultModal>
  )
}

export default DeleteMemberModel