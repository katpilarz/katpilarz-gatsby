import * as React from "react"
import * as styles from "./serviceSingleGallery.module.scss";
import GalleryHeader from "../globalComponents/galleryHeader";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';
import { navigate } from 'gatsby';
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);








const ServiceSingleGallery = ({ projects }) => {

  const swiperContainer = useRef(null);


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: swiperContainer.current,
          start: "top 80%",
          end: "top 40%",
          scrub:1, 
          repeatRefresh: true,
          toggleActions: "restart pause none none",
        }
      });
        tl.from(swiperContainer.current, {
            duration: 1,
            ease: "power4.out",
            css: {
              autoAlpha: 0,
              opacity:0,
              xPercent:'30',
        }})
  
    }, swiperContainer); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

  return (

      <div className={styles.gallerySwiper}>
          <div className='container'>
            <GalleryHeader header='Related Projects'/>
          </div>
          <Swiper ref={swiperContainer}  className={styles.swiper}
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