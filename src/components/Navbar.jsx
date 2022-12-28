import { Button } from '@mui/material'
import React from 'react'

const Navbar = ({ setAddMemberModalOpen }) => {
  return (
    <div>
      <Button onClick={() => setAddMemberModalOpen(true)} variant="contained">
        Add Member
      </Button>
    </div>
  );
};

export default Navbar