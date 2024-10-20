import { Spin, Table } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Title from "../components/Title";
import { ORDERS_TABLE_COLUMNS } from "../constants/table-columns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableRowKey, setEditableRowKey] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedData = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedData);
  };

  const onEditStatus = (orderId) => {
    setEditableRowKey(orderId);
  };

  const onSaveStatus = () => {
    setEditableRowKey(null);
  };

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
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
        <Title text1={"ALL"} text2={"ORDERS"} />
      </div>
      <Table
        dataSource={orders}
        columns={ORDERS_TABLE_COLUMNS({
          editableRowKey,
          handleStatusChange,
          onEditStatus,
          onSaveStatus,
        })}
      />
    </div>
  );
};

export default Orders;
