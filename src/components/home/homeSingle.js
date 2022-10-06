import * as React from "react"
import HomeBanner from "./homeBanner";
import SectionFeaturedProjects from "./sectionFeaturedProjects";
import SectionFocus from "./sectionFocus";
import SectionAbout from "./sectionAbout";
import SectionServices from "./sectionServices";
import SectionTestimonial from "../../components/global/sectionTestimonial";
import SectionContact from "./sectionContact";
import SectionGallery from "./sectionGallery";





// markup
const HomeSingle = ({ home, site, services, testimonialProject, featuredProjects, galleryMockups  }) => {

 

  return (
    <div>
      <HomeBanner name={site.name} title={site.title} images={galleryMockups}/>
      <SectionFocus section={home.sectionFocus} header={home.banner.header}/>
      <SectionFeaturedProjects featuredProjects={featuredProjects}/>
      <SectionAbout section={home.sectionAbout}/>
      <SectionServices services={services}/>
      <SectionTestimonial testimonial={testimonialProject.node._rawTestimonial} pageName='home' name={testimonialProject.node.title}
       image={testimonialProject.node.socialMediaImage} services={testimonialProject.node.services}
       slug={testimonialProject.node.slug.current} />
      <SectionGallery section={home.sectionGallery}/>
      <SectionContact section={home.sectionContact}/>
    </div>
  )
}

export default HomeSingle
