import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoFull from "../assets/logo-full.png";

const NAV_LINKS = [
  { to: "/",           label: "Home"       },
  { to: "/about",      label: "About"      },
  { to: "/teachings",  label: "Teachings"  },
  { to: "/watch",      label: "Watch Live" },
  { to: "/events",     label: "Events"     },
  { to: "/prayer",     label: "Prayer"     },
  //{ to: "/prayer-live",label: "Pray Live 🔴"},
  { to: "/blog",       label: "Blog"       },
  { to: "/contact",    label: "Contact"    },
  { to: "/feedback",   label: "Feedback"   },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <style>{`
        .nav { position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s;padding:20px 0; }
        .nav.scrolled { background:rgba(10,8,32,.95);backdrop-filter:blur(16px);padding:12px 0;box-shadow:0 2px 40px rgba(0,0,0,.3); }
        .nav-inner { max-width:1280px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between; }
        .nav-logo img { height:44px;width:auto;filter:brightness(0) invert(1);display:block; }
        .nav-links { display:flex;align-items:center;gap:4px;list-style:none; }
        .nav-links li a { color:rgba(255,255,255,.8);font-size:13.5px;font-weight:400;padding:7px 12px;border-radius:8px;transition:all .2s;display:block; }
        .nav-links li a:hover { color:white;background:rgba(255,255,255,.08); }
        .nav-links li a.active { color:var(--gold);font-weight:500; }
        .nav-links li a.pray-live { color:#ff6b6b; }
        .nav-links li a.pray-live:hover { background:rgba(255,107,107,.1); }
        .nav-cta { background:var(--blue)!important;color:white!important;padding:9px 20px!important;border-radius:50px!important;font-weight:500!important; }
        .nav-cta:hover { background:var(--blue-dark)!important; }
        .hamburger { display:none;flex-direction:column;gap:5px;padding:8px;cursor:pointer; }
        .hamburger span { width:24px;height:2px;background:white;transition:all .3s;border-radius:2px;display:block; }
        .mobile-menu { display:none;position:fixed;inset:0;z-index:999;background:var(--dark);padding:100px 32px 40px;flex-direction:column;gap:4px; }
        .mobile-menu.open { display:flex; }
        .mobile-menu a { color:rgba(255,255,255,.8);font-size:20px;font-family:var(--ffh);padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);display:block;transition:color .2s; }
        .mobile-menu a:hover,.mobile-menu a.active { color:var(--gold); }
        .mobile-give { color:var(--gold)!important;font-weight:600; }
        @media(max-width:1100px) { .nav-links li a { font-size:13px;padding:6px 10px; } }
        @media(max-width:900px)  { .nav-links{display:none;} .hamburger{display:flex;} }
      `}</style>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <img src={logoFull} alt="HolySpirit Hub" />
          </Link>
          <ul className="nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`${isActive(l.to) ? "active" : ""} ${l.to === "/prayer-live" ? "pray-live" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li><Link to="/give" className={`nav-cta ${isActive("/give") ? "active" : ""}`}>Give</Link></li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <Link key={l.to} to={l.to} className={isActive(l.to) ? "active" : ""}>{l.label}</Link>
        ))}
        <Link to="/give" className="mobile-give">Give 🙏</Link>
      </div>
    </>
  );
}
