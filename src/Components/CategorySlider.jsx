import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Loading from "../Pages/Loading";
import { useQuery } from "@tanstack/react-query";
export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["homeCategory"],
    queryFn: getCategories,
    refetchOnMount: false,
  });

  console.log(data);

  if (isLoading) return <Loading />;
  return (
    <>
      {data.data.data ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="z-10"
        >
          {data.data.data.map(({ _id, image, name }) => (
            <SwiperSlide className="cursor-pointer " key={_id}>
              <div className="flex flex-col items-center justify-center py-5">
                <img
                  src={image}
                  className="w-[150px] h-[150px] object-cover mb-2"
                  alt={name}
                />
                <h3 className="text-center text-lg font-medium">{name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loading />
      )}
    </>
  );
}
