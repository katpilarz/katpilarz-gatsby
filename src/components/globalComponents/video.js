import React from "react";
import * as styles from "./video.module.scss";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);









const Video = ({ videoWebm, videoFallback, videoAlt, videoCustomClass, isDecriptionDisplayed }) => {

  const videoContainerRef = useRef(null);
  
  const videoRef = useRef(null);

  useEffect(() => {

   
     
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
  
  
        /* Make sure the video is 'activated' on iOS */
        function once(el, event, fn, opts) {
          var onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
          };
          el.addEventListener(event, onceFn, opts);
          return onceFn;
        }
        once(document.documentElement, "touchstart", function (e) {
          videoRef.current.play();
          videoRef.current.pause();
        });
  
  
  
      gsap.timeline({
        scrollTrigger: {
        trigger: videoContainerRef.current,
        start: 'top 65%',
        end: 'top -200%',
        scrub:1,
        onEnter: () => videoRef.current.play(),
        onEnterBack: () => videoRef.current.play(),
        onLeave: () => videoRef.current.pause(),
        onLeaveBack: () => videoRef.current.pause(),
        
        },
      });
  
  
    
      
  
    }, videoContainerRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  
  return (
    <figure ref={videoContainerRef}  className={`${styles.videoContainer} ${styles[videoCustomClass]}`}>
        <video className={styles.video} ref={videoRef}
            title={videoAlt ? `${videoAlt}` : null}
            loop muted autoPlay playsInline>
              {/* videoWebm &&
                  <source src={videoWebm.asset.url} type={`video/${videoWebm.asset.extension}`} />
  */}
              { videoFallback &&
                  <source src={videoFallback.asset.url} type={`video/${videoFallback.asset.extension}`} />
              }
            
            
        </video>
        { isDecriptionDisplayed ==='true' &&
            <figcaption>{videoAlt}</figcaption>
        }
    </figure>
  )
}

export default Video