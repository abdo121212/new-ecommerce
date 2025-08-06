import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useEffect } from "react";
import imageLoading from "../assets/images/Animation - 1734995792926.gif";
import { WishListContext } from "../Context/WishListContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsHeartFill } from "react-icons/bs";
import Loading from "../Pages/Loading";
import { CartContext } from "../Context/CartProvider";

const WishList = () => {
  const { getLoggedUserWishlist, productWishlist, deleteProductFromWishlist } =
    useContext(WishListContext);

  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist - Freshcart</title>
        <meta
          name="description"
          content="Add products to your wishlist and save your favorite items for later at Freshcart."
        />
        <meta
          name="keywords"
          content="Wishlist, Freshcart, Shopping Wishlist, Favorite Products, Online Store"
        />
        <meta property="og:title" content="Wishlist - Freshcart" />
        <meta
          property="og:description"
          content="Create and manage your wishlist on Freshcart. Save your favorite products and buy them later."
        />
      </Helmet>

      <section className="container px-10 mx-auto min-h-screen ">
        <div className="p-10 ">
          <div className="flex items-center gap-x-4">
            <BsHeartFill size={30} className="animate-pulse text-main" />

            <div className="text-2xl md:text-4xl font-bold mb-5 text-main  pb-2 flex items-center gap-2">
              My Wishlist
            </div>
          </div>

          <div
            className="my-wishlist shadow-md p-3 rounded-md bg-
           space-y-4 mb-5"
          >
            {productWishlist && productWishlist?.data.length !== 0 ? (
              productWishlist.data.map((product) => (
                <div
                  key={product.id}
                  className="flex bg-white rounded-md items-center gap-5 shadow-md p-5 relative"
                >
                  <div className="w-[100px] sm:min-w-[150px]  h-[150px] ">
                    <img
                      src={product.imageCover}
                      className="w-full h-full object-cover"
                      alt={product.title}
                    />
                  </div>
                  <div className="flex justify-between gap-3 flex-1 items-center  flex-wrap ">
                    <article className="text-sm md:text-xl">
                      <Link to="" className=" font-semibold text-main">
                        {product.title}
                      </Link>
                      <h4 className="text-main font-semibold">
                        ${product.price}
                      </h4>
                    </article>
                    <button
                      className="  md:text-lg text-sm text-white rounded-md bg-main cursor-pointer hover:bg-main px-2 py-3"
                      onClick={() => {
                        addProductToCart(product.id);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                  <div
                    onClick={() => {
                      deleteProductFromWishlist({ productId: product.id });
                    }}
                    className="size-8 absolute top-2 right-1  bg-slate-200 text-red-600 cursor-pointer
                  
                  
                  flex rounded-full items-center justify-center hover:text-slate-200 hover:bg-red-600 duration-200 transition-colors"
                  >
                    <AiOutlineCloseCircle size={30} />
                  </div>
                </div>
              ))
            ) : productWishlist?.data.length === 0 ? (
              <>
                <div className="text-center bg-slate-200 p-5">
                  <img
                    src={imageLoading}
                    alt="imageLoading"
                    className="w-24 mx-auto mb-2"
                  />
                  <p className="mb-4">
                    <b>Oops!</b> Your wishlist is empty. Start adding products
                    you love by clicking the button below!
                  </p>
                  <Link
                    to="/"
                    className="btn bg-main  text-white rounded-md text-lg px-5 py-2"
                  >
                    Back To Home
                  </Link>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishList;
