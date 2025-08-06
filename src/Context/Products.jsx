import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useState } from "react";

export const ProductsContext = createContext(null);
const ProductsProvider = ({ children }) => {
  // const [searchedData, setSearchedData] = useState(null);
  const [status, setStatus] = useState();

  async function getData() {
    const data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    return data;
  }

  let { data, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: getData,
    refetchOnMount: false,
  });

  function handleFilter(state) {
    data?.data.data.sort((a, b) =>
      state === "low"
        ? a.price - b.price
        : state === "high"
        ? b.price - a.price
        : data.data.data
    );
  }

  return (
    <ProductsContext.Provider
      value={{
        data,
        isLoading,
        status,
        setStatus,
        handleFilter,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
