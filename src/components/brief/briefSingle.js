import React, { useRef } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from "gsap/dist/gsap"
import * as styles from "./briefSingle.module.scss"
import BriefForm from "./briefForm"
import ArrowIcon from "../globalComponents/arrow"
import ScrippedText from "../globalComponents/scrippedText"
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

/**
 * The brief page, split in two: the form on the left, one question at a
 * time, and on the right a client project, its photo running the full height
 * of the window out to the edge. The gold "Connect" from the contact section,
 * where the link to this page is, crosses from the page onto the photo.
 *
 * Below 1025px wide the photo is a band under the header and the form
 * follows it. The final check opens over the photo side (see briefForm.js).
 */
const BriefSingle = ({ project }) => {

  const sectionRef = useRef(null)
  const mainRef = useRef(null)
  const pictureRef = useRef(null)
  const scriptRef = useRef(null)

  const image = project?.homeFeaturedProjectImage

  // The photo starts right under the fixed header, whose height changes
  // with the window, so it's measured rather than guessed.
  useIsomorphicLayoutEffect(() => {
    const header = document.querySelector("nav")
    const section = sectionRef.current
    if (!header || !section) return
    const measure = () => section.style.setProperty("--header-height", `${header.offsetHeight}px`)
    measure()
    if (typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  useIsomorphicLayoutEffect(() => {

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = gsap.context(() => {

      if (reduceMotion) return

      // In while the preloader lifts: the title and the form, the photo
      // settling inside its frame, and the script drawing in last.
      gsap.from(mainRef.current.children, {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        stagger: .12,
        delay: .9,
      })

      if (pictureRef.current) {
        gsap.from(pictureRef.current, {
          scale: 1.15,
          duration: 2.2,
          ease: "power2.out",
          delay: .6,
        })
      }

      if (scriptRef.current) {
        gsap.from(scriptRef.current, {
          autoAlpha: 0,
          xPercent: 20,
          duration: 1.4,
          ease: "power2.out",
          delay: 1.5,
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.brief}>
      <div ref={mainRef} className={styles.main} data-brief-column>
        <h1 className={`${styles.title} text-uppercase`}>Send me a brief</h1>
        <BriefForm />
      </div>

      {image &&
        <figure className={styles.panel}>
          <div className={styles.frame}>
            <div ref={pictureRef} className={styles.pictureWrapper}>
              <GatsbyImage
                className={styles.picture}
                image={getImage(image.asset.gatsbyImageData)}
                alt={image.alt || ""}
                loading="eager"
              />
            </div>
          </div>
          <div ref={scriptRef} className={styles.script} aria-hidden="true">
            <ScrippedText sectionName="contact" scrollReveal={false} />
          </div>
          <figcaption className={styles.caption}>
            <span>Client project: QRCodeFlip, a QR ordering platform for hotels.</span>
            <Link className={`${styles.captionLink} text-uppercase`} to={`/projects/${project.slug.current}/`}>
              See the case study
              <ArrowIcon arrowIconClass="linkIcon" />
            </Link>
          </figcaption>
        </figure>
      }
    </section>
  )
}

export default BriefSingle
