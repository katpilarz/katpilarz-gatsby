import React from "react";
import * as styles from "./projectSingleDetails.module.scss";
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Description from "../globalComponents/description";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

gsap.registerPlugin(ScrollTrigger);

/**
 * Every fact about the project as one list, straight after the banner — the
 * ledger that opens a paisak4u case study. A row only appears when its field
 * is filled in.
 *
 * The headline, summary and impact figures that used to sit above it came
 * off the page (October 2026): the banner already introduces the project, and
 * the sections tell the rest. The fields stay in Sanity — the headline still
 * feeds the page's search description, and the summary travels to paisak4u.
 */
const ProjectSingleDetails = ({ project }) => {

  const projectDetailsRef = useRef(null);
  const ledgerRef = useRef(null);


  useIsomorphicLayoutEffect(() => {

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = gsap.context(() => {

      if (reduceMotion) return

      // The fact rows come in one after another, once, and stay. Reading
      // them off the list keeps the stagger right however many are shown.
      gsap.fromTo(ledgerRef.current.children,
        { autoAlpha: 0, xPercent: 6 },
        {
          autoAlpha: 1,
          xPercent: 0,
          duration: .8,
          ease: "power2.out",
          stagger: .08,
          scrollTrigger: { trigger: ledgerRef.current, start: "top 85%", once: true },
        })

    }, projectDetailsRef);

    return () => ctx.revert();
  }, []);


  // A project with case study sections tells its story in them, under the
  // summary; `details` is the single-body version for everything else.
  const hasCaseStudy = project.caseStudy?.length > 0

  // A link into paisak4u's /work/ is the full case study for this project;
  // anything else is the product or site itself.
  const isCaseStudy = /paisak4u\.com\/work\//.test(project.url || '')

  const rows = [
    { label: project.producedBy ? 'Produced by' : 'Client', value: project.producedBy || project.title },
    { label: 'Role', value: project.role },
    { label: 'Scope', value: project.scope },
    { label: 'Year', value: project.year },
    project.tools?.length > 0 && {
      label: 'Tools',
      value: (
        <span className={styles.toolsList}>
          {project.tools.map((tool, index) => (
            <span className={styles.toolSingle} key={index}>{tool}</span>
          ))}
        </span>
      ),
    },
    project.url && {
      label: isCaseStudy ? 'Case study' : 'Website',
      value: (
        <a
          href={project.url}
          aria-label={project.urlLabel
              ? `${project.urlLabel}: ${project.title}`
              : isCaseStudy
                ? `Read the full ${project.title} case study`
                : `Visit the ${project.title} website`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {project.urlLabel || (isCaseStudy ? 'View case study in detail' : 'View Live Page')}
        </a>
      ),
    },
    project.figmaUrl && {
      label: 'Design',
      value: (
        <a
          href={project.figmaUrl}
          aria-label={`Open the ${project.title} design in Figma`}
          rel="noopener noreferrer"
          target="_blank"
        >
          View in Figma
        </a>
      ),
    },
  ].filter((row) => row && row.value)

  return (
    <section ref={projectDetailsRef} className={`${styles.projectIntro} container`}>
        <dl ref={ledgerRef} className={styles.ledger}>
            {rows.map((row) => (
                <div className={styles.ledgerRow} key={row.label}>
                    <dt className="text-uppercase">{row.label}</dt>
                    <dd>{row.value}</dd>
                </div>
            ))}
        </dl>

        {!hasCaseStudy &&
            <Description description={project._rawDetails} descriptionCustomClass="projectDescription"/>
        }
    </section>
  )
}

export default ProjectSingleDetails
