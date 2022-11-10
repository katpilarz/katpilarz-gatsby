import React from "react"
import Banner from "../globalSections/banner";
import SectionContact from "../globalSections/sectionContact";
import ServiceSingleGallery from "./serviceSingleGallery";
import SectionAbout from "../globalSections/sectionAbout";
import ServiceSingleFAQs from "./serviceSingleFAQs";
import ServiceSingleMarque from "./serviceSingleMarque";







const ServiceSingle = ({ service, contact, faqs }) => {

  
  return (

      <>
        <Banner title={service.title} image={service.image} video={service.video}/>
        <SectionAbout section={service.sectionDetails}/>
        <ServiceSingleMarque />
        <ServiceSingleGallery projects={service.relatedProjects}/>
        <ServiceSingleFAQs  faqs={faqs}/>
        <SectionContact section={contact}/>
      </>
      
  );
};

export default ServiceSingle;