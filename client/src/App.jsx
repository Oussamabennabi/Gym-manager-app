
import "./styles.css"
import AddMemberModel from './components/models/AddMemberModel';
import EditMemberModel from './components/models/EditMemberModel';
import DeleteMemberModel from './components/models/DeleteMemberModel';

import AllMembersList from './components/AllMembersList';
import MemberInfo from './components/MemberInfo';
import Navbar from './components/Navbar'
import { useCallback, useEffect, useState } from 'react'
import { addMember, getAllMembers } from './services'
import axios from 'axios'




function App() {

  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [deleteMemberModalOpen, setDeleteMemberModalOpen] = useState(false);

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

      <AllMembersList members={allMembers} />
      {/* <MemberInfo /> */}

      <AddMemberModel
        open={addMemberModalOpen}
        setOpen={setAddMemberModalOpen}
        fetchMembers={fetchMembers}
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
