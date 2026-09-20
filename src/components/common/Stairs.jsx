import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";


const Stairs = (props) => {

    const currentPath = useLocation().pathname;
    console.log(currentPath);

  const stairParentRef = useRef(null);
  const pageref = useRef(null);                                         

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.set(stairParentRef.current, {
      display: "block",
    });

    tl.from(".stair", {
      height: 0,
      stagger: {
        amount: -0.25,
      },
    });

    tl.to(".stair", {
      y: "100%",
      stagger: {
        amount: -0.25,
      },
    });

    tl.set(stairParentRef.current, {
      display: "none",
      
    });

    tl.to(".stair", {
      y: 0,
      height: "100%",
    })

    gsap.from(pageref.current, {
        opacity: 0,
        delay: 1,
        
    });

  },[currentPath]);


   console.log(props.children)



  return (
    <div>
        <h1></h1>
        <div ref={stairParentRef} className="fixed top-0 left-0 z-10 hidden h-screen w-full">
        <div className="flex h-full">
             <div className="stair h-full w-1/5 bg-gray-300"></div>
             <div className="stair h-full w-1/5 bg-gray-300"></div>
             <div className="stair h-full w-1/5 bg-gray-300"></div>
             <div className="stair h-full w-1/5 bg-gray-300"></div>
             <div className="stair h-full w-1/5 bg-gray-300"></div>
        </div>
        </div>
        <div ref={pageref} >
             {props.children}
        </div>
    </div>

  );
};

export default Stairs;  