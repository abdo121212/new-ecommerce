import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { useContext } from "react";
import { ProductsContext } from "../Context/Products";
import Loading from "../Pages/Loading";
import { WishListContext } from "../Context/WishListContext";
import { CartContext } from "../Context/CartProvider";
import { Link } from "react-router-dom";

const ProductsItem = ({ search }) => {
  const { addProductToCart } = useContext(CartContext);
  const { data, isLoading } = useContext(ProductsContext);
  const { addProductsWishList } = useContext(WishListContext);
  if (isLoading) return <Loading />;

  const filterData = data?.data.data.filter((ele) => {
    return ele.title.toLowerCase().includes(search);
  });

  document.querySelectorAll(".star-rating").forEach((el) => {
    el.style.setProperty("--rating", el.dataset.rating);
  });

  return (
    <article className="">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterData?.map(
          ({
            imageCover,
            id,
            title,
            category,
            description,
            price,
            ratingsAverage,
          }) => (
            <div
              key={id}
              className=" shadow-lg hover:shadow-2xl flex flex-col items-center rounded-b-2xl group cursor-pointer duration-300"
            >
              <div className="relative w-full flex  justify-center ">
                <img src={imageCover} alt={title} width={150} fetchPriority="high" height={2} />

                <div className="layer-icons">
                  <div
                    onClick={() => addProductsWishList(id)}
                    className="div-icons"
                  >
                    <AiOutlineHeart className="style-icons" size={25} />
                  </div>
                  <div className="div-icons">
                    <CgShoppingCart
                      onClick={() => {
                        addProductToCart(id);
                      }}
                      className="style-icons"
                      size={25}
                    />
                  </div>
                  <Link to={`/ProductDetails/${id}`} className="div-icons">
                    <HiOutlineEye className="style-icons" size={25} />
                  </Link>
                </div>
              </div>
              <div className=" space-y-2 p-4">
                <h3 className="text-main ">{category.name}</h3>
                <h4 className="text-xl font-medium line-clamp-2">{title}</h4>
                <h5 className="line-clamp-1 text-gray-500 text-sm">
                  {description}
                </h5>
                <div className="flex items-center justify-between">
                  <h4>{price} LGP</h4>
                  <div className="flex  items-center gap-1">
                    <span
                      className="star-rating text-2xl"
                      data-rating={`${ratingsAverage}`}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </article>
  );
};

export default ProductsItem;
