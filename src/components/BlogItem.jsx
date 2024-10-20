import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

// eslint-disable-next-line react/prop-types
const BlogItem = ({ title, image, description, category, id }) => {
  return (
    <div className=" bg-white border hover:scale-105 hover:shadow-xl">
      <Link to={`/sunblog/${id}`}>
        <img
          src={image}
          alt=""
          className="w-full h-[96] border-b cursor-pointer"
        />
      </Link>
      <p className="ml-5 mt-5 p-1 inline-block bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-black">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">
          {description}
        </p>
        <Link
          to={`/sunblog/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center text-gray-500"
        >
          Read more <img src={assets.breadcrum_icon} alt="" className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
