import { useState, useEffect, useCallback } from "react";
import * as api from "./api/hshApi";

import logoWhite from "./assets/logo-white.png";
import logoBlue  from "./assets/logo-blue.png";
import logoFull  from "./assets/logo-full.png";

/* ============================================================
   HOLY SPIRIT HUB — Full Website (Frontend + Backend Wired)
   API: https://api.holyspirithub.international
============================================================ */

// ── Global Styles ─────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --blue:#1a0aff;--blue-dark:#0f06b3;--blue-light:#3d30ff;
      --blue-glow:rgba(26,10,255,.18);--gold:#c9a84c;--gold-light:#e8c96a;
      --gold-pale:rgba(201,168,76,.12);--white:#fff;--off-white:#f8f7f4;
      --grey-light:#f0eff8;--grey:#8a8a9a;--dark:#0a0820;--text:#1a1a2e;
      --ff-head:'Cormorant Garamond',serif;--ff-body:'DM Sans',sans-serif;
    }
    html{scroll-behavior:smooth;}
    body{font-family:var(--ff-body);color:var(--text);background:var(--white);overflow-x:hidden;line-height:1.6;}
    h1,h2,h3,h4{font-family:var(--ff-head);line-height:1.2;}
    a{text-decoration:none;color:inherit;}
    img{max-width:100%;display:block;}
    button{cursor:pointer;border:none;background:none;font-family:var(--ff-body);}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:var(--dark);}
    ::-webkit-scrollbar-thumb{background:var(--blue);border-radius:3px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes pulse-ring{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}
    @keyframes drift{0%{transform:translateX(0) translateY(0) rotate(0deg)}33%{transform:translateX(30px) translateY(-20px) rotate(120deg)}66%{transform:translateX(-20px) translateY(10px) rotate(240deg)}100%{transform:translateX(0) translateY(0) rotate(360deg)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}

    .section{padding:90px 0;} .section-sm{padding:60px 0;}
    .container{max-width:1200px;margin:0 auto;padding:0 24px;}
    .btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:white;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:500;letter-spacing:.02em;transition:all .3s;box-shadow:0 4px 20px var(--blue-glow);}
    .btn-primary:hover{background:var(--blue-dark);transform:translateY(-2px);box-shadow:0 8px 30px rgba(26,10,255,.35);}
    .btn-primary:disabled{opacity:.6;cursor:not-allowed;transform:none;}
    .btn-gold{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--dark);padding:14px 32px;border-radius:50px;font-size:15px;font-weight:600;letter-spacing:.02em;transition:all .3s;}
    .btn-gold:hover{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 30px rgba(201,168,76,.4);}
    .btn-gold:disabled{opacity:.6;cursor:not-allowed;transform:none;}
    .btn-outline{display:inline-flex;align-items:center;gap:8px;border:2px solid var(--blue);color:var(--blue);padding:12px 30px;border-radius:50px;font-size:15px;font-weight:500;transition:all .3s;}
    .btn-outline:hover{background:var(--blue);color:white;transform:translateY(-2px);}
    .btn-ghost{display:inline-flex;align-items:center;gap:8px;border:2px solid rgba(255,255,255,.5);color:white;padding:12px 30px;border-radius:50px;font-size:15px;font-weight:500;transition:all .3s;}
    .btn-ghost:hover{border-color:white;background:rgba(255,255,255,.1);}
    .label{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
    .label::before{content:'';width:24px;height:2px;background:var(--gold);}
    .section-title{font-size:clamp(32px,5vw,52px);font-weight:600;color:var(--dark);margin-bottom:16px;}
    .section-title em{color:var(--blue);font-style:italic;}
    .section-sub{font-size:17px;color:var(--grey);max-width:560px;line-height:1.7;}
    .divider{width:60px;height:3px;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:2px;margin:20px 0;}
    .card{background:white;border-radius:20px;border:1px solid rgba(26,10,255,.08);padding:32px;transition:all .3s;box-shadow:0 2px 20px rgba(0,0,0,.05);}
    .card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,10,255,.12);border-color:rgba(26,10,255,.2);}
    .page-hero{background:linear-gradient(135deg,var(--dark) 0%,#0f0640 50%,#1a0aff22 100%);padding:140px 0 80px;text-align:center;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(26,10,255,.3) 0%,transparent 70%);}
    .page-hero h1{font-size:clamp(40px,6vw,72px);color:white;position:relative;z-index:1;}
    .page-hero p{color:rgba(255,255,255,.7);font-size:18px;max-width:560px;margin:16px auto 0;position:relative;z-index:1;}
    .form-group{margin-bottom:20px;}
    .form-label{display:block;font-size:14px;font-weight:500;margin-bottom:8px;}
    .form-input{width:100%;padding:13px 16px;border:1px solid rgba(26,10,255,.15);border-radius:12px;font-size:15px;font-family:var(--ff-body);transition:border-color .2s;outline:none;color:var(--text);background:#fafafa;}
    .form-input:focus{border-color:var(--blue);background:white;box-shadow:0 0 0 3px rgba(26,10,255,.06);}
    textarea.form-input{min-height:120px;resize:vertical;}
    .spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
    .spinner-dark{border-color:rgba(26,10,255,.2);border-top-color:var(--blue);}
    .toast{position:fixed;top:90px;right:24px;z-index:9999;padding:14px 22px;border-radius:14px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.15);animation:slideDown .3s ease;max-width:340px;}
    .toast-ok{background:#0f0640;color:white;border-left:4px solid var(--gold);}
    .toast-err{background:#fff1f2;color:#be123c;border-left:4px solid #be123c;}
    .loading-screen{display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:16px;color:var(--grey);}
    .empty-state{text-align:center;padding:60px 20px;color:var(--grey);}
    .empty-state .empty-icon{font-size:48px;margin-bottom:16px;}
    @media(max-width:768px){.section{padding:60px 0;}.page-hero{padding:120px 0 60px;}}
  `}</style>
);

// ── Toast ─────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className={`toast toast-${type}`} onClick={onClose}>{msg}</div>;
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type = "ok") => setToast({ msg, type }), []);
  const hide = useCallback(() => setToast(null), []);
  const el = toast ? <Toast msg={toast.msg} type={toast.type} onClose={hide} /> : null;
  return [show, el];
}

// ── Nav ───────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    {id:"home",label:"Home"},{id:"about",label:"About"},{id:"teachings",label:"Teachings"},
    {id:"watch",label:"Watch Live"},{id:"events",label:"Events"},{id:"prayer",label:"Prayer"},
    {id:"blog",label:"Blog"},{id:"contact",label:"Contact"},
  ];
  const go = id => { setPage(id); setMenuOpen(false); window.scrollTo(0,0); };
  return (
    <>
      <style>{`
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s;padding:20px 0;}
        .nav.scrolled{background:rgba(10,8,32,.95);backdrop-filter:blur(16px);padding:12px 0;box-shadow:0 2px 40px rgba(0,0,0,.3);}
        .nav-inner{max-width:1280px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;}
        .nav-logo{display:flex;align-items:center;gap:12px;cursor:pointer;}
        .nav-logo img{height:44px;width:auto;filter:brightness(0) invert(1);}
        .nav-links{display:flex;align-items:center;gap:6px;list-style:none;}
        .nav-links li button{color:rgba(255,255,255,.8);font-size:14px;font-weight:400;padding:8px 14px;border-radius:8px;transition:all .2s;font-family:var(--ff-body);letter-spacing:.01em;}
        .nav-links li button:hover{color:white;background:rgba(255,255,255,.08);}
        .nav-links li button.active{color:var(--gold);font-weight:500;}
        .nav-cta{background:var(--blue)!important;color:white!important;padding:10px 22px!important;border-radius:50px!important;font-weight:500!important;}
        .nav-cta:hover{background:var(--blue-dark)!important;}
        .hamburger{display:none;flex-direction:column;gap:5px;padding:8px;cursor:pointer;}
        .hamburger span{width:24px;height:2px;background:white;transition:all .3s;border-radius:2px;}
        .mobile-menu{display:none;position:fixed;inset:0;z-index:999;background:var(--dark);padding:100px 32px 40px;flex-direction:column;gap:8px;}
        .mobile-menu.open{display:flex;}
        .mobile-menu button{color:white;font-size:22px;font-family:var(--ff-head);padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);text-align:left;letter-spacing:.02em;}
        @media(max-width:900px){.nav-links{display:none;}.hamburger{display:flex;}}
      `}</style>
      <nav className={`nav ${scrolled?"scrolled":""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>
            <img src={logoFull} alt="HolySpirit Hub" />
          </div>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.id}>
                <button className={page===l.id?"active":""} onClick={() => go(l.id)}>{l.label}</button>
              </li>
            ))}
            <li><button className="nav-cta" onClick={() => go("give")}>Give</button></li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen?"open":""}`}>
        {links.map(l => <button key={l.id} onClick={() => go(l.id)}>{l.label}</button>)}
        <button onClick={() => go("give")} style={{color:"var(--gold)"}}>Give</button>
      </div>
    </>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [show, el] = useToast();
  const go = id => { setPage(id); window.scrollTo(0,0); };

  const handleSubscribe = async e => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    try {
      const res = await api.subscribeNewsletter({ email });
      show(res.message || "Subscribed!", "ok");
      setEmail("");
    } catch (err) { show(err.message, "err"); }
    finally { setSubLoading(false); }
  };

  return (
    <>
      {el}
      <style>{`
        footer{background:var(--dark);color:rgba(255,255,255,.7);padding:80px 0 32px;}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:48px;margin-bottom:60px;}
        .footer-brand img{height:40px;filter:brightness(0) invert(1);margin-bottom:20px;}
        .footer-brand p{font-size:14px;line-height:1.8;max-width:280px;}
        .footer-socials{display:flex;gap:12px;margin-top:24px;}
        .social-icon{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .2s;cursor:pointer;}
        .social-icon:hover{border-color:var(--blue);background:var(--blue);}
        .footer-col h4{font-family:var(--ff-body);font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:20px;}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .footer-col ul li button{color:rgba(255,255,255,.6);font-size:14px;transition:color .2s;font-family:var(--ff-body);}
        .footer-col ul li button:hover{color:white;}
        .footer-nl form{display:flex;flex-direction:column;gap:10px;margin-top:12px;}
        .footer-nl input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px 16px;color:white;font-size:14px;font-family:var(--ff-body);outline:none;}
        .footer-nl input:focus{border-color:var(--blue);}
        .footer-nl input::placeholder{color:rgba(255,255,255,.35);}
        .footer-nl button{background:var(--blue);color:white;padding:12px;border-radius:10px;font-size:14px;font-weight:500;transition:background .2s;font-family:var(--ff-body);display:flex;align-items:center;justify-content:center;gap:8px;}
        .footer-nl button:hover{background:var(--blue-dark);}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:28px;display:flex;justify-content:space-between;align-items:center;font-size:13px;}
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:600px){.footer-grid{grid-template-columns:1fr;}.footer-bottom{flex-direction:column;gap:12px;text-align:center;}}
      `}</style>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logoWhite} alt="HolySpirit Hub" />
              <p>A non-denominational ministry devoted to bringing the consciousness and presence of the Holy Spirit to every heart and nation.</p>
              <div className="footer-socials">
                {["📘","📸","▶","🐦"].map((icon,i) => <div key={i} className="social-icon">{icon}</div>)}
              </div>
            </div>
            <div className="footer-col">
              <h4>Ministry</h4>
              <ul>
                {[["about","About"],["teachings","Teachings"],["watch","Watch Live"],["events","Events"],["prayer","Prayer"]].map(([id,l]) => (
                  <li key={id}><button onClick={() => go(id)}>{l}</button></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                {[["community","Community"],["blog","Blog"],["give","Give"],["contact","Contact"]].map(([id,l]) => (
                  <li key={id}><button onClick={() => go(id)}>{l}</button></li>
                ))}
              </ul>
            </div>
            <div className="footer-col footer-nl">
              <h4>Stay Connected</h4>
              <p style={{fontSize:14}}>Weekly devotionals and updates straight to your inbox.</p>
              <form onSubmit={handleSubscribe}>
                <input placeholder="Your email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                <button disabled={subLoading}>
                  {subLoading ? <span className="spinner"/> : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 HolySpirit Hub. All rights reserved.</span>
            <span style={{color:"var(--gold)"}}>Where the Spirit is, there is freedom.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// ── HOME ──────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [teachings, setTeachings] = useState([]);
  const [events, setEvents]       = useState([]);
  const [wall, setWall]           = useState([]);
  const [subEmail, setSubEmail]   = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [show, toastEl] = useToast();
  const go = id => { setPage(id); window.scrollTo(0,0); };

  useEffect(() => {
    api.fetchTeachings({ featured:1, limit:1 }).then(r => setTeachings(r.teachings||[])).catch(()=>{});
    api.fetchEvents({ upcoming:1, limit:3 }).then(r => setEvents(r.events||[])).catch(()=>{});
    api.fetchPrayerWall(3).then(r => setWall(r.items||[])).catch(()=>{});
  }, []);

  const handleSubscribe = async e => {
    e.preventDefault();
    if (!subEmail) return;
    setSubLoading(true);
    try {
      const res = await api.subscribeNewsletter({ email: subEmail });
      show(res.message || "Subscribed!", "ok");
      setSubEmail("");
    } catch(err) { show(err.message, "err"); }
    finally { setSubLoading(false); }
  };

  const featured = teachings[0] || null;

  const ministries = [
    {icon:"🕊️",title:"Spirit-Led Teachings",desc:"Deep, revelatory teachings on the person and work of the Holy Spirit."},
    {icon:"🔥",title:"Worship & Presence",desc:"Encounters that go beyond singing — into the manifest presence of God."},
    {icon:"🌍",title:"Global Community",desc:"A family of believers united by the Spirit across nations and cultures."},
    {icon:"🙏",title:"Prayer & Intercession",desc:"Dedicated prayer watches and intercession for individuals and nations."},
  ];

  return (
    <>
      {toastEl}
      <style>{`
        .hero{min-height:100vh;background:linear-gradient(160deg,#050215 0%,#0a0635 40%,#120b6e 70%,#0a0635 100%);position:relative;overflow:hidden;display:flex;align-items:center;}
        .hero-glow{position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(26,10,255,.25) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .hero-gold-glow{position:absolute;width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);top:20%;right:10%;}
        .hero-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 24px 0;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:10px;background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.25);border-radius:50px;padding:8px 18px;font-size:13px;font-weight:500;letter-spacing:.08em;color:var(--gold);margin-bottom:28px;animation:fadeUp .6s ease forwards;}
        .hero-eyebrow::before{content:'✦';}
        .hero-h1{font-size:clamp(44px,6vw,80px);color:white;line-height:1.08;margin-bottom:24px;animation:fadeUp .7s .1s ease both;}
        .hero-h1 em{font-style:italic;color:var(--gold);background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--gold));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite;}
        .hero-sub{color:rgba(255,255,255,.65);font-size:18px;line-height:1.7;margin-bottom:40px;animation:fadeUp .7s .2s ease both;}
        .hero-actions{display:flex;gap:16px;flex-wrap:wrap;animation:fadeUp .7s .3s ease both;}
        .hero-stats{display:flex;gap:32px;margin-top:52px;animation:fadeUp .7s .4s ease both;}
        .hero-stat-num{font-family:var(--ff-head);font-size:36px;font-weight:700;color:white;}
        .hero-stat-label{font-size:13px;color:rgba(255,255,255,.5);margin-top:2px;}
        .hero-visual{display:flex;align-items:center;justify-content:center;position:relative;animation:fadeIn 1s .5s ease both;}
        .hero-logo-wrap{position:relative;z-index:2;animation:float 4s ease-in-out infinite;}
        .hero-logo-wrap img{width:300px;height:300px;object-fit:contain;filter:drop-shadow(0 0 40px rgba(26,10,255,.6));}
        .pulse-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:320px;height:320px;border-radius:50%;border:2px solid rgba(26,10,255,.4);animation:pulse-ring 2.5s ease-out infinite;}
        .pulse-ring:nth-child(2){animation-delay:.8s;} .pulse-ring:nth-child(3){animation-delay:1.6s;}
        .min-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:56px;}
        .min-card{background:white;border:1px solid rgba(26,10,255,.08);border-radius:20px;padding:32px 24px;transition:all .3s;}
        .min-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(26,10,255,.12);border-color:var(--blue);}
        .min-icon{width:56px;height:56px;border-radius:16px;background:var(--grey-light);font-size:26px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
        .min-card h3{font-size:20px;margin-bottom:10px;font-weight:600;}
        .min-card p{font-size:14px;color:var(--grey);line-height:1.6;}
        .feat-msg{background:linear-gradient(135deg,var(--dark) 0%,#0f0640 100%);border-radius:28px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;}
        .feat-video{background:#0f0640;position:relative;min-height:320px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
        .play-btn{width:80px;height:80px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 0 0 20px rgba(26,10,255,.15);transition:all .3s;color:white;}
        .play-btn:hover{transform:scale(1.1);}
        .feat-info{padding:48px;display:flex;flex-direction:column;justify-content:center;}
        .feat-info h2{font-size:32px;color:white;margin:8px 0 16px;line-height:1.25;}
        .feat-info p{color:rgba(255,255,255,.65);line-height:1.7;margin-bottom:28px;}
        .feat-meta{display:flex;gap:20px;color:rgba(255,255,255,.45);font-size:13px;margin-bottom:28px;}
        .ev-list{display:flex;flex-direction:column;gap:16px;margin-top:48px;}
        .ev-item{display:flex;align-items:center;gap:24px;background:white;border:1px solid rgba(26,10,255,.08);border-radius:16px;padding:24px 28px;transition:all .3s;}
        .ev-item:hover{border-color:var(--blue);box-shadow:0 8px 32px rgba(26,10,255,.1);transform:translateX(6px);}
        .ev-date{min-width:68px;text-align:center;background:var(--grey-light);border-radius:12px;padding:10px;}
        .ev-date-num{font-family:var(--ff-head);font-size:28px;font-weight:700;color:var(--blue);}
        .ev-date-month{font-size:11px;color:var(--grey);text-transform:uppercase;letter-spacing:.08em;}
        .ev-info{flex:1;}
        .ev-info h3{font-size:18px;margin-bottom:4px;}
        .ev-meta{display:flex;gap:16px;font-size:13px;color:var(--grey);flex-wrap:wrap;}
        .ev-tag{background:rgba(26,10,255,.08);color:var(--blue);padding:4px 12px;border-radius:50px;font-size:12px;font-weight:500;}
        .wall-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
        .wall-card{background:white;border-radius:20px;padding:28px;border:1px solid rgba(26,10,255,.06);transition:all .3s;}
        .wall-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(26,10,255,.08);}
        .wall-text{font-size:15px;font-style:italic;line-height:1.7;color:#333;margin-bottom:18px;font-family:var(--ff-head);}
        .wall-name{font-weight:600;font-size:14px;}
        .wall-status{font-size:12px;color:var(--grey);}
        .cta-banner{background:linear-gradient(135deg,var(--blue) 0%,var(--blue-dark) 60%,#050080 100%);border-radius:28px;padding:80px 60px;text-align:center;position:relative;overflow:hidden;}
        .cta-banner h2{font-size:clamp(32px,4vw,52px);color:white;margin-bottom:16px;}
        .cta-banner p{color:rgba(255,255,255,.7);font-size:18px;margin-bottom:36px;}
        .cta-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
        .nl-banner{background:var(--grey-light);border-radius:24px;padding:60px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
        .nl-form{display:flex;gap:12px;flex-wrap:wrap;}
        .nl-form input{flex:1;min-width:200px;padding:14px 18px;border:1px solid rgba(26,10,255,.15);border-radius:50px;font-size:14px;font-family:var(--ff-body);outline:none;}
        .nl-form input:focus{border-color:var(--blue);}
        @media(max-width:900px){
          .hero-content{grid-template-columns:1fr;text-align:center;} .hero-visual{display:none;}
          .hero-actions{justify-content:center;} .hero-stats{justify-content:center;}
          .min-grid{grid-template-columns:repeat(2,1fr);} .feat-msg{grid-template-columns:1fr;}
          .wall-grid{grid-template-columns:1fr;} .nl-banner{grid-template-columns:1fr;}
        }
        @media(max-width:600px){.min-grid{grid-template-columns:1fr;}.cta-banner{padding:48px 28px;}}
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"/><div className="hero-gold-glow"/>
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">Non-Denominational Ministry</div>
            <h1 className="hero-h1">Know the<br/><em>Holy Spirit</em><br/>Personally</h1>
            <p className="hero-sub">A global ministry devoted to awakening the world to the consciousness, presence, and power of the Holy Spirit — in everyday life.</p>
            <div className="hero-actions">
              <button className="btn-gold" onClick={()=>go("watch")}>▶ Watch Live</button>
              <button className="btn-ghost" onClick={()=>go("about")}>Our Story</button>
            </div>
            <div className="hero-stats">
              {[["50K+","Lives Touched"],["120+","Nations"],["500+","Teachings"]].map(([n,l])=>(
                <div key={l}><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="pulse-ring"/><div className="pulse-ring"/><div className="pulse-ring"/>
            <div className="hero-logo-wrap"><img src={logoWhite} alt="HolySpirit Hub"/></div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
            <div className="label">Our Ministry</div>
            <h2 className="section-title">Everything we do is <em>Spirit-led</em></h2>
            <div className="divider" style={{margin:"20px auto"}}/>
            <p className="section-sub" style={{margin:"0 auto"}}>We exist to cultivate awareness of the Holy Spirit in every area of life — through teaching, worship, community and prayer.</p>
          </div>
          <div className="min-grid">
            {ministries.map(m=>(
              <div key={m.title} className="min-card">
                <div className="min-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MESSAGE */}
      {featured && (
        <section className="section-sm">
          <div className="container">
            <div className="feat-msg">
              <div className="feat-video">
                <div className="play-btn">▶</div>
              </div>
              <div className="feat-info">
                <div className="label">Featured Teaching</div>
                <h2>{featured.title}</h2>
                <div className="feat-meta">
                  <span>📅 {featured.published_at?.slice(0,10)}</span>
                  <span>⏱ {featured.duration}</span>
                  <span>🎙 {featured.speaker}</span>
                </div>
                <p>{featured.description}</p>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  <button className="btn-primary" onClick={()=>go("teachings")}>Watch Now</button>
                  <button className="btn-ghost">Download Audio</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:8,flexWrap:"wrap",gap:16}}>
              <div><div className="label">What's Coming</div><h2 className="section-title">Upcoming <em>Events</em></h2></div>
              <button className="btn-outline" onClick={()=>go("events")}>View All</button>
            </div>
            <div className="ev-list">
              {events.map(e=>{
                const d = new Date(e.event_date);
                return (
                  <div key={e.id} className="ev-item">
                    <div className="ev-date">
                      <div className="ev-date-num">{d.getDate()}</div>
                      <div className="ev-date-month">{d.toLocaleString("default",{month:"short"})}</div>
                    </div>
                    <div className="ev-info">
                      <h3>{e.title}</h3>
                      <div className="ev-meta">
                        <span>⏰ {e.start_time}</span>
                        <span>📍 {e.location}</span>
                        <span className="ev-tag">{e.event_type}</span>
                      </div>
                    </div>
                    <button className="btn-outline" onClick={()=>go("events")}>RSVP</button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PRAYER WALL PREVIEW */}
      {wall.length > 0 && (
        <section className="section" style={{background:"var(--grey-light)"}}>
          <div className="container">
            <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
              <div className="label">Community Prayer</div>
              <h2 className="section-title">We're <em>Praying</em> Together</h2>
              <p className="section-sub" style={{margin:"0 auto"}}>Join our community in intercession. Every request is covered.</p>
            </div>
            <div className="wall-grid">
              {wall.map(w=>(
                <div key={w.id} className="wall-card">
                  <p className="wall-text">"{w.request}"</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div className="wall-name">— {w.display_name}</div>
                    <div className="wall-status">{w.status==="praying"?"🙏 Being prayed for":"🕊️ Submitted"}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:36}}>
              <button className="btn-outline" onClick={()=>go("prayer")}>Submit Your Request</button>
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="section">
        <div className="container">
          <div className="nl-banner">
            <div>
              <div className="label">Newsletter</div>
              <h2 className="section-title">Stay in the <em>Flow</em></h2>
              <p style={{color:"var(--grey)",lineHeight:1.7}}>Weekly devotionals, teaching highlights and event updates — every Monday morning. No spam, only Spirit.</p>
            </div>
            <form className="nl-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email address" value={subEmail} onChange={e=>setSubEmail(e.target.value)} required/>
              <button className="btn-primary" type="submit" disabled={subLoading}>
                {subLoading?<span className="spinner"/>:"Subscribe →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to encounter the Holy Spirit?</h2>
            <p>Join thousands worldwide discovering daily life with the Spirit of God.</p>
            <div className="cta-actions">
              <button className="btn-gold" onClick={()=>go("community")}>Join Our Community</button>
              <button className="btn-ghost" onClick={()=>go("prayer")}>Submit a Prayer Request</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── TEACHINGS ─────────────────────────────────────────────────
function TeachingsPage() {
  const [filter, setFilter] = useState("All");
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ["All","The Holy Spirit","Prayer","Faith","Worship","Identity","Prophecy"];

  useEffect(() => {
    setLoading(true);
    const params = filter !== "All" ? { category: filter } : {};
    api.fetchTeachings({ ...params, limit: 12 })
      .then(r => setTeachings(r.teachings || []))
      .catch(() => setTeachings([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <>
      <style>{`
        .filter-bar{display:flex;gap:10px;flex-wrap:wrap;margin:40px 0;}
        .filter-btn{padding:9px 20px;border-radius:50px;border:1px solid rgba(26,10,255,.2);font-size:14px;transition:all .2s;font-family:var(--ff-body);color:var(--text);}
        .filter-btn:hover{border-color:var(--blue);color:var(--blue);}
        .filter-btn.active{background:var(--blue);color:white;border-color:var(--blue);}
        .t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .t-card{border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;background:white;}
        .t-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,10,255,.1);}
        .t-thumb{height:180px;background:linear-gradient(135deg,#0a0635,#1a0aff33);display:flex;align-items:center;justify-content:center;cursor:pointer;}
        .t-play{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:20px;color:white;transition:all .2s;}
        .t-thumb:hover .t-play{background:var(--blue);border-color:var(--blue);}
        .t-body{padding:24px;}
        .t-series{font-size:11px;color:var(--blue);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;}
        .t-title{font-size:19px;font-weight:600;margin-bottom:10px;line-height:1.35;}
        .t-meta{display:flex;gap:16px;font-size:13px;color:var(--grey);margin-bottom:8px;flex-wrap:wrap;}
        .t-actions{display:flex;gap:10px;margin-top:16px;}
        .t-actions button{flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:500;transition:all .2s;font-family:var(--ff-body);}
        .t-watch{background:var(--blue);color:white;} .t-watch:hover{background:var(--blue-dark);}
        .t-dl{border:1px solid rgba(26,10,255,.2);color:var(--blue);} .t-dl:hover{background:rgba(26,10,255,.05);}
        @media(max-width:900px){.t-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.t-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Teachings & <em style={{color:"var(--gold)"}}>Messages</em></h1>
        <p>Deep, Spirit-led messages to grow your relationship with the Holy Spirit.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {categories.map(c=>(
              <button key={c} className={`filter-btn ${filter===c?"active":""}`} onClick={()=>setFilter(c)}>{c}</button>
            ))}
          </div>
          {loading ? (
            <div className="loading-screen"><span className="spinner spinner-dark"/><span>Loading teachings…</span></div>
          ) : teachings.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🎙️</div><p>No teachings found in this category.</p></div>
          ) : (
            <div className="t-grid">
              {teachings.map(t=>(
                <div key={t.id} className="t-card">
                  <div className="t-thumb"><div className="t-play">▶</div></div>
                  <div className="t-body">
                    {t.series && <div className="t-series">{t.series}</div>}
                    <div className="t-title">{t.title}</div>
                    <div className="t-meta">
                      <span>📅 {t.published_at?.slice(0,10)}</span>
                      {t.duration && <span>⏱ {t.duration}</span>}
                    </div>
                    <div style={{fontSize:14,fontWeight:500}}>🎙 {t.speaker}</div>
                    <div className="t-actions">
                      {t.video_url ? <a href={t.video_url} target="_blank" rel="noreferrer" className="t-watch" style={{flex:1,padding:10,borderRadius:10,fontSize:13,fontWeight:500,textAlign:"center"}}>▶ Watch</a> : <button className="t-watch">▶ Watch</button>}
                      {t.audio_url ? <a href={t.audio_url} download className="t-dl" style={{flex:1,padding:10,borderRadius:10,fontSize:13,fontWeight:500,textAlign:"center",border:"1px solid rgba(26,10,255,.2)"}}>⬇ Audio</a> : <button className="t-dl">⬇ Audio</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ── WATCH LIVE ────────────────────────────────────────────────
function WatchPage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchSchedule()
      .then(r => setSchedule(r.schedule || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .stream-embed{background:#050215;border-radius:24px;overflow:hidden;aspect-ratio:16/9;position:relative;display:flex;align-items:center;justify-content:center;margin-top:48px;margin-bottom:48px;border:2px solid rgba(26,10,255,.2);}
        .stream-inner{text-align:center;color:white;}
        .live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);border-radius:50px;padding:8px 18px;font-size:13px;color:#ef4444;margin-bottom:20px;}
        .live-dot{width:8px;height:8px;background:#ef4444;border-radius:50%;animation:pulse-ring 1.5s infinite;}
        .big-play{width:100px;height:100px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-size:40px;color:white;margin:0 auto 24px;box-shadow:0 0 0 24px rgba(26,10,255,.12);}
        .sched-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
        .sched-item{background:white;border-radius:16px;padding:24px;border:1px solid rgba(26,10,255,.08);display:flex;align-items:center;gap:20px;}
        .sched-day{background:var(--grey-light);border-radius:12px;padding:12px 16px;text-align:center;min-width:80px;}
        .sched-day-name{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);}
        .sched-day-time{font-family:var(--ff-head);font-size:20px;font-weight:700;color:var(--blue);}
        @media(max-width:600px){.sched-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1><em style={{color:"var(--gold)"}}>Watch</em> Live</h1>
        <p>Join us from anywhere in the world for Spirit-led worship and teaching.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="label">Live Stream</div>
          <h2 className="section-title">Join Us <em>Online</em></h2>
          <div className="stream-embed">
            <div className="stream-inner">
              <div className="live-badge"><span className="live-dot"/>LIVE every Sunday & Wednesday</div>
              <div className="big-play">▶</div>
              <h3 style={{fontSize:24,marginBottom:8}}>Stream starts soon</h3>
              <p style={{color:"rgba(255,255,255,.5)",fontSize:15}}>Join us at the scheduled times below</p>
              <div style={{marginTop:24}}><button className="btn-gold">Set a Reminder</button></div>
            </div>
          </div>
          <h3 style={{fontSize:28,fontFamily:"var(--ff-head)",marginBottom:8}}>Service Schedule</h3>
          <p style={{color:"var(--grey)",marginBottom:32}}>All times are in West Africa Time (WAT).</p>
          {loading ? (
            <div className="loading-screen"><span className="spinner spinner-dark"/></div>
          ) : (
            <div className="sched-grid">
              {schedule.map(s=>(
                <div key={s.id} className="sched-item">
                  <div className="sched-day">
                    <div className="sched-day-name">{s.day_of_week.slice(0,3)}</div>
                    <div className="sched-day-time">{s.start_time.split(" ")[0]}</div>
                    <div style={{fontSize:10,color:"var(--grey)"}}>WAT</div>
                  </div>
                  <div>
                    <div style={{fontSize:17,fontWeight:600}}>{s.title}</div>
                    <div style={{fontSize:13,color:"var(--grey)",marginTop:4}}>{s.day_of_week} · {s.start_time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ── EVENTS ────────────────────────────────────────────────────
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rsvpModal, setRsvpModal] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({ name:"", email:"" });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [show, toastEl] = useToast();
  const typeColors = {"Prayer & Worship":"#1a0aff","Teaching":"#7c3aed","Conference":"#c9a84c","Youth":"#059669","Prayer":"#dc2626","Training":"#0891b2"};

  useEffect(() => {
    api.fetchEvents({ upcoming:1, limit:12 })
      .then(r => setEvents(r.events||[]))
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, []);

  const handleRsvp = async e => {
    e.preventDefault();
    setRsvpLoading(true);
    try {
      const res = await api.submitRsvp({ event_id: rsvpModal.id, ...rsvpForm });
      show(res.message, "ok");
      setRsvpModal(null);
      setRsvpForm({ name:"", email:"" });
    } catch(err) { show(err.message, "err"); }
    finally { setRsvpLoading(false); }
  };

  return (
    <>
      {toastEl}
      <style>{`
        .ev-pg-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px;}
        .ev-pg-card{background:white;border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;}
        .ev-pg-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,10,255,.1);}
        .ev-pg-top{padding:28px;}
        .ev-pg-date{font-family:var(--ff-head);font-size:15px;color:var(--grey);margin-bottom:8px;}
        .ev-pg-title{font-size:22px;font-weight:600;margin-bottom:10px;line-height:1.3;}
        .ev-pg-desc{color:var(--grey);font-size:14px;line-height:1.7;margin-bottom:20px;}
        .ev-pg-meta{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--grey);}
        .ev-pg-bottom{padding:16px 28px;border-top:1px solid rgba(26,10,255,.06);display:flex;justify-content:space-between;align-items:center;background:rgba(26,10,255,.02);}
        .ev-badge{padding:5px 14px;border-radius:50px;font-size:12px;font-weight:600;color:white;}
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;}
        .modal-card{background:white;border-radius:24px;padding:40px;width:100%;max-width:480px;box-shadow:0 24px 64px rgba(0,0,0,.2);}
        .modal-card h3{font-size:26px;margin-bottom:8px;}
        .modal-card p{color:var(--grey);font-size:14px;margin-bottom:24px;}
        @media(max-width:700px){.ev-pg-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Events & <em style={{color:"var(--gold)"}}>Gatherings</em></h1>
        <p>Join us online or in person for encounters that will mark your life.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="label">What's Coming</div>
          <h2 className="section-title">Upcoming <em>Events</em></h2>
          {loading ? <div className="loading-screen"><span className="spinner spinner-dark"/><span>Loading events…</span></div> :
          events.length === 0 ? <div className="empty-state"><div className="empty-icon">📅</div><p>No upcoming events. Check back soon!</p></div> : (
            <div className="ev-pg-grid">
              {events.map(e=>(
                <div key={e.id} className="ev-pg-card">
                  <div className="ev-pg-top">
                    <div className="ev-pg-date">📅 {new Date(e.event_date).toLocaleDateString("en-NG",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
                    <h3 className="ev-pg-title">{e.title}</h3>
                    {e.description && <p className="ev-pg-desc">{e.description}</p>}
                    <div className="ev-pg-meta">
                      {e.start_time && <span>⏰ {e.start_time}</span>}
                      {e.location && <span>📍 {e.location}</span>}
                      {e.is_online && <span style={{color:"var(--blue)"}}>🌐 Online</span>}
                    </div>
                  </div>
                  <div className="ev-pg-bottom">
                    <span className="ev-badge" style={{background:typeColors[e.event_type]||"var(--blue)"}}>{e.event_type}</span>
                    <button className="btn-primary" style={{padding:"8px 20px",fontSize:13}} onClick={()=>setRsvpModal(e)}>RSVP Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpModal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setRsvpModal(null)}>
          <div className="modal-card">
            <h3>RSVP for Event</h3>
            <p style={{fontWeight:500,color:"var(--text)",marginBottom:4}}>{rsvpModal.title}</p>
            <p>📅 {rsvpModal.event_date} · ⏰ {rsvpModal.start_time}</p>
            <form onSubmit={handleRsvp}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="Full name" required value={rsvpForm.name} onChange={e=>setRsvpForm({...rsvpForm,name:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="your@email.com" required value={rsvpForm.email} onChange={e=>setRsvpForm({...rsvpForm,email:e.target.value})}/>
              </div>
              <div style={{display:"flex",gap:12,marginTop:8}}>
                <button type="button" className="btn-outline" onClick={()=>setRsvpModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={rsvpLoading} style={{flex:1,justifyContent:"center"}}>
                  {rsvpLoading?<span className="spinner"/>:"Confirm RSVP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ── PRAYER ────────────────────────────────────────────────────
function PrayerPage() {
  const [form, setForm] = useState({name:"",email:"",request:"",anonymous:false,show_on_wall:true});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wall, setWall]         = useState([]);
  const [wallLoading, setWallLoading] = useState(true);
  const [show, toastEl] = useToast();

  useEffect(() => {
    api.fetchPrayerWall(8)
      .then(r => setWall(r.items||[]))
      .catch(()=>{})
      .finally(()=>setWallLoading(false));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitPrayer(form);
      show(res.message, "ok");
      setSubmitted(true);
      // Refresh wall
      api.fetchPrayerWall(8).then(r=>setWall(r.items||[])).catch(()=>{});
    } catch(err) { show(err.message, "err"); }
    finally { setLoading(false); }
  };

  return (
    <>
      {toastEl}
      <style>{`
        .pr-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:56px;align-items:start;}
        .pr-form-card{background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(26,10,255,.08);border:1px solid rgba(26,10,255,.08);}
        .pr-anon{display:flex;align-items:center;gap:10px;font-size:14px;cursor:pointer;margin-bottom:20px;}
        .pr-anon input{accent-color:var(--blue);width:16px;height:16px;}
        .pr-wall-item{background:white;border-radius:16px;padding:20px 24px;border:1px solid rgba(26,10,255,.08);font-size:14px;line-height:1.7;margin-bottom:14px;}
        .pr-wall-item:first-child{border-left:4px solid var(--blue);}
        .pr-wall-from{font-size:12px;color:var(--grey);margin-top:10px;}
        .success-box{text-align:center;padding:48px 32px;}
        .success-box .success-icon{font-size:64px;margin-bottom:20px;}
        @media(max-width:800px){.pr-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Prayer <em style={{color:"var(--gold)"}}>Requests</em></h1>
        <p>We are a praying community. Submit your request and we will stand with you.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="pr-grid">
            <div>
              <div className="label">Submit a Request</div>
              <h2 className="section-title">We're Praying <em>With You</em></h2>
              <div className="divider"/>
              <p style={{color:"var(--grey)",lineHeight:1.8,marginBottom:32}}>Our dedicated prayer team intercedes over every request. The Holy Spirit, your Helper, is involved. Be encouraged.</p>
              <div className="pr-form-card">
                {submitted ? (
                  <div className="success-box">
                    <div className="success-icon">🙏</div>
                    <h3 style={{fontSize:26,marginBottom:12}}>We're praying for you!</h3>
                    <p style={{color:"var(--grey)",lineHeight:1.7}}>Your request has been received. Our team will intercede on your behalf. <em>"The Spirit himself intercedes for us."</em> — Romans 8:26</p>
                    <button className="btn-primary" style={{marginTop:24}} onClick={()=>setSubmitted(false)}>Submit Another Request</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input className="form-input" placeholder="First name or Anonymous" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email (optional — for follow-up)</label>
                      <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Prayer Request</label>
                      <textarea className="form-input" placeholder="Share what you'd like us to pray about…" value={form.request} onChange={e=>setForm({...form,request:e.target.value})} required minLength={10}/>
                    </div>
                    <label className="pr-anon">
                      <input type="checkbox" checked={form.anonymous} onChange={e=>setForm({...form,anonymous:e.target.checked})}/>
                      Keep my name anonymous on the prayer wall
                    </label>
                    <label className="pr-anon">
                      <input type="checkbox" checked={form.show_on_wall} onChange={e=>setForm({...form,show_on_wall:e.target.checked})}/>
                      Show my request on the community prayer wall
                    </label>
                    <button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center"}} disabled={loading}>
                      {loading?<span className="spinner"/>:"Submit Prayer Request 🙏"}
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div>
              <h3 style={{fontSize:24,fontFamily:"var(--ff-head)",marginBottom:8}}>🔥 Prayer Wall</h3>
              <p style={{color:"var(--grey)",fontSize:14,marginBottom:24}}>Shared requests from our community. Join us in intercession.</p>
              {wallLoading ? <div className="loading-screen"><span className="spinner spinner-dark"/></div> :
               wall.length === 0 ? <div className="empty-state"><div className="empty-icon">🙏</div><p>Be the first to submit a prayer request.</p></div> :
               wall.map(w=>(
                <div key={w.id} className="pr-wall-item">
                  "{w.request}"
                  <div className="pr-wall-from">— {w.display_name} &nbsp;·&nbsp; {w.status==="praying"?"🙏 Being prayed for":"🕊️ Submitted"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── GIVE ──────────────────────────────────────────────────────
function GivePage() {
  const [amount, setAmount] = useState("");
  const [type, setType]     = useState("offering");
  const [email, setEmail]   = useState("");
  const [name, setName]     = useState("");
  const [loading, setLoading] = useState(false);
  const [show, toastEl] = useToast();
  const presets = ["1000","5000","10000","25000","50000"];

  const handleGive = async e => {
    e.preventDefault();
    const amt = parseInt(amount.replace(/,/g,""));
    if (!amt || amt < 100) { show("Minimum donation is ₦100", "err"); return; }
    if (!email) { show("Email is required", "err"); return; }
    setLoading(true);
    try {
      const res = await api.initializeDonation({
        amount_kobo: amt * 100,
        giving_type: type,
        email,
        name,
        callback_url: window.location.origin + "/give/callback",
      });
      window.location.href = res.authorization_url;
    } catch(err) { show(err.message, "err"); setLoading(false); }
  };

  const fmt = n => n ? "₦" + Number(n).toLocaleString() : "₦0";

  return (
    <>
      {toastEl}
      <style>{`
        .give-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:start;margin-top:56px;}
        .give-card{background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(26,10,255,.08);}
        .give-types{display:flex;gap:8px;margin-bottom:32px;flex-wrap:wrap;}
        .give-type{padding:9px 20px;border-radius:50px;font-size:14px;border:1px solid rgba(26,10,255,.2);transition:all .2s;font-family:var(--ff-body);color:var(--text);}
        .give-type.active{background:var(--blue);color:white;border-color:var(--blue);}
        .presets{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;}
        .preset{padding:9px 18px;border-radius:10px;font-size:14px;border:1px solid rgba(26,10,255,.2);transition:all .2s;font-family:var(--ff-body);color:var(--text);}
        .preset.active,.preset:hover{background:rgba(26,10,255,.06);border-color:var(--blue);color:var(--blue);}
        .amt-wrap{position:relative;margin-bottom:20px;}
        .amt-sym{position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:22px;font-weight:700;color:var(--grey);}
        .amt-input{width:100%;padding:16px 16px 16px 48px;font-size:28px;font-weight:700;font-family:var(--ff-head);border:2px solid rgba(26,10,255,.15);border-radius:16px;outline:none;color:var(--text);transition:border-color .2s;}
        .amt-input:focus{border-color:var(--blue);}
        .secure{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--grey);margin-top:14px;}
        .give-info{background:var(--grey-light);border-radius:20px;padding:32px;margin-bottom:24px;}
        .give-info h3{font-size:22px;margin-bottom:12px;}
        .give-info p,.give-info li{color:var(--grey);font-size:14px;line-height:1.7;}
        .give-info ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .scripture-card{background:linear-gradient(135deg,var(--blue),var(--blue-dark));border-radius:20px;padding:40px;color:white;text-align:center;margin-top:24px;}
        .scripture-card blockquote{font-family:var(--ff-head);font-size:20px;font-style:italic;line-height:1.6;margin-bottom:16px;}
        .scripture-card cite{font-size:13px;opacity:.7;}
        @media(max-width:800px){.give-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Give <em style={{color:"var(--gold)"}}>Generously</em></h1>
        <p>Your giving partners with us to spread the consciousness of the Holy Spirit globally.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="give-grid">
            <div>
              <div className="label">Make a Donation</div>
              <h2 className="section-title">Give <em>Today</em></h2>
              <div className="divider"/>
              <div className="give-card">
                <div className="give-types">
                  {["offering","tithe","missions","building"].map(t=>(
                    <button key={t} className={`give-type ${type===t?"active":""}`} onClick={()=>setType(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
                  ))}
                </div>
                <form onSubmit={handleGive}>
                  <div style={{marginBottom:12,fontSize:14,color:"var(--grey)"}}>Select or enter amount (₦)</div>
                  <div className="presets">
                    {presets.map(p=>(
                      <button key={p} type="button" className={`preset ${amount===p?"active":""}`} onClick={()=>setAmount(p)}>₦{Number(p).toLocaleString()}</button>
                    ))}
                  </div>
                  <div className="amt-wrap">
                    <span className="amt-sym">₦</span>
                    <input className="amt-input" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,""))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Name (optional)</label>
                    <input className="form-input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" placeholder="For receipt" required value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>
                  <button type="submit" className="btn-gold" style={{width:"100%",justifyContent:"center",fontSize:16,padding:16}} disabled={loading}>
                    {loading?<span className="spinner"/>:`Give ${fmt(amount)} via Paystack 🙏`}
                  </button>
                  <div className="secure">🔒 Secured by Paystack · ₦100 minimum</div>
                </form>
              </div>
            </div>
            <div>
              <div className="give-info">
                <h3>Why We Give</h3>
                <p>Every naira given goes directly toward producing teachings, funding events, supporting outreach, and building our online platform to reach more souls.</p>
              </div>
              <div className="give-info">
                <h3>Giving Categories</h3>
                <ul>
                  {[["🌾","Offering","General support for ministry operations"],["💰","Tithe","Return to God a tenth of your increase"],["🌍","Missions","Fund outreach to unreached communities"],["🏗️","Building","Support physical and digital infrastructure"]].map(([icon,name,desc])=>(
                    <li key={name} style={{display:"flex",gap:12}}><span style={{fontSize:20}}>{icon}</span><div><strong>{name}</strong> — {desc}</div></li>
                  ))}
                </ul>
              </div>
              <div className="scripture-card">
                <blockquote>"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</blockquote>
                <cite>— 2 Corinthians 9:7</cite>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── BLOG ──────────────────────────────────────────────────────
function BlogPage() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("All");
  const [selected, setSelected] = useState(null);
  const [postData, setPostData] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const cats = ["All","Devotional","Teaching","Prayer","Testimony"];
  const catColors = {Devotional:"#1a0aff",Teaching:"#7c3aed",Prayer:"#dc2626",Testimony:"#059669"};
  const icons = ["🕊️","🔥","🙏","📖","✨","🌍","💧","⚡","🌿"];

  useEffect(()=>{
    setLoading(true);
    const params = filter!=="All" ? {category:filter,limit:9} : {limit:9};
    api.fetchBlogPosts(params).then(r=>setPosts(r.posts||[])).catch(()=>setPosts([])).finally(()=>setLoading(false));
  },[filter]);

  const openPost = async post => {
    setSelected(post); setPostLoading(true);
    try { const r = await api.fetchBlogPost(post.slug); setPostData(r.post); }
    catch { setPostData(post); }
    finally { setPostLoading(false); }
  };

  if (selected) return (
    <>
      <style>{`
        .blog-post-hero{background:linear-gradient(135deg,var(--dark),#0f0640);padding:140px 0 60px;text-align:center;position:relative;}
        .blog-post-body{max-width:760px;margin:0 auto;padding:60px 24px;}
        .blog-post-body p{font-size:17px;line-height:1.85;color:#333;margin-bottom:20px;}
        .blog-post-body h2{font-size:28px;margin:32px 0 16px;}
      `}</style>
      <div className="blog-post-hero">
        <div className="container">
          <button className="btn-ghost" onClick={()=>{setSelected(null);setPostData(null);}} style={{marginBottom:24}}>← Back to Blog</button>
          <div style={{position:"relative",zIndex:1}}>
            <span style={{display:"inline-block",padding:"4px 14px",borderRadius:50,fontSize:12,fontWeight:600,color:"white",background:catColors[selected.category]||"var(--blue)",marginBottom:16}}>{selected.category}</span>
            <h1 style={{fontSize:"clamp(28px,4vw,52px)",color:"white",maxWidth:760,margin:"0 auto 16px"}}>{selected.title}</h1>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:15}}>✍️ {selected.author} &nbsp;·&nbsp; 📅 {selected.published_at?.slice(0,10)} &nbsp;·&nbsp; ⏱ {selected.read_time} read</p>
          </div>
        </div>
      </div>
      <div className="blog-post-body">
        {postLoading ? <div className="loading-screen"><span className="spinner spinner-dark"/></div> :
          <div dangerouslySetInnerHTML={{__html: postData?.body || `<p>${postData?.excerpt || ""}</p>`}}/>
        }
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:48px;}
        .blog-card{background:white;border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;cursor:pointer;}
        .blog-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(26,10,255,.1);}
        .blog-thumb{height:180px;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);display:flex;align-items:center;justify-content:center;font-size:48px;}
        .blog-body{padding:28px;}
        .blog-cat{display:inline-block;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:600;color:white;margin-bottom:12px;}
        .blog-title{font-size:19px;font-weight:600;line-height:1.35;margin-bottom:12px;}
        .blog-meta{font-size:13px;color:var(--grey);display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap;}
        .blog-read{font-size:14px;font-weight:500;color:var(--blue);}
        @media(max-width:900px){.blog-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.blog-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Blog & <em style={{color:"var(--gold)"}}>Devotionals</em></h1>
        <p>Spirit-led articles and devotionals to deepen your walk with God.</p>
      </div>
      <section className="section">
        <div className="container">
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:40}}>
            {cats.map(c=><button key={c} className={`filter-btn ${filter===c?"active":""}`} style={{padding:"9px 20px",borderRadius:"50px",border:"1px solid rgba(26,10,255,.2)",fontSize:14,fontFamily:"var(--ff-body)",transition:"all .2s",background:filter===c?"var(--blue)":"transparent",color:filter===c?"white":"var(--text)"}} onClick={()=>setFilter(c)}>{c}</button>)}
          </div>
          {loading ? <div className="loading-screen"><span className="spinner spinner-dark"/><span>Loading posts…</span></div> :
           posts.length===0 ? <div className="empty-state"><div className="empty-icon">📝</div><p>No posts in this category yet.</p></div> : (
            <div className="blog-grid">
              {posts.map((p,i)=>(
                <div key={p.id} className="blog-card" onClick={()=>openPost(p)}>
                  <div className="blog-thumb">{icons[i%icons.length]}</div>
                  <div className="blog-body">
                    <div className="blog-cat" style={{background:catColors[p.category]||"var(--blue)"}}>{p.category}</div>
                    <h3 className="blog-title">{p.title}</h3>
                    <div className="blog-meta"><span>✍️ {p.author}</span>{p.read_time&&<span>⏱ {p.read_time}</span>}</div>
                    {p.excerpt && <p style={{fontSize:13,color:"var(--grey)",lineHeight:1.6,marginBottom:12}}>{p.excerpt.slice(0,100)}…</p>}
                    <div className="blog-read">Read article →</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ── CONTACT ───────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [show, toastEl] = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.sendContact(form);
      show(res.message, "ok");
      setSent(true);
    } catch(err) { show(err.message, "err"); }
    finally { setLoading(false); }
  };

  return (
    <>
      {toastEl}
      <style>{`
        .ct-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;margin-top:56px;align-items:start;}
        .ct-card{background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(26,10,255,.08);}
        .ct-info-item{display:flex;gap:16px;margin-bottom:28px;align-items:flex-start;}
        .ct-icon{width:48px;height:48px;border-radius:14px;background:var(--grey-light);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
        .ct-info-label{font-size:13px;color:var(--grey);margin-bottom:4px;}
        .ct-info-value{font-size:16px;font-weight:500;}
        .map-ph{height:260px;background:var(--grey-light);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:48px;margin-top:32px;border:1px solid rgba(26,10,255,.08);}
        @media(max-width:800px){.ct-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Get in <em style={{color:"var(--gold)"}}>Touch</em></h1>
        <p>We'd love to hear from you. Our team responds within 24 hours.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="ct-grid">
            <div>
              <div className="label">Send a Message</div>
              <h2 className="section-title">We're <em>Listening</em></h2>
              <div className="divider"/>
              <div className="ct-card">
                {sent ? (
                  <div style={{textAlign:"center",padding:"40px 0"}}>
                    <div style={{fontSize:56,marginBottom:16}}>✉️</div>
                    <h3 style={{fontSize:24,marginBottom:12}}>Message received!</h3>
                    <p style={{color:"var(--grey)"}}>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                    <button className="btn-primary" style={{marginTop:24}} onClick={()=>setSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input className="form-input" placeholder="Full name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input className="form-input" type="email" placeholder="you@example.com" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input className="form-input" placeholder="What is this about?" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-input" style={{minHeight:140}} placeholder="Write your message…" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                    </div>
                    <button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center"}} disabled={loading}>
                      {loading?<span className="spinner"/>:"Send Message →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div>
              <div className="label">Contact Details</div>
              <h2 className="section-title">Find <em>Us</em></h2>
              <div className="divider"/>
              <div style={{marginTop:32}}>
                {[["📍","Address","123 Ministry Road, Lekki, Lagos, Nigeria"],["📧","Email","info@holyspirithub.international"],["📞","Phone","+234 800 123 4567"],["🕐","Office Hours","Mon–Fri: 9:00 AM – 5:00 PM WAT"]].map(([icon,label,value])=>(
                  <div key={label} className="ct-info-item">
                    <div className="ct-icon">{icon}</div>
                    <div><div className="ct-info-label">{label}</div><div className="ct-info-value">{value}</div></div>
                  </div>
                ))}
              </div>
              <div className="map-ph">🗺️</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── ABOUT ────────────────────────────────────────────────────
function AboutPage() {
  const team = [
    {name:"Pastor David Eze",role:"Founder & Lead Teacher",initials:"DE"},
    {name:"Minister Ruth Okafor",role:"Worship Director",initials:"RO"},
    {name:"Elder James Nwosu",role:"Prayer & Intercession",initials:"JN"},
    {name:"Pastor Ife Adeleke",role:"Community & Outreach",initials:"IA"},
  ];
  const beliefs = [
    {title:"The Holy Spirit is a Person",desc:"Not a force or feeling, but the Third Person of the Godhead — relational, personal, and present."},
    {title:"Scripture is our Foundation",desc:"We hold the Bible as the inspired Word of God, our ultimate authority for faith and practice."},
    {title:"Every Believer Can Walk in the Spirit",desc:"Spirit-consciousness isn't reserved for a few — it's available to every child of God."},
    {title:"Unity Beyond Denomination",desc:"We welcome all believers regardless of church background, united by our focus on the Holy Spirit."},
  ];
  return (
    <>
      <style>{`
        .ab-story{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .ab-visual{aspect-ratio:1;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);border-radius:28px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .ab-visual img{width:70%;opacity:.9;filter:drop-shadow(0 20px 40px rgba(26,10,255,.3));}
        .beliefs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px;}
        .belief-card{border:1px solid rgba(26,10,255,.1);border-radius:16px;padding:28px;transition:all .3s;}
        .belief-card:hover{border-color:var(--blue);background:rgba(26,10,255,.02);}
        .belief-num{font-family:var(--ff-head);font-size:48px;font-weight:700;color:rgba(26,10,255,.1);margin-bottom:8px;}
        .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;}
        .team-card{text-align:center;}
        .team-av{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-light));display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:white;margin:0 auto 16px;font-family:var(--ff-head);}
        @media(max-width:900px){.ab-story{grid-template-columns:1fr;}.beliefs-grid{grid-template-columns:1fr;}.team-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.team-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>About <em style={{color:"var(--gold)"}}>HolySpirit Hub</em></h1>
        <p>A ministry born from an encounter — devoted to helping you encounter Him too.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="ab-story">
            <div className="ab-visual"><img src={logoBlue} alt="HolySpirit Hub"/></div>
            <div>
              <div className="label">Our Story</div>
              <h2 className="section-title">Born from an <em>Encounter</em></h2>
              <div className="divider"/>
              <p style={{color:"var(--grey)",lineHeight:1.8,marginBottom:20}}>HolySpirit Hub was founded on a simple yet profound conviction — that the church has largely treated the Holy Spirit as a theology rather than a Person. A doctrine rather than a companion.</p>
              <p style={{color:"var(--grey)",lineHeight:1.8,marginBottom:20}}>What began as a small prayer group in Lagos in 2018 has grown into a global ministry touching lives across 120+ nations — through teachings, worship encounters, and a community committed to Spirit-consciousness every day.</p>
              <p style={{color:"var(--grey)",lineHeight:1.8,marginBottom:32}}>We are non-denominational by conviction — believing that the Holy Spirit is the unifier of the body of Christ, and that His presence transcends every tradition and background.</p>
              <div style={{display:"flex",gap:32}}>
                {[["2018","Founded"],["120+","Nations"],["50K+","Community"]].map(([n,l])=>(
                  <div key={l}><div style={{fontFamily:"var(--ff-head)",fontSize:36,fontWeight:700,color:"var(--blue)"}}>{n}</div><div style={{fontSize:13,color:"var(--grey)"}}>{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
            <div style={{background:"white",borderRadius:24,padding:48,borderLeft:"4px solid var(--blue)"}}>
              <div style={{fontSize:32,marginBottom:12}}>🎯</div>
              <div className="label">Mission</div>
              <h3 style={{fontSize:28,margin:"8px 0 16px"}}>What We Do</h3>
              <p style={{color:"var(--grey)",lineHeight:1.8}}>To bring every believer into a living, conscious, daily relationship with the Holy Spirit — through teaching, worship, prayer and community rooted in Scripture.</p>
            </div>
            <div style={{background:"white",borderRadius:24,padding:48,borderLeft:"4px solid var(--gold)"}}>
              <div style={{fontSize:32,marginBottom:12}}>👁️</div>
              <div className="label" style={{color:"var(--gold)"}}>Vision</div>
              <h3 style={{fontSize:28,margin:"8px 0 16px"}}>Where We're Going</h3>
              <p style={{color:"var(--grey)",lineHeight:1.8}}>A world where every believer wakes up aware of the Holy Spirit's presence, moves through their day conscious of His guidance, and experiences Spirit-life as the normal Christian life.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="label">What We Believe</div>
          <h2 className="section-title">Our Core <em>Beliefs</em></h2>
          <div className="beliefs-grid">
            {beliefs.map((b,i)=>(
              <div key={b.title} className="belief-card">
                <div className="belief-num">0{i+1}</div>
                <h3 style={{fontSize:20,marginBottom:10}}>{b.title}</h3>
                <p style={{color:"var(--grey)",lineHeight:1.7}}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div style={{textAlign:"center"}}><div className="label">Our Leaders</div><h2 className="section-title">Meet the <em>Team</em></h2></div>
          <div className="team-grid">
            {team.map(t=>(
              <div key={t.name} className="team-card">
                <div className="team-av">{t.initials}</div>
                <div style={{fontWeight:600,fontSize:17,marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:13,color:"var(--grey)"}}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── COMMUNITY ────────────────────────────────────────────────
function CommunityPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, toastEl] = useToast();
  const ways = [
    {icon:"💬",title:"WhatsApp Community",desc:"Join our active WhatsApp community for daily devotionals, discussions and prayer.",action:"Join WhatsApp Group",color:"#25D366"},
    {icon:"📱",title:"Telegram Channel",desc:"Follow our Telegram for teaching notifications, event updates, and Spirit-led content.",action:"Join Telegram",color:"#0088cc"},
    {icon:"🎥",title:"YouTube Channel",desc:"Subscribe for all our teachings, worship sessions and conference recordings.",action:"Subscribe on YouTube",color:"#FF0000"},
    {icon:"📘",title:"Facebook Group",desc:"Join our Facebook community for discussions, testimonies, and livestreams.",action:"Join Facebook Group",color:"#1877F2"},
    {icon:"📸",title:"Instagram",desc:"Follow for daily quotes, devotionals, event coverage and Spirit-led content.",action:"Follow on Instagram",color:"#E1306C"},
    {icon:"🌐",title:"Small Groups",desc:"Find or start a Spirit-focused small group in your city or online.",action:"Find a Group Near You",color:"var(--blue)"},
  ];
  const handleSub = async e => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try { const r = await api.subscribeNewsletter({email}); show(r.message,"ok"); setEmail(""); }
    catch(err) { show(err.message,"err"); }
    finally { setLoading(false); }
  };
  return (
    <>
      {toastEl}
      <style>{`
        .com-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;}
        .com-card{background:white;border-radius:20px;padding:32px;border:1px solid rgba(26,10,255,.08);text-align:center;transition:all .3s;}
        .com-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.1);}
        .com-icon{font-size:40px;margin-bottom:16px;}
        .com-card h3{font-size:20px;margin-bottom:10px;}
        .com-card p{font-size:14px;color:var(--grey);line-height:1.7;margin-bottom:24px;}
        .com-btn{display:inline-block;padding:11px 24px;border-radius:50px;font-size:14px;font-weight:500;color:white;transition:all .2s;font-family:var(--ff-body);cursor:pointer;}
        .com-btn:hover{opacity:.85;transform:translateY(-2px);}
        @media(max-width:900px){.com-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.com-grid{grid-template-columns:1fr;}}
      `}</style>
      <div className="page-hero">
        <h1>Join the <em style={{color:"var(--gold)"}}>Community</em></h1>
        <p>You were never meant to walk alone. Find your place in the HolySpirit Hub family.</p>
      </div>
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center"}}><div className="label">Connect With Us</div><h2 className="section-title">Many Ways to <em>Connect</em></h2><p className="section-sub" style={{margin:"0 auto"}}>Whether you're nearby or on the other side of the world, there's a place for you.</p></div>
          <div className="com-grid">
            {ways.map(w=>(
              <div key={w.title} className="com-card">
                <div className="com-icon">{w.icon}</div>
                <h3>{w.title}</h3><p>{w.desc}</p>
                <button className="com-btn" style={{background:w.color}}>{w.action}</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}>
            <div className="label">Newsletter</div>
            <h2 className="section-title">Stay in the <em>Flow</em></h2>
            <p style={{color:"var(--grey)",marginBottom:32}}>Weekly devotionals, teaching excerpts, and event updates — every Monday morning.</p>
            <form onSubmit={handleSub} style={{display:"flex",gap:12,maxWidth:480,margin:"0 auto",flexWrap:"wrap"}}>
              <input style={{flex:1,minWidth:200,padding:"14px 18px",border:"1px solid rgba(26,10,255,.15)",borderRadius:50,fontSize:14,fontFamily:"var(--ff-body)",outline:"none"}} type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required/>
              <button className="btn-primary" type="submit" disabled={loading}>{loading?<span className="spinner"/>:"Subscribe"}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const pages = {
    home:<HomePage setPage={setPage}/>,
    about:<AboutPage/>,
    teachings:<TeachingsPage/>,
    watch:<WatchPage/>,
    events:<EventsPage/>,
    prayer:<PrayerPage/>,
    give:<GivePage/>,
    community:<CommunityPage/>,
    blog:<BlogPage/>,
    contact:<ContactPage/>,
  };
  return (
    <>
      <GlobalStyle/>
      <Nav page={page} setPage={setPage}/>
      <main>{pages[page]||pages.home}</main>
      <Footer setPage={setPage}/>
    </>
  );
}
