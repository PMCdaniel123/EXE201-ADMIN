import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { FloatButton } from "antd";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./layouts/PrivateRoute";
import SunBlog from "./pages/SunBlog";
import Blog from "./pages/Blog";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const location = useLocation();

  const showNavBarAndFooter = location.pathname !== "/";

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gradient-to-br from-[#4A5942] to-[#9d905a]">
      <div
        className="relative inset-0 bg-fixed bg-center"
        style={{
          backgroundImage: "url('/frontend_assets/vertical_bg.jpg')",
        }}
      >
        <div className="absolute inset-0 mix-blend-plus-darker bg-white opacity-[0.85]"></div>
        <div className="relative w-full min-h-screen px-10 z-10">
          <ToastContainer />
          {showNavBarAndFooter && <ScrollToTop />}
          {<NavBar />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/blogs"
              element={
                <PrivateRoute>
                  <SunBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/blogs/:blogId"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
          </Routes>
          {<Footer />}
          {showNavBarAndFooter && <FloatButton.BackTop />}
        </div>
      </div>
    </div>
  );
}

export default App;
