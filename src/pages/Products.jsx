import { Spin, Table } from "antd";
import Title from "../components/Title";
import { PRODUCTS_TABLE_COLUMNS } from "../constants/table-columns";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div className="border-t border-gray-400 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"ALL"} text2={"PRODUCTS"} />
      </div>
      <Table dataSource={products} columns={PRODUCTS_TABLE_COLUMNS} />;
    </div>
  );
};

export default Products;
