import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/src/all";
import gsap from "gsap";
import Lenis from "lenis";
import img1 from "../components/about/img1.png";
import img2 from "../components/about/img2.png";
import img3 from "../components/about/img3.png";
import img4 from "../components/about/img4.png";
import img5 from "../components/about/img5.png";
import img6 from "../components/about/img6.png";
import TechStack from "../components/about/TechStack";


const About = () => {

  gsap.registerPlugin(ScrollTrigger);

  const imageDivRef = useRef(null);
  const whatido = useRef(null);
  const whatidoBox1 = useRef(null);
  const card = useRef(null);
  const objectContainer = useRef(null);

  const imageArray = [img1, img2, img3, img4, img5, img6];

  const serviceData = {

    websites: {
      title: "WEBSITES",
      description:
        "I create modern, responsive and highly interactive websites using React, GSAP, Three.js and Tailwind CSS. Every website is designed with smooth animations, excellent performance and intuitive user experiences."
    },

    ai: {
      title: "AI APPLICATIONS",
      description:
        "I build intelligent desktop and web applications powered by local AI models, Gemini, Python and custom automation workflows. My focus is on practical AI that solves real-world problems."
    },

    automation: {
      title: "AUTOMATIONS",
      description:
        "I automate repetitive business workflows using Python, APIs, AI agents and n8n. The goal is to save time, reduce manual work and improve overall productivity."
    },

    ui: {
      title: "UI / UX",
      description:
        "I design minimal, modern and visually engaging interfaces with smooth motion, thoughtful typography and user-centered interactions that create memorable digital experiences."
    }

  };

  const [selected, setSelected] = useState("websites");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {

    const text = serviceData[selected].description;

    setTypedText("");

    let index = 0;

    const interval = setInterval(() => {

      setTypedText(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(interval);
      }

    }, 18);

    return () => clearInterval(interval);

  }, [selected]);

  useGSAP(() => {

    gsap.fromTo(
      whatido.current,
      {
        opacity: 0,
        y: 120,
        scale: 0.8,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: whatido.current,
          start: "top 85%",
          end: "top 45%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      whatidoBox1.current,
      {
        opacity: 0,
        y: 150,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: whatidoBox1.current,
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      }
    );

    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 19.5%",
        end: "top -80%",
        scrub: true,
        pin: true,

        onUpdate: (self) => {

          const imageIndex = Math.floor(
            self.progress * (imageArray.length - 1)
          );

          imageDivRef.current.querySelector("img").src =
            imageArray[imageIndex];
        },
      },
    });

    gsap.from(card, {

            x: gsap.utils.random(-800, 800),
            y: gsap.utils.random(-500, -200),

            rotation: gsap.utils.random(-180, 180),

            scale: 0,

            opacity: 0,

            duration: gsap.utils.random(1.2, 2),

            ease: "bounce.out"

        });

        

    

    

    

  });

  return (

    <div>

      <div className="sec-1">
        <div ref={imageDivRef} className="absolute overflow-hidden rounded-4xl h-[25vw] w-[20vw] top-42 left-90 border border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3),0_0_25px_rgba(255,255,255,0.15)]">
          <img className="h-full w-full object-cover" src={img1} alt=""/>
        </div> 
        <div className="relative">
          <div className="mt-[30vw]">
            <h1 className="text-[15vw] font-[font1] leading-[15vw] text-center">Know Me<br />Better</h1>
          </div>
          <div className="pl-[40%] mt-20"><p className="text-4xl font-[font7]"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  I build software that solves real problems and creates meaningful experiences. As a Computer Engineering student, I specialize in developing AI applications, modern websites, desktop software, and automation systems. I believe great software is more than just code,it should be fast, intuitive, visually refined, and designed with users in mind. Every project I create is an opportunity to learn, innovate, and push the boundaries of what's possible.</p>
          </div>
        </div>
      </div>

      <div className="sec2">
        <div className="relative w-full min-h-screen bg-black mt-50">
          <h1 ref={whatido} className="font-[font3] text-[8vw] text-center text-white"> What I Do </h1>
          <div ref={whatidoBox1} className="w-[90%] h-[700px] mx-auto flex rounded-[50px] p-8 gap-8 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ background: "rgba(12,12,18,0.9)" }}>

            <div className="h-full w-[60%] rounded-[40px] p-14 flex flex-col justify-center border border-white/10" style={{ background: "rgba(18,18,28,0.95)" }}>
              <h1 className="font-[font3] text-7xl text-white">
                {serviceData[selected].title}
              </h1>
              <div className="w-40 h-[2px] mt-6 mb-10" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)" }}></div>
              <p className="text-3xl font-[font7] leading-[1.8] text-white/70"> {typedText}<span className="animate-pulse text-white">|</span></p>
            </div>

            <div className="h-full w-[40%] rounded-[40px] flex flex-col justify-center items-center gap-4 p-5 border border-white/10" style={{ background: "rgba(14,14,22,0.95)" }}>

              <div onMouseEnter={() => setSelected("websites")} className={`w-[90%] h-20 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 border ${
                    selected === "websites"
                    ? "bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white hover:bg-white/5"
                     }`}>
                   <h2 className="font-[font7] text-4xl">Websites</h2>
               </div>

               <div onMouseEnter={() => setSelected("ai")} className={`w-[90%] h-20 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 border ${
                selected === "ai"
                    ? "bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white hover:bg-white/5"
                     }`}>
                    <h2 className="font-[font7] text-4xl">AI Applications</h2>
               </div>

                <div onMouseEnter={() => setSelected("automation")} className={`w-[90%] h-20 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 border ${
                 selected === "automation"
                    ? "bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white hover:bg-white/5"
                     }`}>
                    <h2 className="font-[font7] text-4xl"> Automations</h2>
                 </div>

                <div onMouseEnter={() => setSelected("ui")} className={`w-[90%] h-20 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 border ${
                 selected === "ui"
                    ? "bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white hover:bg-white/5"
                     }`}>
                    <h2 className="font-[font7] text-4xl"> UI / UX</h2>
                </div>
          </div>
        </div>
      </div>
      </div>

      <div className='sec3'>
        <div className='h-screen w-full bg-black mt-80 flex flex-col justify-center items-center'>
          <div className='relative h-[90%] w-[90%] bg-black flex flex-col items-stretch border-8 border-white rounded-[80px] shadow-[0_0_8px_rgba(255,255,255,0.3),0_0_25px_rgba(255,255,255,0.15)] overflow-hidden'>
            <div className='text-white flex flex-col items-center pt-10 pb-4 relative z-10 shrink-0'>
              <h1 className="font-[font3] text-[7vw] leading-none uppercase">
                Tech Stack
              </h1>
              <p className="font-[font7] text-2xl text-neutral-400 mt-5 text-center max-w-2xl">
                Technologies I use to build modern digital experiences.
              </p>
            </div>
            <div className='flex-1 relative min-h-0'>
              <TechStack />
            </div>
          </div>
        </div>  
      </div>
    </div>
  );  

}

export default About;
