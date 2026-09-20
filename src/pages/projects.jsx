import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const projects = [
  { title: "Percentile Predictor", type: "AI / Education", image: "/projects/percentile.png", link: "https://github.com/praneetkamble/percentile-predictor", x: "4%", y: "5%", w: "34%", r: "-4deg", z: 3 },
  { title: "Redmagic Clone", type: "Web / Commerce", image: "/projects/redmagic.png", link: "https://github.com/praneetkamble/Redmagic_clone", x: "52%", y: "4%", w: "42%", r: "3deg", z: 2 },
  { title: "Creative Portfolio", type: "Web / Portfolio", image: "/projects/creative-portfolio.png", link: "https://github.com/praneetkamble", x: "15%", y: "39%", w: "36%", r: "-2deg", z: 5 },
  { title: "Recommendation Engine", type: "AI / Research", image: "/projects/recommendation.png", link: "https://praneetkamble-nwat7mvxj-praneetkambles-projects.vercel.app", x: "59%", y: "40%", w: "34%", r: "5deg", z: 4 },
  { title: "Resume Analyzer", type: "AI / Career", image: "/projects/resume.png", link: "https://github.com/praneetkamble/resume_analyser", x: "4%", y: "73%", w: "31%", r: "3deg", z: 2 },
  { title: "Influencer Portfolio", type: "Web / Creator", image: "/projects/influencer.png", link: "https://mau-portfolio-one.vercel.app", x: "48%", y: "72%", w: "43%", r: "-4deg", z: 3 },
];

function MessyCard({ project, index, boardRef, raise }) {
  const card = useRef(null); const drag = useRef({ active: false, x: 0, y: 0, left: 0, top: 0, moved: false });
  const down = (event) => { const el = card.current; const board = boardRef.current.getBoundingClientRect(); const rect = el.getBoundingClientRect(); drag.current = { active: true, x: event.clientX, y: event.clientY, left: rect.left - board.left, top: rect.top - board.top, moved: false }; el.setPointerCapture(event.pointerId); el.style.setProperty("left", `${drag.current.left}px`, "important"); el.style.setProperty("top", `${drag.current.top}px`, "important"); el.style.zIndex = raise(); };
  const move = (event) => { const d = drag.current; if (!d.active) return; const board = boardRef.current.getBoundingClientRect(); const el = card.current; const left = Math.max(8, Math.min(board.width - el.offsetWidth - 8, d.left + event.clientX - d.x)); const top = Math.max(8, Math.min(board.height - el.offsetHeight - 8, d.top + event.clientY - d.y)); if (Math.abs(event.clientX - d.x) + Math.abs(event.clientY - d.y) > 6) d.moved = true; el.style.setProperty("left", `${left}px`, "important"); el.style.setProperty("top", `${top}px`, "important"); };
  const up = () => { drag.current.active = false; };
  return <a ref={card} href={project.link} target="_blank" rel="noreferrer" className="messy-card" data-x={project.x} data-y={project.y} data-z={project.z} style={{ left: project.x, top: project.y, width: project.w, zIndex: project.z, "--rotate": project.r }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClick={(event) => { if (drag.current.moved) event.preventDefault(); }}>
    <div className="messy-card__image"><img src={project.image} alt={`${project.title} preview`} /><span>{String(index + 1).padStart(2, "0")}</span></div><div className="messy-card__caption"><p>{project.type}</p><h2>{project.title}</h2><b>↗</b></div>
  </a>;
}

export default function Projects() {
  const root = useRef(null); const board = useRef(null); const layer = useRef(20);
  const reset = () => board.current.querySelectorAll(".messy-card").forEach((card) => { card.style.setProperty("left", card.dataset.x, "important"); card.style.setProperty("top", card.dataset.y, "important"); card.style.zIndex = card.dataset.z; });
  useGSAP(() => { gsap.fromTo(".messy-title", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }); gsap.fromTo(".messy-card", { opacity: 0 }, { opacity: 1, duration: .65, stagger: .1, delay: .12, ease: "power2.out" }); }, { scope: root });
  return <main ref={root} className="messy-page"><header className="messy-head"><p>Selected work · 2025—26</p><h1 className="messy-title">Projects</h1><div><span>Arrange the work your way</span><button onClick={reset}>Reset board ↻</button></div></header><section ref={board} className="messy-board"><div className="messy-board__hint">Drag any card</div>{projects.map((project, index) => <MessyCard key={project.title} project={project} index={index} boardRef={board} raise={() => ++layer.current} />)}</section><footer className="messy-footer"><span>© Praneet Kamble</span><a href="/contact">Let’s work together ↗</a></footer></main>;
}
