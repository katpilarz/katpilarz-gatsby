import React from "react";
import * as styles from "./sectionContact.module.scss";
import TypingEffect from "../globalComponents/typingEffect";
import { Link } from "gatsby"
import ArrowIcon from "../globalComponents/arrow";
import ScrippedText from "../globalComponents/scrippedText";
import AnimatedImage from "../globalComponents/animatedImage";
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';



gsap.registerPlugin(ScrollTrigger);

const SectionContact = ({section }) => {

    const sectionRef = useRef(null);
    const linksWrapperRef = useRef(null);
    const linksRefOne = useRef(null);
    const linksRefTwo = useRef(null);
    //const linksRefThree = useRef(null); once contact page will be created



      useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {
    
    


            const animation = gsap.matchMedia()
            animation.add()
  
            
            /************************************************************************/
            // DESKTOP ANIMATION
            /***********************************************************************/
            
            animation.add("(min-width: 569px)", () => {
  
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: linksWrapperRef.current,
                  start: "top 97%",
                  end:"top 67%",
                  scrub:3, 
                  repeatRefresh: true,
                  toggleActions: "restart pause resume none",
                }
              });
    
                tl.from(linksRefOne.current, {
                  duration:1.2,
                  ease: "power2.out",
                  css: {
                    opacity: 0,
                    xPercent:'40',
                }})
                tl.from(linksRefTwo.current, {
                    duration:1.2,
                    ease: "power2.out",
                    css: {
                      opacity: 0,
                      xPercent:'40',
                }}, '-=.7')
  
      
        
            })
  
            animation.add("(max-width: 568px)", () => {
  
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: linksWrapperRef.current,
                  start: "top 87%",
                  end:"top 47%",
                  scrub:3, 
                  repeatRefresh: true,
                  toggleActions: "restart pause resume none",
                }
              });
    
                tl.from(linksRefOne.current, {
                  duration:1.2,
                  ease: "power2.out",
                  css: {
                    opacity: 0,
                    xPercent:'40',
                }})
                tl.from(linksRefTwo.current, {
                    duration:1.2,
                    ease: "power2.out",
                    css: {
                      opacity: 0,
                      xPercent:'40',
                }}, '-=.7')
  
  
    
      
          })
  
  
           
                
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);


   

  return (
    
    //{/*<section ref={contactRef} className={pageName === 'home' ? `${styles.contact} container` : styles.contact}>*/}
    <section ref={sectionRef} className={`${styles.contact} container`}>
        <div className={styles.contactSection}>
            <div className={styles.contactSectionContent}>
                <div className={styles.headerOne}>
                    <h3 className="header-section">{section.headerOne}</h3>
                </div>
                
                <div className={styles.headerTwo}>
                    <TypingEffect
                        text={section.projectFeatures}
                        speed={100}
                        eraseDelay={270}
                        eraseSpeed={100}
                        cursorRenderer={cursor => <h2 className="header-features text-color">{cursor}</h2>}
                        displayTextRenderer={(text, i) => {
                        return (
                            <h2 className={"header-features text-color"}>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                <span className="text-color"
                                    key={key}
                                    style={i%2 === 0 ? { color: '#1E6DB6'} : {}}
                                >{char}</span>
                                );
                            })}
                            </h2>
                        );
                        }}        
                    />
                </div>
                <div className={styles.headerThree}>
                    <h3 className="header-section">{section.headerTwo}</h3>
                </div>
                <div className={styles.paragraph}>
                  <p className="text-uppercase">{section.subheader}</p>
                </div>
            
            </div> 
            <ScrippedText scrippedTextClass="scrippedTextContact" sectionName="contact"/>
            <div className={styles.linksWrapper} ref={linksWrapperRef}>
                    <a ref={linksRefOne} className={`${styles.contactLink} text-uppercase`} href={section.brief.asset.url} aria-label={section.brief.text} rel="noopener noreferrer" target="_blank">
                        {section.brief.text}
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </a>
                    <Link className={`${styles.contactLink} text-uppercase`} ref={linksRefTwo} to='#'onClick={(e) => {
                        window.location.href = 'mailto:katgolek@pm.me?subject=Project Inquiry&body=Hello Kate, Pls see below my project details:';
                        e.preventDefault();
                        }}>
                        Free Consulting
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </Link>
            </div>
        </div>
        {/*<GatsbyImage className={styles.contactSectionImage}
                    image={getImage(section.image.asset.gatsbyImageData)}
                      alt={section.image.alt}/>*/}
                    <AnimatedImage imagePath={section.image.asset.gatsbyImageData} imageAlt={section.image.alt}/>
     
    </section>
  )
}

export default SectionContact