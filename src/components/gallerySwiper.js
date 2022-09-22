import React from "react";
import * as styles from "./gallerySwiper.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper";
import { Link } from "gatsby"



// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';


const GallerySwiper = ({ images }) => {
  return (

      <div className={styles.gallerySwiper}>
          <Swiper className={styles.swiper}
              style={{
                "--swiper-navigation-color": "#1E8BA3",
                "--swiper-pagination-color": "#1E8BA3",
            }}
            modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
            slidesPerView="auto"
            centeredSlides={true}
            direction={"horizontal"}
            spaceBetween={100}
            grabCursor={true}
            autoplay= {{
                delay: 3000,
                disableOnInteraction: false
            }}
            /*pagination={{
                type: "progressbar",
                progressbarOpposite: true, 
                draggable: true
            }}*/
            mousewheel={true}
            keyboard={{
                enabled: true,
            }}
            speed={1000}
            effect={"fade"}
            fadeEffect= {{
              crossFade: true, 
              parallax: true,
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)} 

          > 
            {images.map((item, index) => {
              console.log({ item })
                return (
                  
                  <SwiperSlide key={index} className={styles.slideGallery}>
                     <Link to={`projects/${item.node.slug.current}`}>
                        <GatsbyImage className={styles.swiperImage}
                            image={getImage(item.node.socialMediaImage.asset.gatsbyImageData)}
                            alt={`${item.node.socialMediaImage.alt}`}
                        />
                     </Link>
                  </SwiperSlide>
                
              )
            })}
          </Swiper>
        </div>  
  )
}

export default GallerySwiper