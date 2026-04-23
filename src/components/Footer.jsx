import { useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../assets/logo-white.png";
import * as api from "../api/hshApi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSub = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const r = await api.subscribeNewsletter({ email });
      setMsg(r.message || "Subscribed! 🕊️");
      setEmail("");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 4000);
    }
  };

  return (
    <>
      <style>{`
        footer { background:var(--dark);color:rgba(255,255,255,.7);padding:80px 0 32px; }
        .footer-grid { display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:48px;margin-bottom:60px; }
        .footer-brand img { height:40px;filter:brightness(0) invert(1);margin-bottom:20px; }
        .footer-brand p { font-size:14px;line-height:1.8;max-width:280px; }

        .footer-socials { display:flex;gap:12px;margin-top:24px; }

        .soc {
          width:40px;height:40px;border-radius:50%;
          border:1px solid rgba(255,255,255,.15);
          display:flex;align-items:center;justify-content:center;
          transition:all .25s;
          cursor:pointer;
        }

        .soc svg { width:18px;height:18px;fill:white; }

        .soc:hover {
          transform:translateY(-3px);
          border-color:var(--blue);
          background:var(--blue);
        }

        .footer-col h4 { font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:20px; }

        .footer-col ul { list-style:none;display:flex;flex-direction:column;gap:10px; }

        .footer-col ul li a { color:rgba(255,255,255,.6);font-size:14px;transition:color .2s; }

        .footer-col ul li a:hover { color:white; }

        .footer-nl form { display:flex;flex-direction:column;gap:10px;margin-top:12px; }

        .footer-nl input {
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.12);
          border-radius:10px;
          padding:12px 16px;
          color:white;
        }

        .footer-nl button {
          background:var(--blue);
          color:white;
          padding:12px;
          border-radius:10px;
          font-size:14px;
        }

        .footer-bottom {
          border-top:1px solid rgba(255,255,255,.08);
          padding-top:28px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          font-size:13px;
        }

        @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px){ .footer-grid{grid-template-columns:1fr;} .footer-bottom{flex-direction:column;gap:12px;text-align:center;} }
      `}</style>

      <footer>
        <div className="container">
          <div className="footer-grid">

            {/* BRAND */}
            <div className="footer-brand">
              <img src={logoWhite} alt="HolySpirit Hub" />
              <p>
                A non-denominational ministry devoted to bringing the consciousness
                and presence of the Holy Spirit to every heart and nation.
              </p>

              {/* 🔥 SOCIAL ICONS */}
              <div className="footer-socials">

                {/* YOUTUBE */}
                <a href="https://www.youtube.com/@holyspirithub" target="_blank" rel="noopener noreferrer" className="soc">
                  <svg viewBox="0 0 24 24">
                    <path d="M23 7s-.2-1.5-.8-2.2c-.7-.8-1.5-.8-1.9-.9C17.6 3.7 12 3.7 12 3.7h0s-5.6 0-8.3.2c-.4 0-1.2.1-1.9.9C1.2 5.5 1 7 1 7S.8 8.8.8 10.6v1.8C.8 14.2 1 16 1 16s.2 1.5.8 2.2c.7.8 1.6.8 2 .9 1.5.1 6.2.2 8.2.2s6.7 0 8.3-.2c.4 0 1.2-.1 1.9-.9.6-.7.8-2.2.8-2.2s.2-1.8.2-3.6v-1.8C23.2 8.8 23 7 23 7zM9.7 14.6V8.8l5.4 2.9-5.4 2.9z"/>
                  </svg>
                </a>

                {/* TIKTOK */}
                <a href="https://www.tiktok.com/@theholyspirithub" target="_blank" rel="noopener noreferrer" className="soc">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.6 2h3.2c.2 1.7 1.2 3.2 2.7 4 .9.5 2 .8 3.1.8v3.3c-1.4 0-2.7-.3-3.9-.9v6.7c0 3.6-2.9 6.5-6.5 6.5S4.7 19.5 4.7 16s2.9-6.5 6.5-6.5c.3 0 .6 0 .9.1v3.3c-.3-.1-.6-.1-.9-.1-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2V2z"/>
                  </svg>
                </a>

                {/* INSTAGRAM */}
                <a href="https://www.instagram.com/theholyspirithub" target="_blank" rel="noopener noreferrer" className="soc">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 4.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8zm6.4-.9a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z"/>
                  </svg>
                </a>

                {/* FACEBOOK */}
                <a href="https://web.facebook.com/theholyspirithub" target="_blank" rel="noopener noreferrer" className="soc">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.8c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.4.2 2.4.2v2.7h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
                  </svg>
                </a>

              </div>
            </div>

            {/* LINKS */}
            <div className="footer-col">
              <h4>Ministry</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/teachings">Teachings</Link></li>
                <li><Link to="/watch">Watch Live</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/prayer">Prayer</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/give">Give</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="footer-col footer-nl">
              <h4>Stay Connected</h4>
              <p>Weekly devotionals every Monday morning.</p>

              <form onSubmit={handleSub}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button disabled={loading}>
                  {loading ? "..." : "Subscribe"}
                </button>
                {msg && <p>{msg}</p>}
              </form>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© 2026 HolySpirit Hub</span>
            <span style={{ color: "var(--gold)" }}>
              WE RELY ON THE HOLYSPIRIT!
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
