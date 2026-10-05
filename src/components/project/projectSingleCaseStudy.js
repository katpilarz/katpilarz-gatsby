import React, { useRef } from "react"
import * as styles from "./projectSingleCaseStudy.module.scss"
import gsap from "gsap/dist/gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import PortableText from "../globalComponents/portableText"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

gsap.registerPlugin(ScrollTrigger)

/* paisak4u writes a run-in label as a bracketed lead-in — "[ Grounding ] …".
 * The same text works on both sites: here the brackets come off and the label
 * is set like every other label on this page. The length bound keeps a
 * paragraph that merely starts with a bracket from being read as a label. */
const RUN_IN = /^\[\s*([^\]\n]{1,28})\s*\]\s+/

const withRunIns = (blocks = []) =>
  blocks.map((block) => {
    const first = block?.children?.[0]
    const match = block?._type === "block" && typeof first?.text === "string" && RUN_IN.exec(first.text)
    if (!match) return block
    return {
      ...block,
      runIn: match[1].trim(),
      children: [{ ...first, text: first.text.slice(match[0].length) }, ...block.children.slice(1)],
    }
  })

const bodyComponents = {
  block: {
    normal: ({ value, children }) => (
      <p>
        {value.runIn && <span className={`${styles.runIn} text-uppercase`}>{value.runIn}</span>}
        {children}
      </p>
    ),
  },
}

/**
 * The case study: one full-width section after another, each a headline with
 * its label just above it, beside its description, and the section's own
 * images.
 * The pattern is the one the paisak4u case studies use, so a story can be
 * published on both sites; the look is this site's own.
 *
 * Images run one per row at full width, or side by side — up to four in a row,
 * for phone screens — when the section asks for it. On a phone they always
 * stack. `showImages` is off for NDA work: the text stays, the frames go.
 *
 * The text of each section rises in once as it arrives and then stays put —
 * `fromTo` with explicit end values, `once`, no scrub (see description.js for
 * why) — and nothing moves under reduced motion.
 *
 * Images are uncovered rather than zoomed. A clean edge rises over the frame
 * — from its bottom, or from the bottom of the screen on a frame taller than
 * that — while the picture settles 40px and from 103% to its real size, once,
 * as it arrives; images that share a row follow one another.
 * The site's AnimatedImage held every frame at up to 127% and scrubbed it back
 * with the scroll, so a design-system page or a dense screen spent most of
 * its time on screen cropped and enlarged. Here an image is only ever moving
 * for a second and a half, and at rest it is exactly as it was made — the
 * transforms are cleared afterwards so detail stays crisp.
 */
