import * as React from "react"
import HomeSingleBanner from "./homeSingleBanner";
import HomeSingleFocus from "./homeSingleFocus";
import HomeSingleFeatured from "./homeSingleFeatured";

import HomeSingleAbout from "./homeSingleAbout";
import HomeSingleServices from "./homeSingleServices";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionContact from "../globalSections/sectionContact";
import HomeSingleGallery from "./homeSingleGallery";





// markup
const HomeSingle = ({ home, site, services, testimonialProject, featuredProjects, galleryMockups  }) => {

 

  return (
    <div>
      <HomeSingleBanner name={site.name} title={site.title} images={galleryMockups}/>
      <HomeSingleFocus section={home.sectionFocus}/>
      <HomeSingleFeatured featuredProjects={featuredProjects} />
      <HomeSingleAbout section={home.sectionAbout}/>
      <HomeSingleServices services={services}/>
      <SectionTestimonial testimonial={testimonialProject.node._rawTestimonial} pageName='home' name={testimonialProject.node.title}
       image={testimonialProject.node.socialMediaImage} services={testimonialProject.node.services}
       slug={testimonialProject.node.slug.current} />
      <HomeSingleGallery gallery={home.gallery}/>
      <SectionContact section={home.sectionContact} pageName='home'/>
    </div>
  )
}

export default HomeSingle
