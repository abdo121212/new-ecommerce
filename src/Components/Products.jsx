import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { useContext, useState } from "react";
import ProductsItem from "./ProductsItem";
import { Helmet } from "react-helmet";
import { ProductsContext } from "../Context/Products";

const Products = () => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const { handleFilter } = useContext(ProductsContext);

  return (
    <>
      <Helmet>
        <title>Home - Products</title>
        <meta
          name="description"
          content="Welcome to Freshcart. Shop the latest products from a variety of categories and enjoy fast delivery."
        />
        <meta
          name="keywords"
          content="Freshcart, Home, Shopping, Online Store, Deals"
        />
        <meta property="og:title" content="Home - Freshcart" />
        <meta
          property="og:description"
          content="Browse through a wide range of products and exclusive offers on Freshcart. Your one-stop shopping destination."
        />
      </Helmet>
      <section className="p-10">
        <div className="flex justify-center max-sm:space-x-2.5 space-x-7 items-center">
          <input
            type="search"
            value={search}
            className="w-3/4 max-md:w-1/2 mx-auto ring-2 ring-green-700 text-xl outline-none px-5 py-2 rounded-3xl"
            placeholder="Search...."
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="w-[200px] max-md:w-[150px]">
            <div
              onClick={() => {
                setShowList(!showList);
              }}
              className="border  w-full flex items-center justify-around  gap-2.5 rounded-2xl px-3 py-2 text-white bg-main cursor-pointer"
            >
              <h4 className="text-xl font-semibold">Filter </h4>
              {showList ? (
                <MdFilterAlt size={30} />
              ) : (
                <MdFilterAltOff size={30} />
              )}
            </div>

            {showList && (
              <ul className="absolute bg-white  py-2 mt-1 rounded-md shadow-lg z-50 w-[200px]">
                <li
                  className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
                  onClick={() => handleFilter("low")}
                >
                  Sort by Lowest Price
                </li>
                <li
                  className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
                  onClick={() => handleFilter("high")}
                >
                  Sort by Highest Price
                </li>
                <li
                  className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
                  onClick={() => handleFilter("all")}
                >
                  Show All Products
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="my-10">
          <ProductsItem search={search} />
        </div>
      </section>
    </>
  );
};

export default Products;