// `afterContext` is set straight after the section labelled Context (the first
// section, if none is) — the project page puts the client's testimonial there.
const ProjectSingleCaseStudy = ({ sections, showImages = true, afterContext }) => {
  const rootRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Intervals waiting on images, cleared with everything else on unmount.
    const polls = []

    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.figures}`).forEach((group) => {
        const columns = Number(getComputedStyle(group).getPropertyValue("--columns")) || 1
        gsap.utils.toArray(group.querySelectorAll(`.${styles.frame}`)).forEach((frame, i) => {
          const picture = frame.firstElementChild
          const caption = frame.nextElementSibling
          const tl = gsap.timeline({ paused: true })

          // Uncover the picture, not its blurred placeholder: when a frame is
          // reached before its lazy-loaded image has arrived, the reveal waits
          // for it — up to a second and a half, so a slow image never leaves an
          // empty frame. The image is looked up on arrival rather than here,
          // because GatsbyImage only adds its main <img> after the first render
          // when the page was not server-rendered (`gatsby develop`).
          const loaded = () => {
            const img = frame.querySelector("img[data-main-image]")
            return img && img.complete && img.naturalWidth > 0
          }
          let started = false
          let poll
          const start = () => {
            if (started) return
            started = true
            clearInterval(poll)
            gsap.delayedCall((i % columns) * 0.14, () => tl.play())
          }
          ScrollTrigger.create({
            trigger: frame,
            start: "top 88%",
            once: true,
            onEnter: () => {
              if (loaded()) return start()
              poll = setInterval(() => loaded() && start(), 100)
              polls.push(poll)
              gsap.delayedCall(1.5, start)
            },
          })

          // The covered state is set here, up front: a paused timeline does not
          // render its tweens' start values until it plays, which left the
          // placeholder showing until the reveal began.
          gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" })
          gsap.set(picture, { y: 40, scale: 1.03 })
          if (caption) gsap.set(caption, { autoAlpha: 0 })

          // The edge rises from the bottom of the frame or the bottom of the
          // screen, whichever is higher, measured when the reveal starts. On a
          // frame that fits the screen that is its own bottom edge. On a tall
          // one — a full-page design can be 5000px — rising from the frame's
          // bottom meant the part in view was uncovered last, all at once, so
          // it looked like nothing happened; this way the edge always crosses
          // what is on screen, and the rest is simply there when you scroll on.
          // Distances are in pixels for the same reason: 6% of a tall image is
          // a jump, 40px is a settle.
          const cover = { top: 0 }
          tl.fromTo(
            cover,
            {
              top: () => {
                const box = frame.getBoundingClientRect()
                return Math.min(box.height, Math.max(window.innerHeight - box.top, 0))
              },
            },
            {
              top: 0,
              duration: 1.4,
              ease: "expo.out",
              immediateRender: false,
              onUpdate: () => {
                frame.style.clipPath = `inset(${cover.top}px 0px 0px 0px)`
              },
              onComplete: () => {
                frame.style.clipPath = ""
              },
            }
          ).to(picture, { y: 0, scale: 1, duration: 1.6, ease: "expo.out", clearProps: "transform" }, 0)
          if (caption) tl.to(caption, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0.5)
        })
      })

      gsap.utils.toArray(`.${styles.text}`).forEach((text) => {
        gsap.fromTo(
          text.children,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: { trigger: text, start: "top 85%", once: true, invalidateOnRefresh: true },
          }
        )
      })
    }, rootRef)

    return () => {
      polls.forEach(clearInterval)
      ctx.revert()
    }
  }, [])

  const contextIndex = Math.max(0, sections.findIndex((section) => /^context$/i.test((section.heading || "").trim())))

  return (
    <div ref={rootRef} className={styles.caseStudy}>
      {sections.map((section, index) => {
        const id = `case-${section._key || index}`
        const isContextSection = index === contextIndex
        const figures = showImages ? (section.figures || []).filter((f) => f?.asset?.gatsbyImageData) : []
        const sideBySide = section.figureLayout === "pair" && figures.length > 1
        return (
          <React.Fragment key={section._key || index}>
          <section className={`${styles.section} container`} aria-labelledby={id}>
            <div className={styles.text}>
              <div className={styles.headline}>
                <div className={styles.sectionHead}>
                  <p className="text-uppercase">{section.heading}</p>
                </div>
                <h3 id={id} className={styles.lead}>
                  {section.lead || section.heading}
                </h3>
              </div>
              {section.body && (
                <div className={styles.body}>
                  <PortableText content={withRunIns(section.body)} components={bodyComponents} />
                </div>
              )}
            </div>

            {figures.length > 0 && (
              <div
                className={`${styles.figures} ${sideBySide ? styles.sideBySide : ""}`}
                style={sideBySide ? { "--columns": Math.min(figures.length, 4) } : undefined}
              >
                {figures.map((figure, i) => (
                  <figure key={i}>
                    <div className={styles.frame}>
                      <GatsbyImage
                        className={styles.picture}
                        image={getImage(figure.asset.gatsbyImageData)}
                        alt={figure.alt || ""}
                      />
                    </div>
                    {figure.caption && <figcaption className="text-uppercase">{figure.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </section>
          {isContextSection && afterContext && <div className={styles.interlude}>{afterContext}</div>}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ProjectSingleCaseStudy
