import { CgClose } from "react-icons/cg";
import Loading from "../Pages/Loading";
import { useEffect } from "react";

const ModelBrand = ({ setShowModel, brand, loading }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="fixed to-0 left-0 right-0 bottom-0 bg-black/70 w-full h-full flex items-center justify-center ">
          <div className="bg-white w-[700px] h-[300px] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-main text-2xl font-bold">{brand.name}</h4>
              <CgClose
                size={30}
                onClick={() => {
                  setShowModel(false);
                }}
                className="hover:text-red-700 duration-200 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center">
              <img src={brand.image} alt={brand.name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelBrand;
