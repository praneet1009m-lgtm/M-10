import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const technologies = [
  { id: "js", name: "JAVASCRIPT", sub: "Language", color: "#F0DB4F", logo: "/tech-logos/javascript.svg" },
  { id: "python", name: "PYTHON", sub: "Language", color: "#3776AB", logo: "/tech-logos/python.svg" },
  { id: "java", name: "JAVA", sub: "Language", color: "#ED8B00", logo: "/tech-logos/java.svg" },
  { id: "c", name: "C/C++", sub: "Language", color: "#00599C", logo: "/tech-logos/c.svg" },
  { id: "react", name: "REACT", sub: "UI Library", color: "#61DAFB", logo: "/tech-logos/react.svg" },
  { id: "node", name: "NODE.JS", sub: "Runtime", color: "#68A063", logo: "/tech-logos/nodejs.svg" },
  { id: "express", name: "EXPRESS", sub: "Backend Framework", color: "#FFFFFF", logo: "/tech-logos/express.svg" },
  { id: "mongodb", name: "MONGODB", sub: "Database", color: "#47A248", logo: "/tech-logos/mongodb.svg" },
  { id: "git", name: "GIT", sub: "VCS", color: "#F34F29", logo: "/tech-logos/git.svg" },
];

function loadImages() {
  return Promise.all(
    technologies.map(
      (tech) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ ...tech, img });
          img.onerror = () => resolve({ ...tech, img: null });
          img.src = tech.logo;
        })
    )
  );
}

