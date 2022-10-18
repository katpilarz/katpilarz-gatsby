import React from "react";
import * as styles from "./pageSingle.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PageSingleItemList from "./pageSingleItemList";
import PortableText from "react-portable-text"

import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);






const PageSingle = ({ pageTitle, itemList, pageImage, pageName, pageDescription }) => {

  const pageSingleRef = useRef(null);


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline();

        tl.from(pageSingleRef.current, {
            duration: 2, 
            ease:'power2.out',
            css: {
                yPercent:'50',
            }}
        )
  
    }, pageSingleRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  
 
  return (
    <div ref={pageSingleRef} className={`${styles.pageSingle} container`}>
        <header className={styles.pageSingleHeader}>
            <h2>{pageTitle} </h2>
        </header>
        <div className={styles.itemsList}>
            <PortableText className={`${styles.description} text-uppercase`}
                content={pageDescription}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
            { itemList &&
                <PageSingleItemList pageName={pageName} itemList={itemList}/>
            }
        </div>
      
        { pageImage &&
            <div className={styles.pageFooterImage}>
            <GatsbyImage 
                image={getImage(pageImage.asset.gatsbyImageData)}
                alt={pageImage.alt}/>
            </div>
        }

    </div>
  )
}

export default PageSingle