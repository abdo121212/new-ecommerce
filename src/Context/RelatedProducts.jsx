import axios from "axios";
import { createContext, useState } from "react";

export const RelatedContext = createContext();

const RelatedProducts = ({ children }) => {
  const [relatedProduct, setRelatedProduct] = useState(null);
  async function getRelatedProducts(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
      );

      setRelatedProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RelatedContext.Provider value={{ relatedProduct, getRelatedProducts }}>
      {children}
    </RelatedContext.Provider>
  );
};

export default RelatedProducts;
