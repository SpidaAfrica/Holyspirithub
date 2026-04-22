import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTeachings, fetchEvents, fetchPrayerWall, subscribeNewsletter } from "../api/hshApi";
import logoWhite from "../assets/logo-white.png";

export default function Home() {
  const [featured,    setFeatured]    = useState(null);
  const [events,      setEvents]      = useState([]);
  const [wall,        setWall]        = useState([]);
  const [subEmail,    setSubEmail]    = useState("");
  const [subLoading,  setSubLoading]  = useState(false);
  const [subMsg,      setSubMsg]      = useState("");

  useEffect(() => {
    fetchTeachings({ featured:1, limit:1 }).then(r => setFeatured((r.teachings||[])[0]||null)).catch(()=>{});
    fetchEvents({ upcoming:1, limit:3 }).then(r => setEvents(r.events||[])).catch(()=>{});
    fetchPrayerWall(3).then(r => setWall(r.items||[])).catch(()=>{});
    window.scrollTo(0,0);
  }, []);

  const handleSub = async e => {
    e.preventDefault();
    setSubLoading(true);
    try { const r = await subscribeNewsletter({email:subEmail}); setSubMsg(r.message); setSubEmail(""); }
    catch(err) { setSubMsg(err.message); }
    finally { setSubLoading(false); setTimeout(()=>setSubMsg(""),4000); }
  };

  const ministries = [
    {icon:"🕊️",title:"Spirit-Led Teachings",desc:"Deep, revelatory teachings on the person and work of the Holy Spirit."},
    {icon:"🔥",title:"Worship & Presence",desc:"Encounters that go beyond singing — into the manifest presence of God."},
    {icon:"🌍",title:"Global Community",desc:"A family of believers united by the Spirit across nations and cultures."},
    {icon:"🙏",title:"Prayer & Intercession",desc:"Dedicated prayer watches and intercession for individuals and nations."},
  ];

  return (
    <>
      <style>{`
        .hero{min-height:100vh;background:linear-gradient(160deg,#050215 0%,#0a0635 40%,#120b6e 70%,#0a0635 100%);position:relative;overflow:hidden;display:flex;align-items:center;}
        .hero-glow{position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(26,10,255,.25) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .hero-gold-glow{position:absolute;width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);top:20%;right:10%;}
        .hero-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 24px 0;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:10px;background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.25);border-radius:50px;padding:8px 18px;font-size:13px;font-weight:500;letter-spacing:.08em;color:var(--gold);margin-bottom:28px;animation:fadeUp .6s ease both;}
        .hero-eyebrow::before{content:'✦';}
        .hero-h1{font-size:clamp(44px,6vw,80px);color:white;line-height:1.08;margin-bottom:24px;animation:fadeUp .7s .1s ease both;}
        .hero-h1 em{font-style:italic;color:var(--gold);background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--gold));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite;}
        .hero-sub{color:rgba(255,255,255,.65);font-size:18px;line-height:1.7;margin-bottom:40px;animation:fadeUp .7s .2s ease both;}
        .hero-actions{display:flex;gap:16px;flex-wrap:wrap;animation:fadeUp .7s .3s ease both;}
        .hero-stats{display:flex;gap:32px;margin-top:52px;animation:fadeUp .7s .4s ease both;}
        .hero-stat-num{font-family:var(--ffh);font-size:36px;font-weight:700;color:white;}
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
        .feat-msg{background:linear-gradient(135deg,var(--dark) 0%,#0f0640 100%);border-radius:28px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;}
        .feat-video{background:#0f0640;min-height:320px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
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
        .ev-date-num{font-family:var(--ffh);font-size:28px;font-weight:700;color:var(--blue);}
        .ev-date-month{font-size:11px;color:var(--grey);text-transform:uppercase;letter-spacing:.08em;}
        .ev-tag{background:rgba(26,10,255,.08);color:var(--blue);padding:4px 12px;border-radius:50px;font-size:12px;font-weight:500;}
        .wall-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
        .wall-card{background:white;border-radius:20px;padding:28px;border:1px solid rgba(26,10,255,.06);transition:all .3s;}
        .wall-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(26,10,255,.08);}
        .wall-text{font-size:15px;font-style:italic;line-height:1.7;color:#333;margin-bottom:18px;font-family:var(--ffh);}
        .cta-banner{background:linear-gradient(135deg,var(--blue) 0%,var(--blue-dark) 60%,#050080 100%);border-radius:28px;padding:80px 60px;text-align:center;position:relative;overflow:hidden;}
        .cta-banner h2{font-size:clamp(32px,4vw,52px);color:white;margin-bottom:16px;}
        .cta-banner p{color:rgba(255,255,255,.7);font-size:18px;margin-bottom:36px;}
        .cta-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
        .nl-banner{background:var(--grey-light);border-radius:24px;padding:60px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
        .nl-form{display:flex;gap:12px;flex-wrap:wrap;}
        .nl-form input{flex:1;min-width:200px;padding:14px 18px;border:1px solid rgba(26,10,255,.15);border-radius:50px;font-size:14px;font-family:var(--ff);outline:none;}
        .nl-form input:focus{border-color:var(--blue);}
        /* live banner */
        .live-prayer-banner{background:linear-gradient(135deg,#060818,#0f0640);border:1px solid rgba(239,68,68,.25);border-radius:20px;padding:28px 36px;display:flex;align-items:center;gap:24px;margin-bottom:60px;cursor:pointer;transition:all .3s;}
        .live-prayer-banner:hover{border-color:rgba(239,68,68,.5);transform:translateY(-2px);}
        .live-dot{width:12px;height:12px;border-radius:50%;background:#ef4444;animation:pulse-ring 1.5s ease-out infinite;flex-shrink:0;}
        .live-banner-text h3{font-size:20px;font-family:var(--ffh);color:white;margin-bottom:4px;}
        .live-banner-text p{font-size:14px;color:rgba(255,255,255,.5);}
        .live-banner-cta{margin-left:auto;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#ef4444;padding:10px 22px;border-radius:50px;font-size:14px;font-weight:500;white-space:nowrap;font-family:var(--ff);}
        @media(max-width:900px){.hero-content{grid-template-columns:1fr;text-align:center;padding-top:100px;}.hero-visual{display:none;}.hero-actions{justify-content:center;}.hero-stats{justify-content:center;}.min-grid{grid-template-columns:repeat(2,1fr);}.feat-msg{grid-template-columns:1fr;}.wall-grid{grid-template-columns:1fr;}.nl-banner{grid-template-columns:1fr;}.live-prayer-banner{flex-direction:column;text-align:center;}.live-banner-cta{margin:0;}}
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
              <Link to="/watch" className="btn-gold">▶ Watch Live</Link>
              <Link to="/about" className="btn-ghost">Our Story</Link>
            </div>
            <div className="hero-stats">
              {[["5K+","Lives Touched"],["1","Nation"],["50+","Teachings"]].map(([n,l])=>(
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
          {/* Live Prayer Banner 
          <Link to="/prayer-live" style={{textDecoration:"none"}}>
            <div className="live-prayer-banner">
              <div className="live-dot"/>
              <div className="live-banner-text">
                <h3>🎙️ Live Prayer Room coming soon</h3>
                <p>Join or lead a live prayer session — worship, intercession and encounters in real time.</p>
              </div>
              <div className="live-banner-cta">Join Now →</div>
            </div>
          </Link> */}

          <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
            <div className="label">Our Ministry</div>
            <h2 className="section-title">Everything we do is <em>Spirit-led</em></h2>
            <div className="divider" style={{margin:"20px auto"}}/>
            <p className="section-sub" style={{margin:"0 auto"}}>We exist to cultivate awareness of the Holy Spirit in every area of life.</p>
          </div>
          <div className="min-grid">
            {ministries.map(m=>(
              <div key={m.title} className="min-card">
                <div className="min-icon">{m.icon}</div>
                <h3 style={{fontSize:19,marginBottom:8,fontWeight:600}}>{m.title}</h3>
                <p style={{fontSize:14,color:"var(--grey)",lineHeight:1.6}}>{m.desc}</p>
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
              <div className="feat-video"><div className="play-btn">▶</div></div>
              <div className="feat-info">
                <div className="label">Latest Teaching</div>
                <h2>{featured.title}</h2>
                <div className="feat-meta">
                  <span>📅 {featured.published_at?.slice(0,10)}</span>
                  <span>⏱ {featured.duration}</span>
                  <span>🎙 {featured.speaker}</span>
                </div>
                <p>{featured.description}</p>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  <Link to="/teachings" className="btn-primary">Watch Now</Link>
                  <button className="btn-ghost">Download Audio</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:8,flexWrap:"wrap",gap:16}}>
              <div><div className="label">What's Coming</div><h2 className="section-title">Upcoming <em>Events</em></h2></div>
              <Link to="/events" className="btn-outline">View All</Link>
            </div>
            <div className="ev-list">
              {events.map(e=>{
                const d=new Date(e.event_date);
                return (
                  <div key={e.id} className="ev-item">
                    <div className="ev-date">
                      <div className="ev-date-num">{d.getDate()}</div>
                      <div className="ev-date-month">{d.toLocaleString("default",{month:"short"})}</div>
                    </div>
                    <div style={{flex:1}}>
                      <h3 style={{fontSize:18,marginBottom:4}}>{e.title}</h3>
                      <div style={{display:"flex",gap:16,fontSize:13,color:"var(--grey)",flexWrap:"wrap"}}>
                        <span>⏰ {e.start_time}</span>
                        <span>📍 {e.location}</span>
                        <span className="ev-tag">{e.event_type}</span>
                      </div>
                    </div>
                    <Link to="/events" className="btn-outline">RSVP</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PRAYER WALL */}
      {wall.length > 0 && (
        <section className="section" style={{background:"var(--grey-light)"}}>
          <div className="container">
            <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
              <div className="label">Community Prayer</div>
              <h2 className="section-title">We're <em>Praying</em> Together</h2>
            </div>
            <div className="wall-grid">
              {wall.map(w=>(
                <div key={w.id} className="wall-card">
                  <p className="wall-text">"{w.request}"</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,fontWeight:600}}>— {w.display_name}</span>
                    <span style={{fontSize:12,color:"var(--grey)"}}>{w.status==="praying"?"🙏 Being prayed for":"🕊️"}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:36}}>
              <Link to="/prayer" className="btn-outline">Submit Your Request</Link>
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
              <p style={{color:"var(--grey)",lineHeight:1.7}}>Weekly devotionals, teaching highlights and event updates — every Monday morning.</p>
            </div>
            <form className="nl-form" onSubmit={handleSub}>
              <input type="email" placeholder="Your email address" value={subEmail} onChange={e=>setSubEmail(e.target.value)} required/>
              <button className="btn-primary" type="submit" disabled={subLoading}>
                {subLoading?<span className="spinner"/>:"Subscribe →"}
              </button>
              {subMsg && <p style={{fontSize:13,color:"var(--blue)",width:"100%"}}>{subMsg}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to encounter the Holy Spirit?</h2>
            <p>Join hundreds worldwide discovering daily life with the Spirit of God.</p>
            <div className="cta-actions">
              <Link to="/community" className="btn-gold">Join Our Community</Link>
              <Link to="/prayer" className="btn-ghost">Submit a Prayer Request</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
