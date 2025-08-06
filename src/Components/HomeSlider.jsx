import img1 from "../assets/images/slider-image-1.jpeg";
import img11 from "../assets/images/blog-img-1.jpeg";
import img12 from "../assets/images/blog-img-2.jpeg";
import img2 from "../assets/images/slider-image-2.jpeg";
import img3 from "../assets/images/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/grid";

const HomeSlider = () => {
  return (
    <section>
      <div className="flex p-10 ">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="flex-4"
        >
          <SwiperSlide>
            <img
              src={img1}
              loading="lazy"
              alt="slider"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={img11}
              loading="lazy"
              alt="slider1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={img12}
              loading="lazy"
              alt="product image1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>{" "}
        <div className="flex-2">
          <img src={img2} loading="lazy" width={500} alt="product image2" />
          <img loading="lazy" src={img3} width={500} alt="product image3" />
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
