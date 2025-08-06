import { FaLayerGroup } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Pages/Loading";

const Category = () => {
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    refetchOnMount: false,
  });


  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex gap-x-3 container mx-auto px-10 p-10">
        <FaLayerGroup className="text-main animate-bounce z-30" size={40} />

        <h4 className="text-main text-4xl font-semibold">Explore Categories</h4>
      </div>
      <section className="grid grid-cols-12 mb-8 gap-4 container px-10 mx-auto p-10 ">
        {data.data.map(({ image, name , _id }) => (
          <div key={_id} className="cursor-pointer category text-center rounded-md overflow-hidden shadow-md col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 ">
            <div className="h-64">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="content-body p-3 text-2xl text-main">{name}</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Category;
