import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const services = [
  { id: "01", title: "Websites", note: "Fast, considered sites that make a clear first impression.", detail: "Strategy, design, React development, motion, and responsive implementation for portfolios, products, and brands." },
  { id: "02", title: "AI applications", note: "Useful AI systems, designed around real work.", detail: "Interfaces and workflows that connect models, data, and people without making the product feel complicated." },
  { id: "03", title: "Automations", note: "Less manual work. More room for the work that matters.", detail: "Python, APIs, n8n, and AI agents that turn repetitive tasks into dependable background systems." },
  { id: "04", title: "UI / UX", note: "Interfaces with a point of view and a reason for every detail.", detail: "Interaction design, visual systems, prototypes, and polished front-end experiences built to be used." },
];

export default function Services() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.fromTo(".service-reveal", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: "power3.out" });
  }, { scope: root });

  return <main ref={root} className="services-page">
    <div className="services-orbit" />
    <header className="services-head service-reveal"><span>03 — Services</span><span>Available for selected collaborations</span></header>
    <section className="services-intro service-reveal"><p>What I do</p><h1>Digital work<br />with <em>purpose.</em></h1><div>I work at the intersection of product thinking, code, and clear visual design.</div></section>
    <section className="services-list service-reveal">
      {services.map((service, index) => <button key={service.id} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={`service-row ${active === index ? "is-active" : ""}`}>
        <span className="service-number">{service.id}</span><span className="service-title">{service.title}</span><span className="service-note">{service.note}</span><span className="service-arrow">↗</span>
      </button>)}
    </section>
    <section className="services-detail service-reveal"><span>Selected focus — {services[active].title}</span><p>{services[active].detail}</p><a href="/contact">Start a conversation <b>↗</b></a></section>
  </main>;
}
