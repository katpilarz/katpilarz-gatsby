import React from "react"
import Banner from "../globalSections/banner";
import SectionContact from "../globalSections/sectionContact";
import ServiceSingleGallery from "./serviceSingleGallery";
import SectionAbout from "../globalSections/sectionAbout";
import ServiceSingleFAQs from "./serviceSingleFAQs";
import AnimatedBtn from "../globalComponents/animatedBtn";






const ServiceSingle = ({ service, contact, faqs }) => {

   
  return (

      <>
        <Banner title={service.title} image={service.image} video={service.video}/>
        <AnimatedBtn/>
        <SectionAbout section={service.sectionDetails}/>
        <ServiceSingleGallery projects={service.relatedProjects}/>
        <ServiceSingleFAQs  faqs={faqs}/>
        <SectionContact section={contact}/>
      </>
      
  );
};

export default ServiceSingle;