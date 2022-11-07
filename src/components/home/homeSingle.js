import * as React from "react"
import HomeSingleBanner from "./homeSingleBanner";
import HomeSingleFocus from "./homeSingleFocus";
import AnimatedBtn from "../globalComponents/animatedBtn";
import HomeSingleFeatured from "./homeSingleFeatured";
import SectionFeaturedVideo from "../globalSections/sectionFeaturedVideo";
import SectionAbout from "../globalSections/sectionAbout";
import HomeSingleServices from "./homeSingleServices";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionContact from "../globalSections/sectionContact";
import HomeSingleGallery from "./homeSingleGallery";
import Media from 'react-media';





// markup
const HomeSingle = ({ home, site, services, testimonialProject, featuredProjects, galleryMockups  }) => {
  

  return (
    <>
      <HomeSingleBanner name={site.name} title={site.title} images={galleryMockups}/>
      <HomeSingleFocus section={home.sectionFocus}/>
      
      <HomeSingleFeatured featuredProjects={featuredProjects} />
      <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn pageName="home"/>
          )}
        />
      <SectionFeaturedVideo video={home.featuredVideo}/>
      <SectionAbout section={home.sectionAbout}/>
      <HomeSingleServices services={services}/>

      <HomeSingleGallery gallery={home.gallery}/>
      <SectionTestimonial testimonial={testimonialProject.node._rawTestimonial} pageName='home' name={testimonialProject.node.title}
       image={testimonialProject.node.socialMediaImage} services={testimonialProject.node.services}
       slug={testimonialProject.node.slug.current} />

      <SectionContact section={home.sectionContact} pageName='home'/>
    </>
  )
}

export default HomeSingle
