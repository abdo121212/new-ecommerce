import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const WishListContext = createContext(null);

export default function WhishListProvider({ children }) {
  const [productWishlist, setProductWishlist] = useState(null);
  const [checkProduct, setCheckProduct] = useState(false);

  async function addProductsWishList(productId) {
    const toastLoad = toast.loading(
      "Adding product to your wishlist... Please wait.",
      { position: "bottom-right" }
    );
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Product added to your wishlist successfully!", {
          position: "bottom-right",
        });
        getLoggedUserWishlist();
        setCheckProduct(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastLoad, { position: "bottom-right" });
    }
  }

  async function getLoggedUserWishlist() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      let { data } = await axios.request(options);
      setProductWishlist(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProductFromWishlist({ productId }) {
    const removeProduct = toast.loading(
      "Removing product from your wishlist... Please wait.",
      { position: "bottom-right" }
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        getLoggedUserWishlist();
        toast.success("Product removed from your wishlist successfully!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(removeProduct);
    }
  }

  function checkedProduct(productId) {
    if (!productWishlist || !productWishlist.data) return false;
    const productInfo = productWishlist.data.find(
      (productFind) => productFind._id === productId
    );
    return productInfo;
  }
  return (
    <WishListContext.Provider
      value={{
        addProductsWishList,
        getLoggedUserWishlist,
        productWishlist,
        deleteProductFromWishlist,
        checkProduct,
        checkedProduct,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
