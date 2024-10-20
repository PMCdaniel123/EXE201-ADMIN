import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useParams } from "react-router-dom";
import { Spin, Tag } from "antd";
import axiosInstance from "../utils/axiosInstance";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/orders/" + orderId);
        setOrderDetails(response.data.order_details);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (!loading && orderDetails.length > 0) {
      const fetchProductInfo = async () => {
        try {
          if (orderDetails.length === 0) return;

          const productReq = orderDetails.map((item) =>
            axiosInstance.get(`/products/${item.product_id}`)
          );
          const productRes = await Promise.all(productReq);
          const productData = productRes.map((response) => response.data);

          const updatedOrderDetails = orderDetails.map((item, index) => ({
            ...item,
            product: productData[index],
          }));

          setOrderItems(updatedOrderDetails);
        } catch (error) {
          console.error("Failed to fetch product info:", error);
        }
      };
      fetchProductInfo();
    }
  }, [orderDetails, loading]);

  return loading ? (
    <Spin />
  ) : (
    <div className="border-t border-gray-400 pt-4">
      <div className="mb-12">
        <Link
          to="/orders"
          className="p-2 inline-block text-white bg-gradient-to-br from-[#4A5942] to-[#9d905a]"
        >
          Back
        </Link>
      </div>

      <div className="text-2xl">
        <Title text1={"ORDER"} text2={"DETAILS"} />
      </div>

      <div className="flex flex-col mt-10 sm:flex-row items-start justify-between gap-20 w-full">
        <div className="w-full">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={item.product.images[0].image_url}
                  alt=""
                  className="w-16 sm:w-32 sm:h-32 object-cover"
                />
                <div>
                  <Link
                    to={`/product/${item?.product?.id}`}
                    className="text-xs sm:text-xl"
                  >
                    {item?.product?.product_name}
                  </Link>
                  <div className="flex items-center justify-start gap-4 mt-2">
                    <p>${item?.product?.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 h-10 w-10 border bg-slate-50 flex items-center justify-center">
                      {item?.size}
                    </p>
                    <p
                      className="px-2 sm:px-3 sm:py-1 h-10 w-10 border bg-slate-50"
                      style={{ backgroundColor: item?.color }}
                    ></p>
                  </div>
                </div>
              </div>
              <div>
                <Tag
                  color={
                    item?.status === "waiting"
                      ? "orange"
                      : item?.status === "processing"
                      ? "blue"
                      : item?.status === "shipping"
                      ? "yellow"
                      : item?.status === "successful"
                      ? "success"
                      : "orange"
                  }
                  className="text-sm px-3 py-1 rounded-sm"
                >
                  {item?.status
                    ? item?.status.charAt(0).toUpperCase() +
                      item?.status.slice(1)
                    : "waiting"}
                </Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