function drawGrid(ctx, w, h) {
  const sp = 60;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.025)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += sp) {
    ctx.beginPath();
    ctx.moveTo(x, h * 0.6);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = Math.floor(h * 0.6); y < h; y += sp) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawParticles(ctx, particles) {
  ctx.save();
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = p.bw;
    if (p.x > p.bw) p.x = 0;
    if (p.y < 0) p.y = p.bh;
    if (p.y > p.bh) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d = Math.hypot(dx, dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

function drawBox(ctx, body, bw, bh) {
  const tech = body.plugin?.tech;
  if (!tech) return;
  const cx = body.position.x;
  const cy = body.position.y;
  const angle = body.angle;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  const hw = bw / 2;
  const hh = bh / 2;
  const rd = 14;

  ctx.beginPath();
  ctx.moveTo(-hw + rd, -hh);
  ctx.lineTo(hw - rd, -hh);
  ctx.quadraticCurveTo(hw, -hh, hw, -hh + rd);
  ctx.lineTo(hw, hh - rd);
  ctx.quadraticCurveTo(hw, hh, hw - rd, hh);
  ctx.lineTo(-hw + rd, hh);
  ctx.quadraticCurveTo(-hw, hh, -hw, hh - rd);
  ctx.lineTo(-hw, -hh + rd);
  ctx.quadraticCurveTo(-hw, -hh, -hw + rd, -hh);
  ctx.closePath();

  const bg = ctx.createLinearGradient(-hw, -hh, hw, hh);
  bg.addColorStop(0, "rgba(16, 16, 24, 0.93)");
  bg.addColorStop(0.4, "rgba(10, 10, 16, 0.89)");
  bg.addColorStop(1, "rgba(6, 6, 12, 0.91)");
  ctx.fillStyle = bg;
  ctx.fill();

  ctx.shadowColor = tech.color + "30";
  ctx.shadowBlur = 45;
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  const tg = ctx.createLinearGradient(-hw, -hh, -hw, hh);
  tg.addColorStop(0, tech.color + "18");
  tg.addColorStop(0.5, "transparent");
  tg.addColorStop(1, tech.color + "06");
  ctx.fillStyle = tg;
  ctx.fill();

  const rg = ctx.createLinearGradient(-hw, -hh, -hw, 0);
  rg.addColorStop(0, "rgba(255,255,255,0.09)");
  rg.addColorStop(1, "transparent");
  ctx.fillStyle = rg;
  ctx.fill();

  if (tech.img) {
    const imgS = bh * 0.48;
    ctx.drawImage(tech.img, -hw + bw * 0.08, -imgS / 2, imgS, imgS);
  }

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = `700 ${bh * 0.2}px "Modern Cyber", sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(tech.name, -hw + bw * 0.34, -hh * 0.12);

  ctx.beginPath();
  ctx.moveTo(-hw + bw * 0.34, hh * 0.18);
  ctx.lineTo(-hw + bw * 0.6, hh * 0.18);
  ctx.strokeStyle = tech.color + "45";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = `400 ${bh * 0.14}px "Savery", sans-serif`;
  ctx.textAlign = "left";
  ctx.fillText(tech.sub, -hw + bw * 0.34, hh * 0.42);

  ctx.restore();
}

const TechStack = () => {
  const containerRef = useRef(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const bootedRef = useRef(false);
  const canvasRef = useRef(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 50 && r.height > 50) {
        dimsRef.current = { w: r.width, h: r.height };
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    let intersected = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !intersected) {
            intersected = true;
            setTrigger((t) => t + 1);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (trigger === 0 || bootedRef.current) return;
    bootedRef.current = true;

    const el = containerRef.current;
    if (!el) return;

    const {
      Engine, Render, Runner, Bodies, Composite,
      Mouse, MouseConstraint, Events, Body,
    } = Matter;

    const { w, h } = dimsRef.current;
    if (w < 50 || h < 50) {
      bootedRef.current = false;
      return;
    }

    let nudgeTimer = null;
    let disposed = false;

    loadImages().then((techData) => {
      if (disposed || !el.isConnected) return;

      const engine = Engine.create({ gravity: { x: 0, y: 0.45, scale: 0.001 } });

      const render = Render.create({
        element: el,
        engine,
        options: {
          width: w, height: h,
          wireframes: false,
          background: "transparent",
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        },
      });

      const c = render.canvas;
      canvasRef.current = c;
      c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:auto;";

      const bw = Math.min(280, w * 0.22);
      const bh = bw * 0.52;

      const walls = [
        Bodies.rectangle(w / 2, -200, w + 300, 400, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(w / 2, h + 40, w + 300, 80, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-40, h / 2, 80, h + 300, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(w + 40, h / 2, 80, h + 300, { isStatic: true, render: { visible: false } }),
      ];

      const placed = [];
      const techBodies = techData.map((tech) => {
        const mx = 90;
        const uW = Math.max(100, w - mx * 2 - bw);
        let x, att = 0;
        do {
          x = mx + bw / 2 + Math.random() * uW;
          att++;
        } while (att < 200 && placed.some(p => Math.abs(p.x - x) < bw * 1.1));
        placed.push({ x });

        const fallY = -bh * 0.5 - Math.random() * 140;

        return Bodies.rectangle(x, fallY, bw, bh, {
          restitution: 0.6,
          friction: 0.5,
          frictionAir: 0.03,
          density: 0.004,
          chamfer: { radius: 14 },
          angle: (Math.random() - 0.5) * 0.5,
          render: { fillStyle: "transparent", strokeStyle: "transparent", lineWidth: 0 },
          label: tech.id,
          plugin: { tech },
        });
      });

      Composite.add(engine.world, [...walls, ...techBodies]);

      const mouse = Mouse.create(c);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.12, damping: 0.15, render: { visible: false } },
      });
      render.mouse = mouse;
      Composite.add(engine.world, mc);

      const runner = Runner.create();
      Runner.run(runner, engine);

      const pCount = Math.max(8, Math.floor((w * h) / 25000));
      const particles = Array.from({ length: pCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.3 + 0.05,
        bw: w,
        bh: h,
      }));

      Events.on(render, "afterRender", () => {
        try {
          const ctx = render.context;
          ctx.clearRect(0, 0, w, h);
          drawGrid(ctx, w, h);
          drawParticles(ctx, particles);
          Composite.allBodies(engine.world).forEach((body) => {
            if (body.plugin?.tech) drawBox(ctx, body, bw, bh);
          });
        } catch (err) {
          /* keep render loop alive */
        }
      });

      Render.run(render);

      const nudge = () => {
        techBodies.forEach((b) => {
          if (!b.isStatic) {
            const f = 0.00003 * b.mass;
            Body.applyForce(b, b.position, {
              x: (Math.random() - 0.5) * f,
              y: (Math.random() - 0.5) * f * 0.5,
            });
          }
        });
      };
      nudgeTimer = setInterval(nudge, 6000);

      canvasRef.current.__cleanup = () => {
        if (nudgeTimer) clearInterval(nudgeTimer);
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(engine.world);
        Engine.clear(engine);
        render.textures = {};
      };
    });

    return () => {
      disposed = true;
      if (canvasRef.current && canvasRef.current.__cleanup) {
        canvasRef.current.__cleanup();
        if (canvasRef.current.parentNode) {
          canvasRef.current.parentNode.removeChild(canvasRef.current);
        }
        canvasRef.current = null;
      }
    };
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ touchAction: "none", pointerEvents: "auto" }}
    />
  );
};

export default TechStack;