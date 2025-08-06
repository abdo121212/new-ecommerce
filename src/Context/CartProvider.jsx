import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState(null);

  const token = localStorage.getItem("token");

  async function addProductToCart(productId) {
    const waitingToast = toast.loading(
      "Adding product to your cart... Please wait.",
      { position: "bottom-right" }
    );

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product added to your cart successfully!", {
          position: "bottom-right",
        });
        getProductToCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart. Please try again.",
        { position: "bottom-right" }
      );
    } finally {
      toast.dismiss(waitingToast);
    }
  }
  async function getProductToCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductFromCart({ rmProductID }) {
    const removeProduct = toast.loading(
      "Removing product from your cart... Please wait.",
      { position: "bottom-right" }
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${rmProductID}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
        toast.success("Product removed from your cart successfully!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);

    } finally {
      toast.dismiss(removeProduct);
    }
  }
  async function clearAllCart() {
    const clearAll = toast.loading("Clearing your cart... Please wait.",{position : "bottom-right"});
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo({
          numOfCartItems: 0,
        });
        toast.success("Your cart has been successfully cleared!",{position : "bottom-right"});
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to clear the cart. Please try again."
      );
    } finally {
      toast.dismiss(clearAll);
    }
  }

  async function updateProductCount({ productID, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProductToCart,
        removeProductFromCart,
        clearAllCart,
        updateProductCount,
        cartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
