import React, { useRef, useContext, useEffect } from "react";
import project1 from "../navigation/project1.png";
import about from "../navigation/about.png";
import contact from "../navigation/contact.png";
import services from "../navigation/services.png";
import logo from "../navigation/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavBarContext } from "../../context/NavContext";
import { useNavigate } from "react-router-dom";

const FullScreenNav = () => {
  const fullLinkNavRef = useRef(null);
  const fullScreenRef = useRef(null);
  const tl = useRef(null);
  const navigate = useNavigate();

  const [NavOpen, setNavOpen] = useContext(NavBarContext);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.from(".stairing", {
      delay: 0.10,
      height: 0,
      stagger: {
        amount: -0.25,
      },
    });

    tl.current.from(
      fullLinkNavRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2"
    );

    tl.current.from(
      ".link",
      {
        opacity: 0,
        rotateX: 90,
        stagger: {
          amount: 0.2,
        },
      },
      "-=0.2"
    );
  }, []);

  useEffect(() => {
    if (!tl.current) return;

    if (NavOpen) {
      fullScreenRef.current.style.display = "block";
      tl.current.play();
    } else {
      tl.current.reverse();

      tl.current.eventCallback("onReverseComplete", () => {
        fullScreenRef.current.style.display = "none";
      });
    }
  }, [NavOpen]);

  const goTo = (path) => {
    setNavOpen(false);
    navigate(path);
  };

  return (
    <div
      ref={fullScreenRef}
      id="full-screen-nav"
      style={{ display: "none" }}
      className="fixed top-0 left-0 h-screen w-full overflow-hidden z-[999]"
    >
      <div className="fixed h-full w-full">
        <div className="flex h-full w-full">
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
        </div>
      </div>

      <div ref={fullLinkNavRef} className="relative">
        <div className="flex w-full justify-between items-start">
          <button onClick={() => goTo("/")} className="p-5 cursor-pointer" aria-label="Go to home">
            <img src={logo} alt="Logo" className="w-40 h-16" />
          </button>

          <div
            onClick={() => setNavOpen(false)}
            className=" group h-30 w-30 mr-5 relative cursor-pointer">
            <div className="absolute h-[10vw] w-[2px] bg-gray-500 group-hover:bg-white transition-colors duration-300 -rotate-45 origin-top rounded-full"></div>
            <div className="absolute right-0 h-[10vw] w-[2px] bg-gray-500 group-hover:bg-white transition-colors duration-300 rotate-45 origin-top rounded-full"></div>

          </div>
        </div>

        <div id="all-links" className="py-35">

          {/* PROJECTS */}

          <button onClick={() => goTo("/projects")} className="link origin-top relative block w-full border-t border-white cursor-pointer">
            <h1 className="font-[font3] lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-2 pt-3 uppercase">
              Projects
            </h1>

            <div className="moveLink absolute text-black flex top-0 bg-white w-full h-full items-center justify-center">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  View My Projects
                </h2>
                <img
                  className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover"
                  src={project1}
                  alt=""
                />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  View My Projects
                </h2>
                <img
                  className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover"
                  src={project1}
                  alt=""
                />
              </div>

              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  View My Projects
                </h2>
                <img
                  className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover"
                  src={project1}
                  alt=""
                />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  View My Projects
                </h2>
                <img
                  className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover"
                  src={project1}
                  alt=""
                />
              </div>
            </div>
          </button>

          {/* ABOUT */}

          <button onClick={() => goTo("/about")} className="link origin-top relative block w-full border-t border-white cursor-pointer">
            <h1 className="font-[font3] lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-2 pt-3 uppercase">
              About
            </h1>

            <div className="moveLink absolute text-black flex top-0 bg-white w-full h-full items-center justify-center">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  ??Who Am I??
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={about} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  ??Who Am I??
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={about} alt="" />
              </div>

              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  ??Who Am I??
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={about} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  ??Who Am I??
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={about} alt="" />
              </div>
            </div>
          </button>

          {/* SERVICES */}

          <button onClick={() => goTo("/services")} className="link origin-top relative block w-full border-t border-white cursor-pointer">
            <h1 className="font-[font3] lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-2 pt-3 uppercase">
              Services
            </h1>

            <div className="moveLink absolute text-black flex top-0 bg-white w-full h-full items-center justify-center">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Services provided by us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={services} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Services provided by us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={services} alt="" />
              </div>

              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Services provided by us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={services} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Services provided by us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={services} alt="" />
              </div>
            </div>
          </button>

          {/* CONTACT */}

          <button onClick={() => goTo("/contact")} className="link origin-top relative block w-full border-y border-white cursor-pointer">
            <h1 className="font-[font3] lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-2 pt-3 uppercase">
              Contact
            </h1>

            <div className="moveLink absolute text-black flex top-0 bg-white w-full h-full items-center justify-center">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Contact Us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={contact} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Contact Us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={contact} alt="" />
              </div>

              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Contact Us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={contact} alt="" />
                <h2 className="whitespace-nowrap font-[font2] lg:text-[6vw] text-5xl uppercase">
                  Contact Us
                </h2>
                <img className="lg:h-16 h-8 rounded-full shrink-0 lg:w-96 w-32 object-cover" src={contact} alt="" />
              </div>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
