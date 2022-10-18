import * as React from "react"
import HomeSingleBanner from "./homeSingleBanner";
import HomeSingleFocus from "./homeSingleFocus";
import HomeSingleBtn from "./homeSingleBtn";
import HomeSingleFeatured from "./homeSingleFeatured";
import HomeSingleFeaturedVideo from "./homeSingleFeaturedVideo";
import SectionAbout from "../globalSections/sectionAbout";
import HomeSingleServices from "./homeSingleServices";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionContact from "../globalSections/sectionContact";
import HomeSingleGallery from "./homeSingleGallery";





// markup
const HomeSingle = ({ home, site, services, testimonialProject, featuredProjects, galleryMockups  }) => {
  

  return (
    <>
      <HomeSingleBanner name={site.name} title={site.title} images={galleryMockups}/>
      <HomeSingleFocus section={home.sectionFocus}/>
      <HomeSingleFeatured featuredProjects={featuredProjects} />
      <HomeSingleBtn/>
      <SectionAbout section={home.sectionAbout}/>
      <HomeSingleServices services={services}/>
      <HomeSingleFeaturedVideo video={home.gallery[0]}/>
      <HomeSingleGallery gallery={home.gallery}/>
      <SectionTestimonial testimonial={testimonialProject.node._rawTestimonial} pageName='home' name={testimonialProject.node.title}
       image={testimonialProject.node.socialMediaImage} services={testimonialProject.node.services}
       slug={testimonialProject.node.slug.current} />

      <SectionContact section={home.sectionContact} pageName='home'/>
    </>
  )
}

export default HomeSingle
