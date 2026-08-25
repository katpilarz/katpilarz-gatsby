import * as React from "react"
import * as styles from "./serviceSingleGallery.module.scss";
import AnimatedHeading from "../globalComponents/animatedHeading";
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper/modules";

// Import Swiper styles
import "swiper/css";

/*import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);*/



const ServiceSingleGallery = ({ projects }) => {

  /*const swiperContainer = useRef(null);

  useIsomorphicLayoutEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: swiperContainer.current,
          start: "top 88%",
          end: "top 50%",
          scrub:2, 
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
        }})
  
    }, swiperContainer); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);*/
  
  return (

      <div className={styles.gallerySwiper}>
          <div className='container'>
            <AnimatedHeading headerOne='How I have done it' headerTwo='for others' linkText="See All Projects" linkUrl="/projects"/>
          </div>
          <Swiper className={styles.swiper}
            modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
            slidesPerView={"auto"}
            centeredSlides={true}
            direction={"horizontal"}
            spaceBetween={0}
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
                  
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                     <Link to={`/projects/${item.slug.current}`} className={styles.swiperSlideItem}>
                        <GatsbyImage className={styles.swiperImage}
                            image={getImage(item.socialMediaImage.asset.gatsbyImageData)}
                            alt={`${item.socialMediaImage.alt}`}
                        />
                     </Link>
                  </SwiperSlide>
                
              )
            })}
          </Swiper>
        </div>  
  )
}

export default ServiceSingleGallery;