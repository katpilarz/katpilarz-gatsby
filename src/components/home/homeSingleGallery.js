import React from "react"
import * as styles from "./homeSingleGallery.module.scss";
import Video from "../globalComponents/video";
//import AnimatedImage from "../globalComponents/animatedImage";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);


const HomeSingleGallery = ({ gallery }) => {

 const galleryItems = gallery

 const sectionRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
      if (!revealRefs.current.includes(el)) {
          revealRefs.current.push(el);
      }
  };

  useIsomorphicLayoutEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {


        const animation = gsap.matchMedia()
          animation.add()
          
          /************************************************************************/
          // DESKTOP ANIMATION
          /***********************************************************************/
          
          animation.add("(min-width: 569px)", () => {

              revealRefs.current.forEach((el, index) => {

                gsap.fromTo(el, {
                    autoAlpha: 0,
                    xPercent:'-7',
                    scale:.77,
                    transformOrigin:'left',
                }, {
                    duration: 2,
                    autoAlpha: 1,
                    xPercent:0,
                    scale:1,
                    transformOrigin:'left',
                    ease: "power2.out",
                    scrollTrigger: {
                        id: `section-${index+1}`,
                        trigger: el,
                        start: 'top 97%',
                        end:'top 57%',
                        toggleActions: "restart pause resume none",
                       
                        refreshPriority: 1,
                        scrub:2,
                    }
                },'+=10');
         
            });
    
      
          })

          animation.add("(max-width: 568px)", () => {

            revealRefs.current.forEach((el, index) => {

              gsap.fromTo(el, {
                  autoAlpha: 0,
                  xPercent:'-7',
                  scale:.77,
                  transformOrigin:'left',
              }, {
                  duration: 3,
                  autoAlpha: 1,
                  xPercent:0,
                  scale:1,
                  transformOrigin:'left',
                  ease: "power2.out",
                  scrollTrigger: {
                      id: `section-${index+1}`,
                      trigger: el,
                      start: 'top 87%',
                      end:'top 17%',
                      toggleActions: "restart pause resume none",
                     
                      refreshPriority: 1,
                      scrub:2,
                  }
              },'+=10');
       
          });
  
    
        })


  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);
 
  // NO STYLING FOR VIDEO - MORE LIKELY SHOULD NOT BE CONSIDERED FOR THIS SECTION DUE TO BANDWIDTH
   
  return (
    <section ref={sectionRef} className={`${styles.sectionGallery} container`}>
        
            {galleryItems.map((item, index) => {
                return (
                    <div key={index} className={styles.projectMockup} ref={addToRefs}>
                        {item.webm &&
                            <Video videoWebm={item.webm} videoFallback={item.fallback} videoAlt={item.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/> 
                        }
                        {/*<AnimatedImage imagePath={item.asset.gatsbyImageData} imageAlt={item.alt}/>*/}

                        {item.asset &&
                            <GatsbyImage class={styles.image}
                            image={getImage(item.asset.gatsbyImageData)}
                            alt={item.alt}/>
                        }
                    </div>
                
                )
            })}
    </section>

  )
}

export default HomeSingleGallery;