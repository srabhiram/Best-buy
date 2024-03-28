import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import SimilarCart from "./SimilarCart";
import { addtocart } from "../services/store/actions";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { SklProductDetails } from "./Skeleton/SklProductDetails";
import { auth } from "../Authentication/Firebase";
import Rating from "./Rating";

export const ProductDetails = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const isUser = auth?.currentUser?.displayName || "";
    const userExist = () => {
      if (isUser === "") {
        navigate("/");
      }
    };
    userExist();
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [navigate]);

  const productinfo = useSelector((state) => state?.singleProduct);
  const { title, id, image, description, price, rating, category } =
    productinfo || [];
  const handleCart = (id, title, image, rating, price, category) => {
    dispatch(addtocart(id, title, image, rating, price, category));
    navigate("/cart");
  };
  return (
    <Fragment>
      <Navbar />
      {loader ? (
        <SklProductDetails />
      ) : (
        <main className=" bg-gray-100 flex flex-col md:pt-3 max-sm:pt-1 items-center justify-center   ">
          {productinfo && (
            <>
              <main key={id} className=" px-4 pt-2 bg-white md:w-5/6 pb-9 ">
                <div className="grid md:grid-cols-2 items-center gap-0 w-4/5 ">
                  <div className="mx-lg:flex items-center m-5 border justify-center p-4 rounded-md  ">
                    <img
                      src={image}
                      width={350}
                      alt=""
                      className=" rounded-md border-gray-300 object-contain h-60 w-60 block m-auto p-2"
                    />
                  </div>
                  <div className=" text-slate-700 px-3">
                    <h1 className="font-sans text-2xl font-medium">{title}</h1>
                    <p className="flex gap-1">
                      <Rating value={rating.rate} /> <span>{rating.rate}</span>
                    </p>
                    <p className=" font-medium text-3xl">$ {price}</p>
                    <div className="mt-6 text-lg   lg:flex lg:items-center max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center  sm:w-full gap-4">
                      <button className="border  max-sm:text-xl  max-sm:w-full border-gray-500 rounded-sm font-medium px-2 py-1 hover:bg-slate-600 focus:bg-slate-800  hover:text-white focus:ease-in-out cursor-pointer focus:scale-105">
                        Buy now
                      </button>
                      <button
                        className="flex max-sm:w-full max-sm:text-xl max-sm:mt-1 justify-center items-center gap-2 border border-gray-500 rounded-sm font-medium px-2 py-1 hover:bg-slate-600 cursor-pointer focus:bg-slate-800 hover:text-white focus:text-white"
                        onClick={() => {
                          handleCart(id, title, image, rating, price, category);
                        }}
                      >
                        Add to cart
                        <FaCartPlus />
                      </button>
                    </div>
                    <div className=" text-slate-600">
                      <p className="font font-medium text-lg mt-4">
                        About the product:
                      </p>
                      <article>{description}</article>
                    </div>
                  </div>
                </div>
              </main>
            </>
          )}
          <SimilarCart />
        </main>
      )}
    </Fragment>
  );
};
