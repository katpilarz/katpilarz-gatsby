import React from "react";
import * as styles from "./sectionFeaturedProjects.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"



// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';


const SectionFeaturedProjects = ({ featuredProjects }) => {
  return (

      <div className={`${styles.sectionFeatured} container`}>
          <span className="text-uppercase">Latest Projects</span>
          <Swiper className={styles.projectSwiper} watchSlidesProgress={true}
            modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
            slidesPerView={1}
            centeredSlides={true}
            direction={"vertical"}
            spaceBetween={100}
            grabCursor={true}
            mousewheel={true}
            keyboard={{
                enabled: true,
            }}
            speed={1000}
            effect={"slide"}
            fadeEffect= {{
              crossFade: true, 
              parallax: true,
            }}

          > 
            {featuredProjects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className={styles.projectSwiperSlide}>
                     <Link to={`projects/${project.node.slug.current}`} className={styles.projectSwiperSlideContainer}>
                        <div  className={styles.projectSwiperSlideHeader}>
                            <p  className="text-uppercase">{project.node.overview}</p>
                            <h2 className="project-header">{project.node.title}</h2>
                        </div>
                        <GatsbyImage className={styles.projectSwiperSlideImage}
                          image={getImage(project.node.bannerImage.asset.gatsbyImageData)}
                          alt={`${project.node.bannerImage.alt}`}
                        />
                     </Link>
                  </SwiperSlide>
                
              )
            })}
          </Swiper>
        </div>  
  )
}

export default SectionFeaturedProjects