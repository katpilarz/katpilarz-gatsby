import React from "react";
import * as styles from "./pageSingle.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ArrowIcon from "./global/arrow";
import Video from "./global/video";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';




const PageSingleItemList = ({ itemList, pageName }) => {

  const itemListRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
      if (!revealRefs.current.includes(el)) {
          revealRefs.current.push(el);
      }
  };



  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...

      revealRefs.current.forEach((el, index) => {

        gsap.fromTo(el, {
            xPercent:'-20',
            autoAlpha:0, 
            opacity:0,
        }, {
            duration: 4,
            xPercent:0,
            opacity:1,
            autoAlpha:1,
            ease: "power4.out",
            delay:.1,
            scrollTrigger: {
                id: `section-${index+1}`,
                trigger: el,
                start: 'top 89%',
                end:'top 40%',
                toggleActions: "restart pause resume none",
                //toggleActions: 'play none none reverse',
                refreshPriority: 1,
                scrub:2,
            }
        });
 
    });



  
    }, itemListRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  
 
  return (
    <div ref={itemListRef} className={styles.itemListWrapper}>
        {itemList.map((item, index) => {
            return (
            <article key={index} className={styles.itemCard} ref={addToRefs}>
                { item.node.video && 
                    <Video key={index} video={item.node.video} videoCustomClass='itemCardMedia' isDecriptionDisplayed='false'/> 
                }
                { item.node.image && 
                <div className={styles.itemCardMedia}>
                    <GatsbyImage 
                        image={getImage(item.node.image.asset.gatsbyImageData)}
                        alt={`${item.node.image.alt}`}
                    />
                </div>
                }
                { item.node.socialMediaImage && 
                <div className={styles.itemCardMedia}>
                    <GatsbyImage
                    image={getImage(item.node.socialMediaImage.asset.gatsbyImageData)}
                    alt={`${item.node.socialMediaImage.alt}`}
                    />
                </div>
                
                }
                <Link to={`/${pageName}/${item.node.slug.current}`} className={styles.itemCardHeader}>
                    <h3> {item.node.title}</h3>
                    <ArrowIcon arrowIconClass="pageIcon"/>
                </Link>
            </article>
        
            )
        })}
    </div>
  )
}

export default PageSingleItemList