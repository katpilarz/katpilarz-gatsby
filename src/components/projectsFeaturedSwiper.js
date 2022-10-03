import React from "react";
import * as styles from "./projectsFeaturedSwiper.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper";
import { Link } from "gatsby"
import ProjectBanner from "./projectBanner";



// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';


const ProjectsFeaturedSwiper = ({ featuredProjects }) => {
  return (

      <div className={`${styles.sectionFeatured} container`}>
          <span className="text-uppercase">Latest Projects</span>
          <Swiper className={styles.projectSwiper} watchSlidesProgress={true}
            modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
            slidesPerView={1}
            centeredSlides={true}
            direction={"vertical"}
            spaceBetween={500}
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
                     <Link to={`projects/${project.node.slug.current}`}>
                      <ProjectBanner project={project.node}/>
                     </Link>
                  </SwiperSlide>
                
              )
            })}
          </Swiper>
        </div>  
  )
}

export default ProjectsFeaturedSwiper