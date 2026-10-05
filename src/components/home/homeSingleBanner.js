import React from "react";
import * as styles from "./homeSingleBanner.module.scss";
import { useRef } from 'react';
import Btn from "../globalComponents/btn";
import Branding from "../globalComponents/branding";
import {useMediaQuery} from "../../hooks/useMediaQuery";

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);

/**
 * How large the hero collage sits before the reader scrolls.
 *
 * The tiles keep their original scattered placement across the middle of the
 * hero, behind the wordmark — moving them out of the way entirely killed the
 * composition. Instead they sit small at rest, which opens enough ground
 * around the type to read it, and the scroll timeline grows them back to full
 * size before the whole collage scales out.
 *
 * Fading them back was tried first and looked washed out rather than
 * deliberately held; scale keeps their colour.
 *
 * Lower it and the text reads more easily; raise it and the collage does.
 */
const RESTING_SCALE = 0.52

/** What the tiles grow to once the reader scrolls into the hero. */
const FULL_SCALE = 1.1


/**
 * The hero collage. Five images in five fixed grid positions, so the order is
 * the composition — see `:nth-child(1)`…`(5)` in the stylesheet.
 *
 * `bannerGallery` on the home document is the arrangement, set by hand. It
 * replaces the old query for projects flagged `isGalleryMockup` ordered by
 * date, under which retiring a project both dropped a slot and shuffled
 * everything else into the wrong ones. `images` is still accepted as a
 * fallback, so the section keeps working if the field is ever emptied.
 */
