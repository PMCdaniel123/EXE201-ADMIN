import axiosInstance from "../utils/axiosInstance";

export const DeleteProduct = async (id) => {
  console.log(id);
};

export const GetProductsAmount = async () => {
  const data = await axiosInstance.get("/products");
  return data.data.length;
};

export const GetCustomersAmount = async () => {
  const data = await axiosInstance.get("/users");
  return data.data.length;
};

export const GetBlogsAmount = async () => {
  const data = await axiosInstance.get("/news");
  return data.data.length;
};

export const GetOrdersAmount = async () => {
  const data = await axiosInstance.get("/orders");
  return data.data.length;
};

export const GetOrders = async () => {
  const data = await axiosInstance.get("/orders");
  return data.data;
};
