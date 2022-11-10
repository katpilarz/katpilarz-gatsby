import React from "react"
import Btn from "../globalComponents/btn";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);




const AnimatedBtn = ({ isHome }) => {

    const btnRef = useRef(null)


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {

            if(isHome){

                const btnTl1 = gsap.timeline({
                    scrollTrigger: {
                    trigger: btnRef.current,
                    start: 'bottom -100%',
                    end:'+=100000',
                    pin: false, 
                    scrub:true, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                     }
                });
                    btnTl1.from(btnRef.current, {
                        duration: 1,
                        ease: "power2.out",
                        css: {
                        autoAlpha: 0,
                        opacity:0,
                    }})
                    btnTl1.to(btnRef.current, {
                        duration: 36,
                        ease: "power2.out",
                        css: {
                            rotation:360*9,
                    }},'-=1')

            }

            else{
                const btnTl = gsap.timeline({
                    scrollTrigger: {
                    trigger: btnRef.current,
                    start: 'top top',
                    end:'+=100000',
                    pin: false, 
                    scrub:true, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                     }
                });
                    btnTl.from(btnRef.current, {
                        duration: 1,
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
                            position:'fixed',
                            top:'3vw',
                            right:'3.5vw'
                    }},'-=1')
            }

                

      
        }, btnRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, [isHome]);

  
  return (
        <div ref={btnRef} className='page-btn animated-btn'>
            <Btn/>
        </div>
  )
}

export default AnimatedBtn;