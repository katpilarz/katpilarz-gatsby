import React from "react";
import * as styles from "./pageShared.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ArrowIcon from "../components/arrow";
import PortableText from "react-portable-text"
import Video from "../components/video";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';




const PageShared = ({ pageTitle, itemList, pageImage, pageName, pageDescription }) => {

  const pageSharedRef = useRef(null);


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline();

        tl.from(pageSharedRef.current, {
            duration: 2, 
            ease:'sine.out',
            css: {
                yPercent:'40',
            }}
        )
  
    }, pageSharedRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  
 
  return (
    <div ref={pageSharedRef} className={`${styles.pageShared} container`}>
        <div className={styles.pageSharedHeader}>
            <h2>{pageTitle} </h2>
        </div>
        { itemList &&
        <div className={styles.itemsList}>
            <PortableText className={`${styles.description} text-uppercase`}
                content={pageDescription}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
            {itemList.map((item, index) => {
                return (
                <article key={index} className={styles.itemCard}>
                        { item.node.video && 
                            <Video key={index} video={item.node.video} videoCustomClass='itemCardMedia' isDecriptionDisplayed='false'/> 
                        }
                        { item.node.image && 
                        <div className={`${styles.itemCardMedia} fixed-media`}>
                            <GatsbyImage 
                                image={getImage(item.node.image.asset.gatsbyImageData)}
                                alt={`${item.node.image.alt}`}
                            />
                        </div>
                        }
                        { item.node.socialMediaImage && 
                        <div className={`${styles.itemCardMedia} fixed-media`}>
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

export default PageShared