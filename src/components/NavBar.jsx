import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const NavBar = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("token");
    toast.success("Logout successfully");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between py-4 font-medium">
      <Link to="/dashboard">
        <img src={assets.logo} alt="" className="w-36" />
      </Link>

      {token && (
        <ul className="hidden sm:flex gap-4 lg:gap-16 text-xs lg:text-sm text-black">
          <NavLink to="/dashboard" className="flex flex-col items-center gap-1">
            <p className="sm:text-base">DASHBOARD</p>
            <hr className="w-3/4 border-none h-[1.8px] bg-gradient-to-br from-[#4A5942] to-[#9d905a] hidden" />
          </NavLink>
          <NavLink to="/products" className="flex flex-col items-center gap-1">
            <p className="sm:text-base">PRODUCTS</p>
            <hr className="w-3/4 border-none h-[1.8px] bg-gradient-to-br from-[#4A5942] to-[#9d905a] hidden" />
          </NavLink>
          <NavLink to="/orders" className="flex flex-col items-center gap-1">
            <p className="sm:text-base">ORDERS</p>
            <hr className="w-3/4 border-none h-[1.8px] bg-gradient-to-br from-[#4A5942] to-[#9d905a] hidden" />
          </NavLink>
          <NavLink to="/customers" className="flex flex-col items-center gap-1">
            <p className="sm:text-base">CUSTOMERS</p>
            <hr className="w-3/4 border-none h-[1.8px] bg-gradient-to-br from-[#4A5942] to-[#9d905a] hidden" />
          </NavLink>
          <NavLink to="/blogs" className="flex flex-col items-center gap-1">
            <p className="sm:text-base">SUNBLOG</p>
            <hr className="w-3/4 border-none h-[1.8px] bg-gradient-to-br from-[#4A5942] to-[#9d905a] hidden" />
          </NavLink>
        </ul>
      )}

      {token && (
        <div className="flex items-center gap-6">
          <div className="group relative">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">Profile</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={logoutHandler}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
