import React from "react";
import * as styles from "./pageShared.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ArrowIcon from "../components/arrow";
import PortableText from "react-portable-text"
import Video from "../components/video";




const PageShared = ({ pageTitle, itemList, pageImage, pageName, pageDescription }) => {
 
  return (
    <main className={styles.pageShared}>
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
                        <GatsbyImage className={styles.itemCardMedia}
                            image={getImage(item.node.image.asset.gatsbyImageData)}
                            alt={`${item.node.image.alt}`}
                        />
                        }
                        { item.node.socialMediaImage && 
                        <GatsbyImage className={styles.itemCardMedia}
                            image={getImage(item.node.socialMediaImage.asset.gatsbyImageData)}
                            alt={`${item.node.socialMediaImage.alt}`}
                        />
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

    </main>
  )
}

export default PageShared