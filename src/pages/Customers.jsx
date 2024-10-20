import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Spin, Table } from "antd";
import Title from "../components/Title";
import { CUSTOMER_TABLE_COLUMNS } from "../constants/table-columns";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div className="border-t border-gray-400 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"ALL"} text2={"PRODUCTS"} />
      </div>
      <Table dataSource={customers} columns={CUSTOMER_TABLE_COLUMNS} />
    </div>
  );
};

export default Customers;
