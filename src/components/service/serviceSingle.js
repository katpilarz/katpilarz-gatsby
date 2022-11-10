import React from "react"
import {useState} from "react"
import Banner from "../globalSections/banner";
import SectionContact from "../globalSections/sectionContact";
import ServiceSingleGallery from "./serviceSingleGallery";
import SectionAbout from "../globalSections/sectionAbout";
import ServiceSingleFAQs from "./serviceSingleFAQs";
import ServiceSingleMarque from "./serviceSingleMarque";
import AnimatedBtn from "../globalComponents/animatedBtn";
import Media from 'react-media';






const ServiceSingle = ({ service, contact, faqs }) => {

  const [isHome] = useState(false)
   
  return (

      <>
        <Banner title={service.title} image={service.image} video={service.video}/>
        <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />   
        <SectionAbout section={service.sectionDetails}/>
        <ServiceSingleMarque />
        <ServiceSingleGallery projects={service.relatedProjects}/>
        <ServiceSingleFAQs  faqs={faqs}/>
        <SectionContact section={contact}/>
      </>
      
  );
};

export default ServiceSingle;