import { useState, useEffect } from "react";
import { fetchTeachings } from "../api/hshApi";

export default function Teachings() {
  const [filter, setFilter] = useState("All");
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ["All","The Holy Spirit","Prayer","Faith","Worship","Identity","Prophecy"];
  useEffect(()=>{ document.title="Teachings — HolySpirit Hub"; window.scrollTo(0,0); },[]);
  useEffect(()=>{
    setLoading(true);
    fetchTeachings(filter!=="All"?{category:filter,limit:12}:{limit:12})
      .then(r=>setTeachings(r.teachings||[])).catch(()=>setTeachings([])).finally(()=>setLoading(false));
  },[filter]);
  return (
    <>
      <style>{`.f-bar{display:flex;gap:10px;flex-wrap:wrap;margin:40px 0;}.f-btn{padding:9px 20px;border-radius:50px;border:1px solid rgba(26,10,255,.2);font-size:14px;transition:all .2s;font-family:var(--ff);color:var(--text);cursor:pointer;}.f-btn:hover{border-color:var(--blue);color:var(--blue);}.f-btn.active{background:var(--blue);color:white;border-color:var(--blue);}.t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}.t-card{border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);background:white;transition:all .3s;}.t-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,10,255,.1);}.t-thumb{height:180px;background:linear-gradient(135deg,#0a0635,#1a0aff33);display:flex;align-items:center;justify-content:center;cursor:pointer;}.t-play{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:20px;color:white;transition:all .2s;}.t-thumb:hover .t-play{background:var(--blue);border-color:var(--blue);}.t-body{padding:24px;}.t-series{font-size:11px;color:var(--blue);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;}.t-title{font-size:19px;font-weight:600;margin-bottom:10px;line-height:1.35;}.t-meta{display:flex;gap:16px;font-size:13px;color:var(--grey);margin-bottom:8px;flex-wrap:wrap;}.t-acts{display:flex;gap:10px;margin-top:16px;}.t-acts button,.t-acts a{flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:500;transition:all .2s;font-family:var(--ff);cursor:pointer;text-align:center;display:block;}.t-watch{background:var(--blue);color:white;border:none;}.t-watch:hover{background:var(--blue-dark);}.t-dl{border:1px solid rgba(26,10,255,.2);color:var(--blue);background:none;}.t-dl:hover{background:rgba(26,10,255,.05);}@media(max-width:900px){.t-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:600px){.t-grid{grid-template-columns:1fr;}}`}</style>
      <div className="page-hero"><h1>Teachings & <em style={{color:"var(--gold)"}}>Messages</em></h1><p>Deep, Spirit-led messages to grow your relationship with the Holy Spirit.</p></div>
      <section className="section"><div className="container">
        <div className="f-bar">{categories.map(c=><button key={c} className={`f-btn ${filter===c?"active":""}`} onClick={()=>setFilter(c)}>{c}</button>)}</div>
        {loading?<div className="loading-screen"><span className="spinner spinner-dark"/><span>Loading…</span></div>:
         teachings.length===0?<div className="empty-state"><div className="empty-icon">🎙️</div><p>No teachings found.</p></div>:
        <div className="t-grid">{teachings.map(t=><div key={t.id} className="t-card"><div className="t-thumb"><div className="t-play">▶</div></div><div className="t-body">{t.series&&<div className="t-series">{t.series}</div>}<div className="t-title">{t.title}</div><div className="t-meta"><span>📅 {t.published_at?.slice(0,10)}</span>{t.duration&&<span>⏱ {t.duration}</span>}</div><div style={{fontSize:14,fontWeight:500}}>🎙 {t.speaker}</div><div className="t-acts">{t.video_url?<a href={t.video_url} target="_blank" rel="noreferrer" className="t-watch">▶ Watch</a>:<button className="t-watch">▶ Watch</button>}{t.audio_url?<a href={t.audio_url} download className="t-dl">⬇ Audio</a>:<button className="t-dl">⬇ Audio</button>}</div></div></div>)}</div>}
      </div></section>
    </>
  );
}
