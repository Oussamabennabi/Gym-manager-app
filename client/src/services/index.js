import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export async function getAllMembers() {
  return await axios.get('/').then(res=>res.data)
}

export async function addMember(data) {
  return await axios.post('/addMember', data)
}

export async function deleteMember() {
  return await axios.delete("/deleteMember").then((res) => res);
}
