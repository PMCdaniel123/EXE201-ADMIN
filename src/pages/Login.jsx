import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginHandler = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      const { access_token: token } = response;

      Cookies.set("token", token, { expires: 1 });
      toast.success("Login successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login failed: ", error);
      toast.error("Login failed! Please try again");
    }
  };

  return (
    <form
      className="min-h-[420px] flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-10 gap-4 text-gray-800"
      onSubmit={handleSubmit(loginHandler)}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl">
        <Title text1="SIGN" text2="IN" />
      </div>

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800"
        required
        {...register("email", { required: "Email is required" })}
      />
      {errors.username && (
        <p style={{ color: "red" }}>{errors.username.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
        required
        {...register("password")}
      />

      <div className="w-full flex justify-between text-sm mt-[2px]">
        <p className="cursor-pointer">Forgot your password?</p>
        <p className="cursor-pointer">Create account</p>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-br from-[#4A5942] to-[#9d905a] text-white font-medium px-8 py-[10px] mt-2 w-full hover:bg-gray-800"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
