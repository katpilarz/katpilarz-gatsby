import React from "react"
import * as styles from "./homeSingleGallery.module.scss";
import Video from "../globalComponents/video";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);


/**
 * The landing-page gallery: one full-width image at a time, held in place while
 * the reader scrolls through the set.
 *
 * It sits inside `.container`, so the images keep the same left and right
 * gutter as every other image on the site rather than running to the edges.
 *
 * The hold is `position: sticky` over a tall runway, not ScrollTrigger's `pin`.
 * Pinning reparents the element into a generated pin-spacer, and moving a node
 * React owns out from under it throws on the next render —
 * "insertBefore: the node before which the new node is to be inserted is not a
 * child of this node" — which the error boundary then catches, blanking the
 * page. Sticky is pure CSS: nothing moves in the DOM, so React and GSAP never
 * disagree about the tree.
 *
 * ScrollTrigger is left doing only what it is good at here — mapping scroll
 * position to a crossfade. Slides are stacked in the same place, so DOM order
 * is z-order: every slide after the first starts hidden and fades in on top.
 *
 * The runway is a little under one screen of scrolling per image — enough that
 * each one lands, short enough that ten do not become a tunnel. Its height has
 * to be set from the slide count, so it is the one inline style here. Under
 * prefers-reduced-motion the whole thing collapses to a plain stack, which is
 * also what a browser without JS shows.
 */
const HomeSingleGallery = ({ gallery }) => {

  const galleryItems = gallery

  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
      if (el && !revealRefs.current.includes(el)) {
          revealRefs.current.push(el);
      }
  };

  useIsomorphicLayoutEffect(() => {

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = gsap.context(() => {

      const slides = revealRefs.current
      if (!slides.length) return

      if (reduceMotion) {
        gsap.set(slides, {autoAlpha: 1, position: 'relative'})
        return
      }

      // Everything but the first waits its turn underneath.
      gsap.set(slides[0], {autoAlpha: 1})
      gsap.set(slides.slice(1), {autoAlpha: 0})

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // The runway is the section; the frame sticks to the top of it for
          // the whole of that distance, so the crossfade runs edge to edge.
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      /* A real crossfade: the outgoing slide fades out as the incoming one
       * fades in, at the same moment.
       *
       * Only fading the incoming one in worked while the images were
       * `object-fit: cover` and filled the frame — the new one simply covered
       * the old. With `contain` they letterbox instead, so everything
       * underneath showed through the empty margins and the section turned
       * into a pile of half-visible mockups. Every slide sits in the same
       * place, so exactly one of them has to be opaque at rest.
       *
       * Slides are placed one unit apart and take a fifth of a unit to change,
       * so roughly 80% of each one's turn is spent alone and at full opacity. */
      const CHANGE = 0.2

      slides.forEach((slide, index) => {
        if (index === 0) return
        tl.to(slides[index - 1], {autoAlpha: 0, duration: CHANGE, ease: 'power2.inOut'}, index - 1)
        tl.to(slide, {autoAlpha: 1, duration: CHANGE, ease: 'power2.inOut'}, index - 1)
      })

      // Hold the last frame for its share too, rather than ending on a change.
      tl.to({}, {duration: 1 - CHANGE})

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionGallery} container`}
      /* One screen for the first image, then 80% of one for each that follows. */
      style={{'--gallery-runway': `${100 + (galleryItems.length - 1) * 80}vh`}}
    >
        <div ref={pinRef} className={styles.galleryPin}>
            {galleryItems.map((item, index) => {
                return (
                    <div key={index} className={styles.projectMockup} ref={addToRefs}>
                        {item.webm &&
                            <Video videoWebm={item.webm} videoFallback={item.fallback} videoAlt={item.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/>
                        }

                        {item.asset &&
                            <GatsbyImage className={styles.image}
                            image={getImage(item.asset.gatsbyImageData)}
                            alt={item.alt}/>
                        }
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default HomeSingleGallery;