const HomeSingleBanner = ({ name, title, images, bannerGallery, author }) => {

  const slides = (bannerGallery?.length
    ? bannerGallery
    : (images || []).map(({node}) => ({
        image: node.socialMediaImage,
        url: `/projects/${node.slug.current}`,
      })))
    // Retired work has no page of its own; those tiles go to the work index
    // rather than nowhere, which also keeps every tile the same element.
    .map((slide) => ({...slide, url: slide.url || '/projects'}))

  /* The collage is height-gated, and that gate is why its animation was dead.
   *
   * useMediaQuery answers `false` on the server and on the hydrating render, so
   * the images mount one render later. The GSAP setup below ran on the first
   * commit with an empty dependency array — at which point `revealRefs` held
   * nothing, so the per-image tween was never created and the five tiles just
   * sat there at full opacity while the rest of the pinned timeline played.
   *
   * Reading the query here instead of through <Media> gives the effect a
   * dependency to re-run on, so the tween is built the moment the tiles exist.
   */
  const showGallery = useMediaQuery("(min-height: 512px)")

  const introRef = useRef(null);
  const introContentRef = useRef(null);
  const headerRef = useRef(null);
  const jobRef = useRef(null);
  const homeBtnRef = useRef(null);
  const brandingRef = useRef(null);

  const sectionRef = useRef(null);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
      if (!revealRefs.current.includes(el)) {
          revealRefs.current.push(el);
      }
  
  };


  useIsomorphicLayoutEffect(() => {

      let ctx = gsap.context(() => {
        // create as many GSAP animations and/or ScrollTriggers here as you want...
  
  
         //this is component scroll triggered timeline  

         const tl = gsap.timeline()
      
         tl.from(introContentRef.current, {
           delay:.3,
             duration:2, 
             ease: "power2.out",
             css: {
               autoAlpha: 0, 
               yPercent:'140',
             }
           });

          /* The "Don't be shy, scroll down" badge is only a prompt to scroll,
           * so it goes as soon as the reader starts: a quarter turn and a fade
           * over the first 120px, on every screen size. Scrolling back to the
           * top brings it back. It used to spin on through the whole pinned
           * hero and only fade at the end. */
          gsap.to(homeBtnRef.current, {
            rotation: 90,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { start: 0, end: 120, scrub: true },
          })

          const bannerAnimation = gsap.matchMedia()
          bannerAnimation.add()
          
          /************************************************************************/
          // DESKTOP ANIMATION
          /***********************************************************************/
          
          bannerAnimation.add("(min-width: 1025px)", () => {

            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: introRef.current,
                start: "bottom bottom",
                end: "bottom -100%",
                scrub: 2,
                pin: true,
                pinSpacing: true,
                toggleActions: 'restart pause resume none',
                refreshPriority: 1,
              }
            });
              /* Grown to full size as the reader scrolls into the hero.
               *
               * Placed at position 0 so it runs at the head of the timeline,
               * before the collage begins scaling away — the images come up to
               * size first, then leave. `overwrite` keeps it from fighting the
               * arrival tween if someone scrolls during the first two seconds.
               */
              tl2.to(revealRefs.current, {
                duration: 2,
                ease: "none",
                overwrite: "auto",
                css: {
                  scale: FULL_SCALE,
              }}, 0)

              tl2.to(jobRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha: 0, 
                  yPercent:'20',
                }
              },'-=4');
              tl2.to(headerRef.current, {
                duration:3, 
                ease: "power2.out",
                css: {
                  autoAlpha: 0, 
                  yPercent:'-100',
                }
              },'-=4');
              tl2.from(brandingRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha:0, 
                  opacity:0,
                }
              },'-=2.7');
              tl2.to(sectionRef.current, {
                duration:4, 
                ease: "power2.out",
                css: {
                  xPercent: '100', 
                  yPercent:'60',
                  scale:6.2,
                }
              });
              tl2.to(sectionRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha:0.0, 
                  opacity:0.0,
                }
              });


              /* The tiles' entrance, played on load rather than on scroll.
               *
               * It was wired to a ScrollTrigger of its own — `trigger: el,
               * start: 'top top'`, scrubbed — which meant the collage was
               * invisible until the reader scrolled, so the hero loaded as a
               * wordmark on an empty page. The tiles sit inside the pinned
               * intro, so they never move relative to the viewport and the
               * trigger had nothing meaningful to track anyway.
               *
               * The scroll choreography is tl2 above: the collage scales to
               * 6.2x and leaves as the hero is scrolled past. That is the
               * animation on scroll; this is the arrival. The mobile branch
               * below already treats it this way — same values, played on a
               * delay — so the two now behave alike.
               */
              gsap.fromTo(revealRefs.current, {
                  yPercent:20,
                  xPercent:20,
                  opacity:0,
                  autoAlpha:0,
                  scale:.6,
              }, {
                  delay:.5,
                  duration: 2,
                  xPercent:0,
                  yPercent:0,
                  // Arrive small. The wordmark and the specialisation line sit
                  // over this collage; at full size the tiles swallowed some of
                  // those letters. Full colour, less room — scrolling grows
                  // them the rest of the way.
                  opacity: 1,
                  autoAlpha: 1,
                  scale: RESTING_SCALE,
                  ease: "power4.out",
                  stagger: .12,
              });

          })

          /************************************************************************/
          // TABLET & MOBILE ANIMATION
          /***********************************************************************/

          bannerAnimation.add("(max-width: 1024px)", () => {

            if(sectionRef.current){

                revealRefs.current.forEach((el) => {
            
                  gsap.fromTo(el, {
                      scale:.57,
                      autoAlpha:0,

                  }, {
                      delay:.67,
                      duration: 1.77,
                      scale:1,
                      autoAlpha:1,
                      ease: "power2.out",
                  });
          
              });
            }

            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: introRef.current,
                start: "bottom bottom",
                end: "bottom -100%",
                scrub: 2,
                pin: true,
                pinSpacing: true,
                toggleActions: 'restart pause resume none',
                refreshPriority: 1,
              }
            });
              // ANIMATION WILL BE TRIGGERED IF SECTION IS AVAIABLE
              if(sectionRef.current){
                  tl2.to(sectionRef.current, {
                    duration:6, 
                    ease: "power2.out",
                    css: {
                      scale:11,
                      yPercent:'140',
                      xPercent:'130',
                      autoAlpha:0,
                      }
                  },'-=6');
              }

              tl2.from(brandingRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha:0, 
                  opacity:0,
                }
              });
      
          })
     
   
      }, introRef); // <- scopes all selector text inside the context to this component (optional, default is document)
      
      return () => ctx.revert(); // cleanup! 

    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    
    // `showGallery`, not `sectionRef`: a ref object's identity never changes, so
    // depending on it meant the effect ran exactly once — on the render before
    // the collage existed. This re-runs it when the tiles mount.
  }, [showGallery]);

  
  return (
    <>
      {/* This wrapper exists for ScrollTrigger, not for layout.
        *
        * The timeline below pins `introRef`. Pinning moves that element inside
        * a generated `pin-spacer`, which then stands where the element used to
        * stand among its siblings. React still believes the intro div is that
        * child, so the next update touching a sibling — Branding, just below —
        * throws "insertBefore: the node before which the new node is to be
        * inserted is not a child of this node", and the error boundary blanks
        * the whole page.
        *
        * With a wrapper of its own, the pin-spacer is created inside this div
        * instead of beside Branding, and the sibling list React tracks never
        * changes. The wrapper has no styles: it must not introduce a transform
        * or a new containing block, or it would break the pin it exists to
        * protect. */}
      <div>
      <div ref={introRef} className={`${styles.intro} intro`}>
        <div ref={introContentRef} className={styles.introContent}>
          <h1 className="text-color" ref={headerRef}>{name}</h1>
          <span ref={jobRef}> {title}</span>
          <div ref={homeBtnRef} className={`${styles.introBtn} animated-btn`}>
            <Btn btnClassName='introBtn'/>
          </div>
        </div>
        {showGallery && (
            <div ref={sectionRef} className={styles.bannerGallery}>
              {slides.map((slide, index) => {
                  const image = (
                      <GatsbyImage className={styles.galleryImage}
                          image={getImage(slide.image.asset.gatsbyImageData)}
                          alt={`${slide.image.alt}`}
                      />
                  )

                  return (

                  <div key={index} className={styles.bannerGalleryWrapper} ref={addToRefs}>
                      <Link to={slide.url} className={styles.bannerGalleryItem}>{image}</Link>
                  </div>

                  )
              })}
            </div>
        )}
      </div>
      </div>
      <div ref={brandingRef}>
        <Branding author={author}/>
      </div>
     </>
       
  )
}

export default HomeSingleBanner