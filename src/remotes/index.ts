import axios from "axios";

export const login = async () => {
  const res = await axios.post('/login')
  return res?.data?.data;
}

export const getProducts = async (page: number | string, size: number = 10) => {
  const res = await axios.get(`/products?page=${page}&size=${size}`);
  return res.data.data;
}

export const getProduct = async (id: string) => {
  const res = await axios.get(`/products/${id}`);
  return res.data.data;  
}