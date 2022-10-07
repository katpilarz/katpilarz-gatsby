import * as React from "react"
import HomeSingleBanner from "./homeSingleBanner";
import HomeSingleFocus from "./homeSingleFocus";
import HomeSingleProjects from "./homeSingleProjects";

import HomeSingleAbout from "./homeSingleAbout";
import HomeSingleServices from "./homeSingleServices";
import SectionTestimonial from "../../components/global/sectionTestimonial";
import SectionContact from "../../components/global/sectionContact";
import HomeSingleGallery from "./homeSingleGallery";





// markup
const HomeSingle = ({ home, site, services, testimonialProject, featuredProjects, galleryMockups  }) => {

 

  return (
    <div>
      <HomeSingleBanner name={site.name} title={site.title} images={galleryMockups}/>
      <HomeSingleFocus section={home.sectionFocus} header={home.banner.header}/>
      <HomeSingleProjects featuredProjects={featuredProjects}/>
      <HomeSingleAbout section={home.sectionAbout}/>
      <HomeSingleServices services={services}/>
      <SectionTestimonial testimonial={testimonialProject.node._rawTestimonial} pageName='home' name={testimonialProject.node.title}
       image={testimonialProject.node.socialMediaImage} services={testimonialProject.node.services}
       slug={testimonialProject.node.slug.current} />
      <HomeSingleGallery section={home.sectionGallery}/>
      <SectionContact section={home.sectionContact} pageName='home'/>
    </div>
  )
}

export default HomeSingle
