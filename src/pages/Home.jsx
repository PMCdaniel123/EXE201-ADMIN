import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import {
  GetBlogsAmount,
  GetCustomersAmount,
  GetOrders,
  GetOrdersAmount,
  GetProductsAmount,
} from "../constants/actions";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [productsAmount, setProductsAmount] = useState(null);
  const [customersAmount, setCustomersAmount] = useState(null);
  const [blogsAmount, setBlogsAmount] = useState(null);
  const [ordersAmount, setOrdersAmount] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedProductsAmount = await GetProductsAmount();
      const fetchedCustomersAmount = await GetCustomersAmount();
      const fetchedBlogsAmount = await GetBlogsAmount();
      const fetchedOrdersAmount = await GetOrdersAmount();
      const fetchedOrders = await GetOrders();

      setProductsAmount(fetchedProductsAmount);
      setCustomersAmount(fetchedCustomersAmount);
      setBlogsAmount(fetchedBlogsAmount);
      setOrdersAmount(fetchedOrdersAmount);
      setOrders(fetchedOrders);
    }

    fetchData();
  }, []);

  const getTotalAmountPerMonth = () => {
    const monthlyTotals = Array(12).fill(0);

    orders.forEach((order) => {
      const date = new Date(order.created_at);
      const monthIndex = date.getMonth();
      monthlyTotals[monthIndex] += parseFloat(order.total_amount);
    });

    return monthlyTotals;
  };

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Orders Amount",
        data: getTotalAmountPerMonth(),
        borderColor: "#4A5942",
        backgroundColor: "#9d905a",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Orders Amount Over Time",
      },
    },
  };

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Manage Products
          </h2>
          <p className="text-gray-600">
            Total Products: {productsAmount || "Loading..."}
          </p>
          <Link to="/products">
            <button className="mt-4 bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white px-4 py-2 rounded-md">
              Go to Products
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Manage Customers
          </h2>
          <p className="text-gray-600">
            Total Customers: {customersAmount || "Loading..."}
          </p>
          <Link to="/customers">
            <button className="mt-4 bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white px-4 py-2 rounded-md">
              Go to Customers
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Manage Blogs</h2>
          <p className="text-gray-600">
            Total Blogs: {blogsAmount || "Loading..."}
          </p>
          <Link to="/blogs">
            <button className="mt-4 bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white px-4 py-2 rounded-md">
              Go to Blogs
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Manage Orders
          </h2>
          <p className="text-gray-600">
            Total Orders: {ordersAmount || "Loading..."}
          </p>
          <Link to="/orders">
            <button className="mt-4 bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white px-4 py-2 rounded-md">
              Go to Orders
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Orders Chart</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
