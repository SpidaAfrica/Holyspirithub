import { useState, useEffect } from "react";
import { fetchEvents, submitRsvp, fetchFlyers } from "../api/hshApi";

export default function Events() {
  const [events,      setEvents]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [modal,       setModal]       = useState(null);
  const [form,        setForm]        = useState({ name:"", email:"" });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [msg,         setMsg]         = useState("");

  const [flyers,      setFlyers]      = useState([]);
  const [flyerPreview,setFlyerPreview]= useState(null);

  const TC = {
    "Prayer & Worship":"#1a0aff","Teaching":"#7c3aed","Conference":"#c9a84c",
    "Youth":"#059669","Prayer":"#dc2626","Training":"#0891b2","Service":"#1a0aff","Outreach":"#059669"
  };

  useEffect(() => {
    document.title = "Events — HolySpirit Hub";
    fetchEvents({ upcoming:1, limit:12 }).then(r => setEvents(r.events||[])).catch(()=>{}).finally(()=>setLoading(false));
    fetchFlyers({ limit:12 }).then(r => setFlyers(r.flyers||[])).catch(()=>{});
  }, []);

  const handleRsvp = async e => {
    e.preventDefault();
    setRsvpLoading(true);
    try {
      const r = await submitRsvp({ event_id:modal.id, ...form });
      setMsg(r.message);
      setForm({ name:"", email:"" });
    } catch(err) {
      setMsg(err.message);
    } finally {
      setRsvpLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px;}
        .ev-card{background:white;border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;}
        .ev-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,10,255,.1);}
        .ev-top{padding:28px;}
        .ev-card-date{font-family:var(--ffh);font-size:15px;color:var(--grey);margin-bottom:8px;}
        .ev-card-title{font-size:22px;font-weight:600;margin-bottom:10px;line-height:1.3;}
        .ev-card-desc{color:var(--grey);font-size:14px;line-height:1.7;margin-bottom:20px;}
        .ev-card-meta{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--grey);}
        .ev-bottom{padding:16px 28px;border-top:1px solid rgba(26,10,255,.06);display:flex;justify-content:space-between;align-items:center;background:rgba(26,10,255,.02);}
        .ev-badge{padding:5px 14px;border-radius:50px;font-size:12px;font-weight:600;color:white;}

        /* ── Flyers ── */
        .flyers-section{background:linear-gradient(135deg,#0a0f2e,#0d1540);padding:80px 0;}
        .flyers-label{color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;}
        .flyers-title{color:white;font-size:clamp(28px,3.5vw,42px);font-weight:700;margin-bottom:40px;}
        .flyers-title em{color:var(--gold);font-style:italic;}
        .flyers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;}
        .flyer-card{border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .3s,box-shadow .3s;position:relative;}
        .flyer-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px rgba(0,0,0,.5);}
        .flyer-card img{width:100%;aspect-ratio:9/13;object-fit:cover;display:block;}
        .flyer-info{background:rgba(10,15,46,.85);backdrop-filter:blur(6px);padding:14px 16px;position:absolute;bottom:0;left:0;right:0;transform:translateY(100%);transition:transform .3s;}
        .flyer-card:hover .flyer-info{transform:translateY(0);}
        .flyer-name{color:white;font-size:14px;font-weight:600;margin-bottom:4px;}
        .flyer-date{color:rgba(255,255,255,.6);font-size:12px;}

        /* ── Modal ── */
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal-card{background:white;border-radius:24px;padding:40px;width:100%;max-width:460px;}
        .modal-card h3{font-size:24px;margin-bottom:20px;}

        /* ── Flyer lightbox ── */
        .flyer-lb{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:1000;display:flex;align-items:center;justify-content:center;}
        .flyer-lb img{max-height:90vh;max-width:90vw;border-radius:16px;object-fit:contain;}
        .flyer-lb-close{position:absolute;top:20px;right:24px;color:white;font-size:32px;cursor:pointer;opacity:.7;}
        .flyer-lb-close:hover{opacity:1;}

        @media(max-width:700px){.ev-grid{grid-template-columns:1fr;}}
      `}</style>

      <div className="page-hero">
        <h1>Events & <em style={{color:"var(--gold)"}}>Gatherings</em></h1>
        <p>Join us online or in person for encounters that will mark your life.</p>
      </div>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section">
        <div className="container">
          <div className="label">Upcoming</div>
          <h2 className="section-title">Coming <em>Events</em></h2>
          {loading ? (
            <div className="loading-screen"><span className="spinner spinner-dark"/></div>
          ) : events.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📅</div><p>No upcoming events. Check back soon!</p></div>
          ) : (
            <div className="ev-grid">
              {events.map(e => (
                <div key={e.id} className="ev-card">
                  <div className="ev-top">
                    <div className="ev-card-date">
                      📅 {new Date(e.event_date).toLocaleDateString("en-NG",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
                    </div>
                    <h3 className="ev-card-title">{e.title}</h3>
                    {e.description && <p className="ev-card-desc">{e.description}</p>}
                    <div className="ev-card-meta">
                      {e.start_time && <span>⏰ {e.start_time}</span>}
                      {e.location   && <span>📍 {e.location}</span>}
                      {e.is_online  && <span style={{color:"var(--blue)"}}>🌐 Online</span>}
                    </div>
                  </div>
                  <div className="ev-bottom">
                    <span className="ev-badge" style={{background:TC[e.event_type]||"var(--blue)"}}>{e.event_type}</span>
                    <button className="btn-primary" style={{padding:"8px 20px",fontSize:13}} onClick={()=>{setModal(e);setMsg("");}}>RSVP</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── UPCOMING PROGRAMME FLYERS ── */}
      {flyers.length > 0 && (
        <section className="flyers-section">
          <div className="container">
            <div className="flyers-label">Visual Programmes</div>
            <h2 className="flyers-title">Upcoming <em>Programme Flyers</em></h2>
            <div className="flyers-grid">
              {flyers.map(f => (
                <div key={f.id} className="flyer-card" onClick={()=>setFlyerPreview(f)}>
                  <img src={f.flyer_url} alt={f.event_name} onError={e=>{e.target.src="";e.target.style.background="#1a3fd8";e.target.style.minHeight="260px";}} />
                  <div className="flyer-info">
                    <div className="flyer-name">{f.event_name}</div>
                    {f.event_date && <div className="flyer-date">📅 {f.event_date}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP MODAL ── */}
      {modal && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div className="modal-card">
            <h3>RSVP — {modal.title}</h3>
            {msg ? (
              <>
                <p style={{color:"var(--blue)",marginBottom:16}}>{msg}</p>
                <button className="btn-outline" onClick={()=>setModal(null)}>Close</button>
              </>
            ) : (
              <form onSubmit={handleRsvp}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com"/>
                </div>
                <div style={{display:"flex",gap:12,marginTop:8}}>
                  <button type="button" className="btn-outline" onClick={()=>setModal(null)}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={rsvpLoading} style={{flex:1,justifyContent:"center"}}>
                    {rsvpLoading ? <span className="spinner"/> : "Confirm RSVP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── FLYER LIGHTBOX ── */}
      {flyerPreview && (
        <div className="flyer-lb" onClick={()=>setFlyerPreview(null)}>
          <span className="flyer-lb-close" onClick={()=>setFlyerPreview(null)}>✕</span>
          <img src={flyerPreview.flyer_url} alt={flyerPreview.event_name} onClick={e=>e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
