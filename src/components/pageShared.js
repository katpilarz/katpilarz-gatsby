import React from "react";
import * as styles from "./pageShared.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"




const PageShared = ({ pageTitle, itemList, pageImage, pageName }) => {
 
  return (
    <main className={styles.pageShared}>
        <div className={styles.pageSharedHeader}>
            <h2>{pageTitle} </h2>
        </div>
        { itemList &&
        <div className={styles.itemsList}>
            {itemList.map((item, index) => {
                return (
                <article key={index} className={styles.itemCard}>
                        { item.node.image && 
                        <GatsbyImage className={styles.itemCardImage}
                            image={getImage(item.node.image.asset.gatsbyImageData)}
                            alt={item.node.image.alt}
                        />
                        }
                        { item.node.bannerImage && 
                        <GatsbyImage className={styles.itemCardImage}
                            image={getImage(item.node.bannerImage.asset.gatsbyImageData)}
                            alt={item.node.bannerImage.alt}
                        />
                        }
                    <Link to={`/${pageName}/${item.node.slug.current}`}>
                        <div className={styles.itemCardHeader}>
                            <h3> {item.node.title}</h3>
                            <p> Details</p>
                        </div>
                    </Link>
                </article>
            
                )
            })}
        </div>
        }
        {/*<div className={styles.pageFooterImage}>
            <GatsbyImage 
                image={getImage(pageImage.asset.gatsbyImageData)}
                alt={pageImage.alt}/>
        </div>*/}

    </main>
  )
}

export default PageShared