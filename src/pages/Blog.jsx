import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import axiosInstance from "../utils/axiosInstance";
import { Spin } from "antd";
import { assets } from "../assets/assets";
import parse from "html-react-parser";

const Blog = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetail] = useState([
    {
      title: "",
      content: "",
      author: { name: "" },
      image_url: "",
      created_at: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/news");
        const data = response?.data || [];
        const filteredBlog = data.filter((item) => item.id === Number(blogId));
        setBlogDetail(filteredBlog);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogDetail();
  }, [blogId]);

  return !loading ? (
    <div>
      <div className="bg-gradient-to-br from-[#4A5942] to-[#9d905a] py-5 px-5 md:px-12 lg:px-28">
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-white">
            {blogDetail[0]?.title}
          </h1>
          <img
            src={assets.logo}
            alt=""
            className="w-16 h-16 mx-auto mt-10 border border-white rounded-full object-contain"
          />
          <p className="mt-2 text-lg max-w-[740px] mx-auto text-white">
            {blogDetail[0]?.author.name}
          </p>
          <p className="mt-2 pb-6 max-w-[740px] mx-auto text-gray-300 text-xs">
            {blogDetail[0]?.created_at &&
              new Date(blogDetail[0]?.created_at).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <img
          src={
            blogDetail[0]?.image_url !== "null"
              ? blogDetail[0]?.image_url
              : assets.default_blog_image
          }
          alt=""
          className="w-[800px] border-4 border-white"
        />

        <div className="mt-16 news-content">
          {parse(blogDetail[0]?.content)}
        </div>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4 text-3xl">
            <FacebookOutlined />
            <InstagramOutlined />
            <TikTokOutlined />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spin />
  );
};

export default Blog;
