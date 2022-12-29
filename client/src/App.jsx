
import "./styles.css"
import AddMemberModel from './components/models/AddMemberModel';
import EditMemberModel from './components/models/EditMemberModel';
import DeleteMemberModel from './components/models/DeleteMemberModel';

import AllMembersList from './components/AllMembersList';
import Navbar from './components/Navbar'
import { useCallback, useEffect, useState } from 'react'
import { addMember, getAllMembers } from './services'
import axios from 'axios'




function App() {

  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [deleteMemberModalOpen, setDeleteMemberModalOpen] = useState(false);
  const [memberId, setMemberId] = useState('');

  const [allMembers, setAllMembers] = useState([]);
  useEffect(() => {
    async function main() {
     fetchMembers() 
    }
    main()
  }, [])
  const fetchMembers = useCallback(async() => {
    try {
      setAllMembers(await getAllMembers());
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <div className="App" style={{}}>
      <Navbar
        setAddMemberModalOpen={setAddMemberModalOpen}
        setEditMemberModalOpen={setEditMemberModalOpen}
        setDeleteMemberModalOpen={setDeleteMemberModalOpen}
      />

      <AllMembersList
        setEditMemberModalOpen={setEditMemberModalOpen}
        setMemberId={setMemberId}
        members={allMembers}
      />

      <AddMemberModel
        open={addMemberModalOpen}
        setOpen={setAddMemberModalOpen}
        fetchMembers={fetchMembers}
      />
      <EditMemberModel
        open={editMemberModalOpen}
        setOpen={setEditMemberModalOpen}
        memberId={memberId}
        setMemberId={setMemberId}
        fetchMembers={fetchMembers}
      />
      <DeleteMemberModel
        open={deleteMemberModalOpen}
        setOpen={setDeleteMemberModalOpen}
        memberId={memberId}
        setMemberId={setMemberId}
      />
    </div>
  );
}

export default App
