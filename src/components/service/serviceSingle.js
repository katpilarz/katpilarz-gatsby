import * as React from "react"
import Banner from "../globalSections/banner";
import SectionContact from "../globalSections/sectionContact";
import ServiceSingleDetails from "./serviceSingleDetails";
import ServiceSingleTechnologies from "./serviceSingleTechnologies";
import ServiceSingleGallery from "./serviceSingleGallery";




const ServiceSingle = ({ service, contact }) => {

   
  return (

      <>
        <Banner title={service.title} image={service.image} video={service.video}/>
        <ServiceSingleDetails section={service.sectionDetails}/>
        <ServiceSingleTechnologies technologies={service.technologies}/>
        <ServiceSingleGallery projects={service.relatedProjects}/>
        <SectionContact section={contact}/>
      </>
      
  );
};

export default ServiceSingle;