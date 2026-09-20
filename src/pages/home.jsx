import React from 'react'
import Video from '../components/home/video'
import HomeHeroText from '../components/home/homeherotext'
import HomeBottomText from '../components/home/homebottomtext'

const Home = () => {
  return (
    <main className="home home-clean">
      <style>{`
        .home-clean{background:#020302!important;min-height:100svh;position:relative;overflow:hidden}.home-clean .home__scene{opacity:.8!important;transform:scale(1.08) translateX(7%)!important;transform-origin:80% center!important}.home-clean .home__scene::after{background:linear-gradient(90deg,#020302 0%,rgba(2,3,2,.96) 37%,rgba(2,3,2,.45) 59%,rgba(2,3,2,.04) 100%)!important}.home-clean .home__grid{opacity:.18!important;background-size:76px 76px!important;mask-image:linear-gradient(90deg,#000,transparent 68%)!important}.home-clean .home__glow,.home-clean .home__frame,.home-clean .home__credits,.home-clean .home__index,.home-clean .home__status,.home-clean .home__monogram,.home-clean .home__scroll{display:none!important}.home-clean .home-ref{position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center;min-height:100svh;width:min(690px,64vw);margin-left:clamp(30px,6vw,98px);padding:130px 0 78px;box-sizing:border-box}.home-clean .home-ref__availability{display:inline-flex;align-items:center;align-self:flex-start;gap:7px;margin:0 0 18px;border:1px solid rgba(61,236,193,.7);border-radius:5px;padding:5px 9px;color:#6ff4cc;font:600 9px Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase}.home-clean .home-ref__availability i{display:block;width:6px;height:6px;border-radius:50%;background:#6ff4cc}.home-clean .home-ref__name{margin:0 0 15px;color:#f1f6f3;font:400 clamp(1.45rem,2vw,2.2rem)/1 font2,Arial,sans-serif;letter-spacing:-.025em;text-transform:uppercase}.home-clean .home-ref__hero h1{display:block;margin:0;color:#f3f7f4;font:400 clamp(3.9rem,7vw,7.5rem)/.72 font3,Arial,sans-serif;letter-spacing:-.06em;text-transform:uppercase}.home-clean .home-ref__title-line{display:block!important}.home-clean .home-ref__title-line:first-child{margin-bottom:30px!important}.home-clean .home-ref__hero h1 em{background:linear-gradient(90deg,#12d9a5,#3edfd2 47%,#55aefe);background-clip:text;-webkit-background-clip:text;color:transparent;font:inherit;font-style:normal;white-space:nowrap}.home-clean .home-ref__description{max-width:400px;margin:34px 0 0;border-top:1px solid rgba(170,246,209,.25);padding-top:14px;color:#b8c3bd;font:400 13px/1.65 Arial,sans-serif}.home-clean .home-ref__bottom{margin-top:23px}.home-clean .home-ref__links{display:flex;gap:9px}.home-clean .home-ref__links a{border:1px solid rgba(238,247,242,.38);border-radius:999px;padding:5px 10px;color:#eff6f1;text-decoration:none;font:600 8px Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase}.home-clean .home-ref__links a:first-child{background:#3ce3cb;border-color:#3ce3cb;color:#06100e}.home-clean .home-ref__stats{display:flex;gap:46px;margin-top:14px}.home-clean .home-ref__stats div{display:flex;flex-direction:column;min-width:57px}.home-clean .home-ref__stats b{color:#f2f7f4;font:400 1.75rem/.85 font3,Arial,sans-serif}.home-clean .home-ref__stats span{margin-top:7px;color:#9aa9a1;font:600 7px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.home-clean .home-ref__monogram{position:absolute;z-index:1;right:8vw;bottom:-.16em;color:rgba(170,246,209,.045);font:400 clamp(10rem,22vw,25rem)/.7 font3,Arial,sans-serif;letter-spacing:-.14em;pointer-events:none}@media(max-width:760px){.home-clean .home__scene{opacity:.42!important;transform:scale(1.35) translateX(17%)!important}.home-clean .home-ref{width:auto;margin:0 22px;padding:102px 0 55px;justify-content:flex-end}.home-clean .home-ref__hero h1{font-size:clamp(3.6rem,14.5vw,5.5rem);line-height:.76}.home-clean .home-ref__title-line:first-child{margin-bottom:19px!important}.home-clean .home-ref__hero h1 em{white-space:normal}.home-clean .home-ref__description{max-width:320px;margin-top:29px;font-size:12px}.home-clean .home-ref__stats{gap:24px}.home-clean .home-ref__monogram{right:-12px;bottom:0;font-size:12rem}}
      `}</style>
      <style>{`
        .home-clean .home-ref__hero h1 em {
          background: none !important;
          color: inherit !important;
        }
        .home-clean .home-ref__hero h1 em span {
          display: block;
          background: linear-gradient(90deg, #12d9a5, #3edfd2 47%, #55aefe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .home-clean .home-ref__hero h1 em span + span { margin-top: 20px; }
        .home-clean .home-ref__name { margin-bottom: 32px !important; }
        .home-clean .home-ref__links { gap: 16px !important; }
        .home-clean .home-ref__links a {
          padding: 11px 21px !important;
          font-size: 12px !important;
        }
        @media (min-width: 761px) {
          .home-clean .home-ref { width: min(1100px, 85vw) !important; }
          .home-clean .home-ref__hero h1 { width: max-content; overflow: visible; }
        }
        @media (max-width: 760px) {
          .home-clean .home-ref__name { margin-bottom: 24px !important; }
          .home-clean .home-ref__links { gap: 10px !important; }
          .home-clean .home-ref__links a { padding: 10px 16px !important; font-size: 10px !important; }
          .home-clean .home-ref__hero h1 em span + span { margin-top: 14px; }
        }
      `}</style>
      <div className="home__scene" aria-hidden="true"><Video /></div>
      <div className="home__grid" aria-hidden="true" />
      <section className="home-ref"><HomeHeroText /><HomeBottomText /></section>
      <div className="home-ref__monogram" aria-hidden="true">10</div>
    </main>
  )
}

export default Home
