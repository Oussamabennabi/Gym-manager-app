import { Button, Stack } from '@mui/material'
import React from 'react'

const Navbar = ({ setAddMemberModalOpen }) => {
  return (
    <Stack ml={1} justifyContent={"center"} alignItems={"flex-start"} sx={{height:"10vh"}}>
      <Button onClick={() => setAddMemberModalOpen(true)} variant="contained">
        Add Member
      </Button>
    </Stack>
  );
};

export default Navbar