import React, { useState } from "react"
import * as styles from "./FAQList.module.scss";
import ArrowIcon from "../globalComponents/arrow";
import PortableText from "react-portable-text"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);








const FAQListItem = ({ item }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = useRef(null);
    const answer = useRef(null);
    const iconRef = useRef(null);
    const tl = useRef();
    
    

    const revealRefs = useRef([]);
    revealRefs.current = [];
 
    const addToRefs = el => {
        if (!revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };
   
    const toggleQuestion = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen)
   }




   useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {

        tl.current = gsap.timeline({
            onReverseComplete() {
              setIsOpen(false);
            }
          });

          // eslint-disable-next-line no-empty-pattern
          if (isOpen) {

                tl.current.from(toggle.current, {
                    duration: 1,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    opacity:0,
                    height:'2vw',
                }})
                tl.current.from(answer.current, {
                    delay:-.75,
                    duration: 1,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    opacity:0,
                    yPercent:'30',
                }})
                tl.current.from(iconRef.current, {
                    delay:-.75,
                    duration: 1,
                    ease: "power2.out",
                    css: {
                        rotation:'180deg'
                }})
                
          }

           
    }, toggle); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, [isOpen]);




  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {

          //Second Timeline to animate on scroll

          revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                autoAlpha: 0,
                xPercent:'-10',
            }, {
                duration: 1,
                autoAlpha: 1,
                xPercent:0,
                ease: "power4.out",
                stagger:2,
                delay:.97,
                scrollTrigger: {
                    id: `section-${index+1}`,
                    trigger: el,
                    start: 'top 80%',
                    end:'top 34%',
                    toggleActions: "restart pause resume none",
                    //toggleActions: 'play none none reverse',
                    refreshPriority: 1,
                    scrub:2,
                }
            });
     
        });


          
    }, revealRefs); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


   
   
  return (

    <article className={styles.faqItem} ref={addToRefs}>
        <button className={styles.question} onClick={toggleQuestion} aria-label={`Open FAQ: ${item.question}`}>
            <h5 className="question">{item.question}</h5>
            <div ref={iconRef}>
                <ArrowIcon arrowIconClass="pageIcon"/>
            </div>
        </button>
        { isOpen && 
            <div className={styles.answerWrapper} ref={toggle}>
                <div ref={answer} className={styles.answer}>
                    <PortableText
                        content={item._rawAnswer}
                        projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                        dataset={process.env.GATSBY_SANITY_DATASET}
                    />
                </div>
            </div>
        }
    </article>
      
  );
};

export default FAQListItem;