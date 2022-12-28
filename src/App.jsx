

import AddMemberModel from './components/models/AddMemberModel';
import EditMemberModel from './components/models/EditMemberModel';
import DeleteMemberModel from './components/models/DeleteMemberModel';

import AllMembersList from './components/AllMembersList';
import MemberInfo from './components/MemberInfo';
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'




function App() {
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [deleteMemberModalOpen, setDeleteMemberModalOpen] = useState(false);

  return (
    <div className="App">
      <Navbar
        setAddMemberModalOpen={setAddMemberModalOpen}
        setEditMemberModalOpen={setEditMemberModalOpen}
        setDeleteMemberModalOpen={setDeleteMemberModalOpen}
      />

      <AllMembersList />
      <MemberInfo />

      <AddMemberModel
        open={addMemberModalOpen}
        setOpen={setAddMemberModalOpen}
      />
      {/* <EditMemberModel
        open={editMemberModalOpen}
        setOpen={setEditMemberModalOpen}
      />
      <DeleteMemberModel
        open={deleteMemberModalOpen}
        setOpen={setDeleteMemberModalOpen}
      /> */}
    </div>
  );
}

export default App
