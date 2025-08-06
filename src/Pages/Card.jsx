import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartProvider";
import { WishListContext } from "../Context/WishListContext";
import { HiOutlineEye } from "react-icons/hi";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
export default function Card({ productInfo }) {
  const {
    imageCover,
    category,
    description,
    title,
    price,
    ratingsAverage,
    id,
  } = productInfo;

  document.querySelectorAll(".star-rating").forEach((el) => {
    el.style.setProperty("--rating", el.dataset.rating);
  });
  const { addProductToCart } = useContext(CartContext);
  const { addProductsWishList } = useContext(WishListContext);
  return (
    <>
      <div
        key={id}
        className=" shadow-lg hover:shadow-2xl flex flex-col items-center rounded-b-2xl group cursor-pointer duration-300"
      >
        <div className="relative w-full flex  justify-center ">
          <img
            src={imageCover}
            alt={title}
            width={150}
            height={2}
            loading="lazy"
          />

          <div className="layer-icons">
            <div onClick={() => addProductsWishList(id)} className="div-icons">
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
          <h5 className="line-clamp-1 text-gray-500 text-sm">{description}</h5>
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
    </>
  );
}
