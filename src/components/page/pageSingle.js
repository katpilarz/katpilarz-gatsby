import React from "react";
import * as styles from "./pageSingle.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { useRef } from 'react';
import PageSingleItemList from "./pageSingleItemList";
import FAQList from "../globalSections/FAQList";
import ArrowIcon from "../globalComponents/arrow";
import ErrorImage from "../globalComponents/error";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);



const PageSingle = ({ pageTitle, itemList, pageImage, pageName, pageDescription, faqs }) => {

  const pageSingleRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
   
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
            <h2 className="text-color">{pageTitle} </h2>
        </header>
        <div className={styles.itemsList}>
            <p className="text-uppercase">{pageDescription}</p>
            { pageName === '404'&&
                <div className={styles.linksWrapper}>
                <Link className={`${styles.contactLink} text-uppercase`} to='/'>
                    Return Home
                    <ArrowIcon arrowIconClass="linkIcon"/>
                </Link>
                <Link className={`${styles.contactLink} text-uppercase`} to='#'onClick={(e) => {
                    window.location.href = 'mailto:kat.pilarz@proton.me?subject=Reporting Error&body=Hello Kate, Pls note I have encountered the following error on your page:';
                    e.preventDefault();
                    }}>
                    Contact Me
                    <ArrowIcon arrowIconClass="linkIcon"/>
                </Link>
                </div>
            }
            { itemList &&
                <PageSingleItemList pageName={pageName} itemList={itemList}/>
            }
            {
                faqs &&
                <FAQList faqs={faqs} faqCustomClass='faqPage'/>
            }
        </div>
        { pageName === '404'&&
            <ErrorImage/>
        }
      
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