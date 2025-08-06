import { CgMenuMotion } from "react-icons/cg";
import { CgMenuLeftAlt } from "react-icons/cg";
import { RiHeartLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import freshCartLogo from "../assets/images/freshCart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserProvider";
import { Link, NavLink } from "react-router-dom";
import SureClose from "../Pages/SureClose";
import { WishListContext } from "../Context/WishListContext";
import { CartContext } from "../Context/CartProvider";
import { ClipLoader } from "react-spinners";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { productWishlist, getLoggedUserWishlist } =
    useContext(WishListContext);
  const { setToken } = useContext(UserContext);

  const token = localStorage.getItem("token");

  const [areYouSure, setAreYouSure] = useState(false);

  const { cartInfo, getProductToCart } = useContext(CartContext);

  const links = [
    { id: 1, name: "home" },
    { id: 2, name: "products" },
    { id: 3, name: "categories" },
    { id: 4, name: "brands" },
    { id: 5, name: "orders" },
  ];

  useEffect(() => {
    getProductToCart();
    getLoggedUserWishlist();
  });

  return (
    <>
      <nav className=" w-full px-20 max-sm:px-10 py-5 flex items-center justify-between  bg-[#f3f4f6]  p-2  relative">
        <Link to={"/"}>
          <img
            src={freshCartLogo}
            alt="logo"
            className="w-[200px] max-sm:w-[150px]"
          />
        </Link>

        {token && (
          <>
            <ul className="flex space-x-3 max-lg:hidden">
              {links.map(({ id, name }) => (
                <li key={id}>
                  <NavLink
                    to={name === "home" ? "/" : name}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold  border-b-3 border-main text-lg capitalize "
                        : "capitalize text-lg  hover:border-b-3 border-main duration-200"
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex space-x-3 max-sm:space-x-2 items-center ">
              <div className="lg:hidden flex ">
                {menu ? (
                  <CgMenuMotion
                    className="cursor-pointer "
                    onClick={() => {
                      setMenu(!menu);
                      setShowMenu(!showMenu);
                    }}
                    size={30}
                  />
                ) : (
                  <CgMenuLeftAlt
                    size={30}
                    onClick={() => {
                      setMenu(!menu);
                      setShowMenu(!showMenu);
                    }}
                    className="cursor-pointer "
                  />
                )}
              </div>

              <Link to={"/wishlist"} className="relative">
                <RiHeartLine
                  className={`cursor-pointer text-3xl max-sm:text-xl   ${
                    productWishlist && "text-main"
                  }`}
                />

                <span
                  className={`absolute -top-3 -right-2 bg-main 
               text-white rounded-2xl w-5 h-5 flex items-center justify-center`}
                >
                  {productWishlist ? (
                    productWishlist.count
                  ) : (
                    <ClipLoader size={9} color="white" />
                  )}
                </span>
              </Link>

              <Link to={"/cart"} className="relative">
                <FaShoppingCart
                  className={`cursor-pointer text-3xl max-sm:text-xl   ${
                    cartInfo && "text-main"
                  }`}
                />
                <span
                  className={`absolute -top-3 -right-2 bg-main text-white rounded-2xl w-5 h-5 flex items-center justify-center`}
                >
                  {cartInfo ? (
                    cartInfo.numOfCartItems
                  ) : (
                    <ClipLoader size={9} color="white" />
                  )}
                </span>
              </Link>

              <div className="hover:bg-red-500 w-10 h-10 flex items-center justify-center  rounded-xl">
                <FiLogOut
                  className="text-red-500  hover:text-white rounded  duration-200 cursor-pointer text-3xl max-sm:text-xl "
                  onClick={() => setAreYouSure(true)}
                />
              </div>
            </div>
          </>
        )}
        {areYouSure && (
          <SureClose setToken={setToken} setAreYouSure={setAreYouSure} />
        )}
      </nav>

      <div className="bg-gray-500 w-full h-full  z-50 ">
        {menu && (
          <div
            className="absolute top-18 left-0 w-full h-fit  bg-main
           z-50 duration-500 transition-all rounded-b-lg lg:hidden"
          >
            {links.map(({ id, name }) => (
              <li
                key={id}
                className="z-50 flex items-start justify-center  py-2"
              >
                <NavLink
                  to={name === "home" ? "/" : name}
                  onClick={() => {
                    setMenu(!menu);
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold  border-b-3 border-green-100 rounded-e-xl p-2 text-lg capitalize text-white  "
                      : "capitalize text-lg  hover:border-b-3 border-main duration-200   rounded-2xl text-white/90 "
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
