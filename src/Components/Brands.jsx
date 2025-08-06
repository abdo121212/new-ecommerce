import { FaTags } from "react-icons/fa";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../Pages/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModelBrand from "./ModelBrand";

export default function Brands() {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  async function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  async function getBrandById(id) {
    try {
      setLoading(true);
      setShowModel(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setBrand(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let { data, isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getAllBrands,
    staleTime: 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Brands - Freshcart</title>
        <meta
          name="description"
          content="Discover top brands available at Freshcart. Shop from leading brands in various categories."
        />
        <meta
          name="keywords"
          content="Brands, Freshcart, Shopping, Top Brands, Online Store"
        />
        <meta property="og:title" content="Brands - Freshcart" />
        <meta
          property="og:description"
          content="Explore a diverse selection of brands at Freshcart and find the best deals on products from your favorite brands."
        />
      </Helmet>

      <section className=" bg-gray-50 py-10 p-4 container px-10 mx-auto">
        <div className="flex  items-center  text-main p-10 gap-x-2.5">
          <FaTags size={40} className="animate-bounce" />

          <h1 className="text-3xl md:text-5xl font-bold   pb-4 ">Top Brands</h1>
        </div>

        <div className="brands grid grid-cols-12 gap-6 container mx-auto ">
          {data.data.data.map(({ _id, image, name }) => (
            <div
              onClick={() => {
                getBrandById(_id);
                setShowModel(true);
              }}
              key={_id}
              className="card text-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-40 object-contain mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
            </div>
          ))}

          {showModel && (
            <ModelBrand
              loading={loading}
              setShowModel={setShowModel}
              brand={brand}
            />
          )}
        </div>
      </section>
    </>
  );
}
