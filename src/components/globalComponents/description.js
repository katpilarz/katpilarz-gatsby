import React from "react";
import * as styles from "./description.module.scss";
import PortableText from "./portableText"
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

gsap.registerPlugin(ScrollTrigger);


const Description = ({ description, descriptionCustomClass  }) => {

  const descriptionRef = useRef(null);

  useIsomorphicLayoutEffect(() => {

    /* The entry animation, rewritten so it cannot leave prose unreadable.
     *
     * It used to be a scrubbed timeline: opacity was tied to scroll position
     * between "top 80%" and "top 40%" of the trigger. That is fine for a short
     * paragraph, but a project description can be a whole case study — and on a
     * block taller than the viewport the top passes both markers while the
     * reader is still at the beginning, so progress is decided by where the
     * *top* is rather than what is on screen. Combined with `gsap.from`, which
     * leaves the element at its start values if the trigger never resolves, a
     * long description could sit at partial opacity, or hidden outright.
     *
     * Now it plays once, on entry, and ends explicitly visible:
     *   - `fromTo` states the finished values instead of inferring them
     *   - `once: true` means it never animates back towards hidden
     *   - no `scrub`, so a stale measurement cannot pin it mid-fade
     *   - the tween is skipped entirely under prefers-reduced-motion
     *
     * Note: do NOT call ScrollTrigger.refresh() from here. Two components on
     * the home page pin (homeSingleBanner, sectionFeaturedVideo), and a global
     * refresh makes ScrollTrigger rebuild their pin-spacers — which reparents
     * nodes React owns and throws "insertBefore: the node before which the new
     * node is to be inserted is not a child of this node" during hydration,
     * blanking the page through the error boundary. ScrollTrigger already
     * re-measures on load by itself; `invalidateOnRefresh` below is enough.
     */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = gsap.context(() => {

      if (reduceMotion) {
        gsap.set(descriptionRef.current, {autoAlpha: 1, yPercent: 0})
        return
      }

      const animation = gsap.matchMedia()

      // The rise is a fraction of the element's own height, so it stays small
      // on a long block — 50% of a case study is most of a screen.
      const reveal = (yPercent) => () => {
        gsap.fromTo(descriptionRef.current,
          {
            autoAlpha: 0,
            yPercent,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
            },
          })
      }

      animation.add("(min-width: 569px)", reveal(8))
      animation.add("(max-width: 568px)", reveal(4))

    }, descriptionRef);

    return () => ctx.revert();
  }, []);


  return (
        <div ref={descriptionRef} className={`${styles.description} ${styles[descriptionCustomClass]}`}>
            <PortableText 
                content={description}
            />
        </div>
  )
}

export default Description