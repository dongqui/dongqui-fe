import axios from "axios";

export const login = async () => {
  const res = await axios.post('/login')
  return res?.data?.data;
}