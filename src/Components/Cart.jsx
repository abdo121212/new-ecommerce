import { FaCartArrowDown } from "react-icons/fa";
import { BsBox2Fill } from "react-icons/bs";
import { Helmet } from "react-helmet";
import imageLoading from "../assets/images/Animation - 1734929112513.gif";
import { Link } from "react-router-dom";
import react, { useContext } from "react";
import { CartContext } from "../Context/CartProvider";
import CartDetails from "./CartDetails";
import Loading from "../Pages/Loading";

const Cart = () => {
  const { cartInfo, getProductToCart, clearAllCart } = useContext(CartContext);

  react.useEffect(() => {
    getProductToCart();
  }, []);
  if (cartInfo === null) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Cart - Freshcart</title>
        <meta
          name="description"
          content="View and manage the items in your cart. Secure checkout and easy payment options at Freshcart."
        />
        <meta
          name="keywords"
          content="Cart, Freshcart, Shopping Cart, Checkout, Online Store"
        />
        <meta property="og:title" content="Cart - Freshcart" />
        <meta
          property="og:description"
          content="Review the products you've added to your cart and proceed to checkout with Freshcart."
        />
      </Helmet>

      <section className="container px-10 mx-auto min-h-screen">
        <div className="p-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-5 text-main  pb-2 flex items-center gap-2 ">
            <span>
              <BsBox2Fill size={25} className="animate-pulse text-main " />
            </span>
            Shopping Cart
          </h1>
          {cartInfo.numOfCartItems !== 0 ? (
            <div className="flex flex-col space-y-5 p-5">
              <div className="space-y-8 ">
                {cartInfo.data.products.map((product) => (
                  <CartDetails cartInfo={product} key={product._id} />
                ))}
              </div>
              <div className="flex justify-center  mb-8 sm:justify-between items-center flex-wrap p-4 gap-3">
                <p className="font-medium text-lg md:text-xl">
                  Your Total Cart Price{" "}
                  <span className="font-bold text-main">
                    ${cartInfo?.data.totalCartPrice}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      clearAllCart();
                    }}
                    className=" text-white  bg-red-700 flex items-center  p-3 rounded-xl hover:bg-red-500 duration-300  cursor-pointer "
                  >
                    Clear All
                  </button>
                  <Link to="/checkout">
                    <button className=" text-white  bg-main flex items-center  p-3 rounded-xl hover:bg-main/85 duration-300  cursor-pointer ">
                      <FaCartArrowDown className="group-hover/parent:animate-none  animate-bounce mr-2  h-5 w-5 duration-300 transition-[animate]" />
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <main className="bg-slate-100 min-h-64 w-[1400px] flex items-center justify-center flex-col rounded-2xl p-10 gap-y-3.5">
                <img src={imageLoading} alt="imageLoading" loading="lazy" width={100} />
                <h2 className="sm:text-xl max-lg:text-sm ">
                  <span className="font-bold  ">Oops!</span>
                  Your cart is empty. Start shopping now by clicking the button
                  below and find something you love!
                </h2>
                <Link
                  to={"/"}
                  className="bg-main px-3 py-2 rounded-xl text-white text-xl max-lg:text-sm "
                >
                  Back To Home
                </Link>
              </main>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
