import React from "react";
import * as styles from "./sectionContact.module.scss";
import ReactTypingEffect from 'react-typing-effect';
import { Link } from "gatsby"
import ArrowIcon from "../globalComponents/arrow";
import ScrippedText from "../globalComponents/scrippedText";
import AnimatedImage from "../globalComponents/animatedImage";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';



gsap.registerPlugin(ScrollTrigger);

const SectionContact = ({section, pageName }) => {

    const headerOneRef = useRef(null);
    const headerTwoRef = useRef(null);
    const typingRef = useRef(null);
    const subheaderRef = useRef(null);
    const contactRef = useRef(null);
    const linksRefOne = useRef(null);
    const linksRefTwo = useRef(null);
    //const linksRefThree = useRef(null); once contact page will be created


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {
          // create as many GSAP animations and/or ScrollTriggers here as you want...
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: headerTwoRef.current,
              start: "top 57%",
              end: "top 20%",
              scrub:1, 
              repeatRefresh: true,
              toggleActions: "restart pause resume none",
            }
          });
            tl.from(headerOneRef.current, {
                duration: 1.4,
                ease: "power2.out",
                css: {
                  autoAlpha: 0,
                  visibility:'hidden',
                  yPercent:'-20',
            }})
            tl.from(typingRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                  autoAlpha: 0,
                  visibility:'hidden',
            }},'-=1')
            tl.from(headerTwoRef.current, {
                duration: 1.4,
                ease: "power2.out",
                css: {
                  autoAlpha: 0,
                  visibility:'hidden',
                  yPercent:'50',
            }},'-=1')

            tl.from(subheaderRef.current, {
                duration: 1.4,
                ease: "power2.out",
                css: {
                  autoAlpha: 0,
                  visibility:'hidden',
                  xPercent:'40',
            }},'-=1')
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
            }},'-=.3')
              



     
        }, contactRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);


   

  return (
    
    //{/*<section ref={contactRef} className={pageName === 'home' ? `${styles.contact} container` : styles.contact}>*/}
    <section ref={contactRef} className={`${styles.contact} container`}>
        <div className={styles.contactSection}>
            <div className={styles.contactSectionContent}>
                <div ref={headerOneRef} className={styles.headerOne}>
                    <h3 className="header-section">{section.headerOne}</h3>
                </div>
                
                <div className={styles.headerTwo} ref={typingRef}>
                    <ReactTypingEffect
                        text={section.projectFeatures}
                        speed={120}
                        eraseDelay={700}
                        eraseSpeed={120}
                        cursorRenderer={cursor => <h2 className="header-features text-color">{cursor}</h2>}
                        displayTextRenderer={(text, i) => {
                        return (
                            <h2 className={"header-features text-color"}>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                <span
                                    key={key}
                                    style={i%2 === 0 ? { color: '#2283AC'} : {}}
                                >{char}</span>
                                );
                            })}
                            </h2>
                        );
                        }}        
                    />
                </div>
                <div ref={headerTwoRef} className={styles.headerThree}>
                    <h3 className="header-section">{section.headerTwo}</h3>
                </div>
                <div ref={subheaderRef} className={styles.paragraph}>
                <p className="text-uppercase">{section.subheader}</p>
                </div>
            
            </div> 
            <ScrippedText scrippedTextClass="scrippedTextContact" sectionName="contact"/>
            <div className={styles.linksWrapper}>
                    <a ref={linksRefOne} className={`${styles.contactLink} text-uppercase`} href={section.brief.asset.url} aria-label={section.brief.text} rel="noopener noreferrer" target="_blank">
                        {section.brief.text}
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </a>
                    <Link className={`${styles.contactLink} text-uppercase`} ref={linksRefTwo} to='#'onClick={(e) => {
                        window.location.href = 'mailto:katgolek@pm.me?subject=Project Inquiry&body=Hello Kate, Pls see below my project details:';
                        e.preventDefault();
                        }}>
                        Send me an email
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </Link>
            </div>
        </div>
        <AnimatedImage imagePath={section.image.asset.gatsbyImageData} imageAlt={section.image.alt}/>   
     
    </section>
  )
}

export default SectionContact