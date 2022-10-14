import * as React from "react"
import * as styles from "./serviceSingleGallery.module.scss";
import GalleryHeader from "../globalComponents/galleryHeader";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper";
import { navigate } from 'gatsby';



// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';



const ServiceSingleGallery = ({ projects }) => {
  return (

      <div className={styles.gallerySwiper}>
          <div className='container'>
            <GalleryHeader header='Related Projects'/>
          </div>
          <Swiper className={styles.swiper}
              style={{
                "--swiper-pagination-color": "#fff",
            }}
            modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
            slidesPerView={2}
            centeredSlides={true}
            direction={"horizontal"}
            spaceBetween={100}
            grabCursor={true}
            mousewheel={true}
            keyboard={{
                enabled: true,
            }}
            speed={1000}
            effect={"slide"}
          > 
            {projects.map((item, index) => {
                return (
                  
                  <SwiperSlide key={index} className={styles.slideGallery}>
                     <button  onClick={(e) => {
                          e.preventDefault();
                          navigate(`/projects/${item.slug.current}`);
                        }}>
                        <GatsbyImage className={styles.swiperImage}
                            image={getImage(item.socialMediaImage.asset.gatsbyImageData)}
                            alt={`${item.socialMediaImage.alt}`}
                        />
                        <GatsbyImage className={styles.swiperImageHover}
                            image={getImage(item.bannerImage.asset.gatsbyImageData)}
                            alt={`${item.bannerImage.alt}`}
                        />
                     </button>
                  </SwiperSlide>
                
              )
            })}
          </Swiper>
        </div>  
  )
}

export default ServiceSingleGallery;