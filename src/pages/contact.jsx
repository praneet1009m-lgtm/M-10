import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Contact() {
  const root = useRef(null);
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".contact-v2__hello", { yPercent: 55 }, { yPercent: 0, duration: 1.05 })
      .fromTo(".contact-v2__reveal", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .09 }, "-=.55");
  }, { scope: root });

  return <main ref={root} className="contact-v2">
    <div className="contact-v2__noise" />
    <header className="contact-v2__bar contact-v2__reveal"><span>04 / Contact</span><span>India · working worldwide</span></header>
    <section className="contact-v2__hero">
      <div className="contact-v2__word"><h1 className="contact-v2__hello"><span className="contact-v2__hello-solid">HEL</span><span className="contact-v2__hello-outline">LO</span><i>.</i></h1></div>
      <div className="contact-v2__pitch contact-v2__reveal"><p className="contact-v2__eyebrow">A good place to start</p><h2>Tell me what<br />you’re <em>making.</em></h2><p className="contact-v2__copy">Whether it is a new product, a sharper digital presence, or a workflow that needs simplifying, I’d love to hear the idea.</p><a href="mailto:praneetkamble051112@gmail.com">praneetkamble051112@gmail.com <b>↗</b></a></div>
    </section>
    <section className="contact-v2__lower contact-v2__reveal">
      <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="contact-v2__form">
        <p>Write a note</p><label>Your name<input name="name" required placeholder="How should I call you?" /></label><label>Email<input name="email" type="email" required placeholder="Where can I reply?" /></label><label>The project<textarea name="message" required placeholder="A short outline is perfect." /></label><button type="submit"><span>{sent ? "Thanks — I’ll be in touch." : "Send it over"}</span><b>↗</b></button>
      </form>
      <aside className="contact-v2__aside"><div><span>Availability</span><strong>Selected freelance work<br />from October 2026</strong></div><div><span>Response time</span><strong>Usually within 24 hours</strong></div><div className="contact-v2__socials"><a href="https://github.com/praneetkamble" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/praneet-kamble-1b03b13a5" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/kamblepraneet/" target="_blank" rel="noreferrer">Instagram ↗</a></div></aside>
    </section>
    <footer className="contact-v2__foot contact-v2__reveal"><span>© 2026 Praneet Kamble</span><span>Built with care, from India</span></footer>
  </main>;
}
