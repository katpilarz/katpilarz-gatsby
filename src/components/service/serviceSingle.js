import * as React from "react"
import Banner from "../../components/global/banner";
import SectionContact from "../../components/global/sectionContact";
import ServiceSingleDetails from "./serviceSingleDetails";
import ServiceSingleGallery from "./serviceSingleGallery";




const ServiceSingle = ({ service, contact }) => {


   
  return (

      <div className="container">
        <Banner title={service.title} image={service.image} video={service.video}/>
        <ServiceSingleDetails details={service._rawDetails}/>
        <ServiceSingleGallery/>
        <SectionContact section={contact}/>
      </div>
      
  );
};

export default ServiceSingle;