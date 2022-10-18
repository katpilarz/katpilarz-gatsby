import React from "react"
import Btn from "../globalComponents/btn";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);



const HomeSingleBtn = ({ }) => {
    const btnRef = useRef(null)


    useEffect(() => {
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        
        // eslint-disable no-empty-pattern

        let ctx = gsap.context(() => {
                const btnTl = gsap.timeline({
                    scrollTrigger: {
                    trigger: btnRef.current,
                    start: 'bottom -3000',
                    end:'+=100000',
                    pin: false, 
                    scrub:true, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                     }
                });
                    btnTl.from(btnRef.current, {
                        duration: 2,
                        ease: "power2.out",
                        css: {
                        autoAlpha: 0,
                        opacity:0,
                    }})
                    btnTl.to(btnRef.current, {
                        duration: 122,
                        ease: "power2.out",
                        css: {
                            rotation:360*5,
                    }})

        }, btnRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
        <div ref={btnRef} className='page-btn'>
            <Btn/>
        </div>
  )
}

export default HomeSingleBtn;