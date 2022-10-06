import * as React from "react"
import Banner from "./banner";
import GallerySwiper from "./gallerySwiper";
import ProjectsFeaturedSwiper from "./projectsFeaturedSwiper";
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
      <Banner name={site.name} title={site.title} banner={home.banner}/>
      <GallerySwiper images={galleryMockups}/>
      <SectionFocus section={home.sectionFocus}/>
      <ProjectsFeaturedSwiper featuredProjects={featuredProjects}/>
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
