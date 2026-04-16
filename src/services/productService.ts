import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // dùng json-server
});

export const getProducts = async ({ page, limit, search }: any) => {
  const res = await api.get("/products", {
    params: {
      _page: page,
      _limit: limit,
      q: search,
    },
  });

  return {
    data: res.data,
    total: Number(res.headers["x-total-count"]),
  };
};

export const createProduct = async (data: any) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: number, data: any) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};
