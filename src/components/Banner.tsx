import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/scss";
import "swiper/scss/autoplay";

import { useEffect, useMemo, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 584);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundBannerImages = useMemo(
    () =>
      isMobile
        ? ["Deposit-Mobile", "HappyMondays-Mobile"]
        : ["Deposit", "HappyMondays"],
    [isMobile]
  );

  return (
    <div className="flex">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3250,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log("Slide changed")}
      >
        {backgroundBannerImages.map((image, index) => {
          return (
            <SwiperSlide key={image}>
              <img
                className="w-full"
                src={`src/assets/images/${image}.png`}
                alt={`Banner image ${index}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;
