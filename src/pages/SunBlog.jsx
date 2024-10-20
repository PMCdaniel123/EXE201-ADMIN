import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Spin, Table } from "antd";
import Title from "../components/Title";
import { BLOG_TABLE_COLUMNS } from "../constants/table-columns";

const SunBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/news");
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div className="border-t border-gray-400 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"ALL"} text2={"BLOGS"} />
      </div>
      <Table dataSource={blogs} columns={BLOG_TABLE_COLUMNS} />
    </div>
  );
};

export default SunBlog;
