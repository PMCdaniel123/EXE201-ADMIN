import { InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-20 mb-10">
        <div className="flex justify-between items-center px-8 py-4 border border-gray-400">
          <span className="text-sm text-[#1c1c26]">© SUNSETSOIRÉE 2024</span>
          <span className="text-sm text-[#1c1c26]">
            <InstagramOutlined /> INSTAGRAM
          </span>
        </div>
      </div>

      <div>
        <hr className="border-gray-400" />
        <p className="py-5 text-sm text-center text-[#1c1c26]">
          Copyright 2024@ sunsetsoiree.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
