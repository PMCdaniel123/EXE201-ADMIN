import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Image, Spin } from "antd";
import { assets } from "../assets/assets";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!productId) return;
    const getProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${productId}`);
        setProductDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetail();
  }, [productId]);

  useEffect(() => {
    if (
      productDetail &&
      productDetail.images &&
      productDetail.images.length > 0
    ) {
      setImage(productDetail.images[0].image_url);
    }
  }, [productDetail]);

  return loading ? (
    <Spin />
  ) : (
    <div className="border-t border-gray-400 pt-10">
      <div className=" transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col sm:h-[640px] overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
              {productDetail?.images.map((item, index) => (
                <img
                  src={item.image_url}
                  key={index}
                  alt={productDetail.product_name}
                  className="w-[24%] sm:w-full h-32 sm:mb-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setImage(item.image_url)}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <Image
                width={"100%"}
                height={640}
                src={image}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">
              {productDetail?.product_name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_dull_icon} alt="" className="w-3" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">${productDetail?.price}</p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productDetail?.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Size</p>
              <div className="flex gap-2">
                {productDetail?.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`border-2 py-2 px-4 bg-gray-100`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 my-8">
              <p>Color</p>
              <div className="flex gap-2">
                {productDetail?.colors.map((item, index) => (
                  <button
                    key={index}
                    className={`border-2 w-10 h-10 py-2 px-4 `}
                    style={{ backgroundColor: item.color_name }}
                  ></button>
                ))}
              </div>
            </div>

            <hr className="mt-14 sm:w-4/5 bg-gray-400 h-[2px]" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex">
            <b className="border border-gray-400 px-5 py-3 text-sm">
              Description
            </b>
            <p className="border border-gray-400 px-5 py-3 text-sm">
              Reviews (122)
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-gray-400 px-6 py-6 text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              inventore esse nisi aliquam, quis, dicta aut consectetur velit
              sit, ex quos iure eaque quaerat obcaecati id totam consequuntur
              quod! Est.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              inventore esse nisi aliquam, quis, dicta aut consectetur velit
              sit, ex quos iure eaque quaerat obcaecati id totam consequuntur
              quod! Est.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
