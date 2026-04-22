import { useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../assets/logo-white.png";
import * as api from "../api/hshApi";

export default function Footer() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState("");

  const handleSub = async e => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const r = await api.subscribeNewsletter({ email });
      setMsg(r.message || "Subscribed! 🕊️");
      setEmail("");
    } catch(err) { setMsg(err.message); }
    finally { setLoading(false); setTimeout(() => setMsg(""), 4000); }
  };

  return (
    <>
      <style>{`
        footer { background:var(--dark);color:rgba(255,255,255,.7);padding:80px 0 32px; }
        .footer-grid { display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:48px;margin-bottom:60px; }
        .footer-brand img { height:40px;filter:brightness(0) invert(1);margin-bottom:20px; }
        .footer-brand p { font-size:14px;line-height:1.8;max-width:280px; }
        .footer-socials { display:flex;gap:12px;margin-top:24px; }
        .soc { width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .2s;cursor:pointer; }
        .soc:hover { border-color:var(--blue);background:var(--blue); }
        .footer-col h4 { font-family:var(--ff);font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:20px; }
        .footer-col ul { list-style:none;display:flex;flex-direction:column;gap:10px; }
        .footer-col ul li a { color:rgba(255,255,255,.6);font-size:14px;transition:color .2s;display:block; }
        .footer-col ul li a:hover { color:white; }
        .footer-nl form { display:flex;flex-direction:column;gap:10px;margin-top:12px; }
        .footer-nl input { background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px 16px;color:white;font-size:14px;font-family:var(--ff);outline:none; }
        .footer-nl input:focus { border-color:var(--blue); }
        .footer-nl input::placeholder { color:rgba(255,255,255,.35); }
        .footer-nl button { background:var(--blue);color:white;padding:12px;border-radius:10px;font-size:14px;font-weight:500;transition:background .2s;font-family:var(--ff);display:flex;align-items:center;justify-content:center;gap:8px; }
        .footer-nl button:hover { background:var(--blue-dark); }
        .footer-nl .sub-msg { font-size:13px;color:var(--gold);text-align:center; }
        .footer-bottom { border-top:1px solid rgba(255,255,255,.08);padding-top:28px;display:flex;justify-content:space-between;align-items:center;font-size:13px; }
        @media(max-width:900px) { .footer-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .footer-grid{grid-template-columns:1fr;} .footer-bottom{flex-direction:column;gap:12px;text-align:center;} }
      `}</style>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logoWhite} alt="HolySpirit Hub" />
              <p>A non-denominational ministry devoted to bringing the consciousness and presence of the Holy Spirit to every heart and nation.</p>
              <div className="footer-socials">
                {["📘","📸","▶","🐦"].map((icon,i) => <div key={i} className="soc">{icon}</div>)}
              </div>
            </div>
            <div className="footer-col">
              <h4>Ministry</h4>
              <ul>
                {[["/about","About"],["/teachings","Teachings"],["/watch","Watch Live"],["/events","Events"],["/prayer","Prayer"],["/prayer-live","Pray Live 🔴"]].map(([to,l]) => (
                  <li key={to}><Link to={to}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                {[["/community","Community"],["/blog","Blog"],["/give","Give"],["/contact","Contact"]].map(([to,l]) => (
                  <li key={to}><Link to={to}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col footer-nl">
              <h4>Stay Connected</h4>
              <p style={{fontSize:14}}>Weekly devotionals and updates every Monday morning.</p>
              <form onSubmit={handleSub}>
                <input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required/>
                <button disabled={loading}>{loading ? <span className="spinner"/> : "Subscribe"}</button>
                {msg && <p className="sub-msg">{msg}</p>}
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
