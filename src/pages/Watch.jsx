import { useState, useEffect } from "react";
import { fetchSchedule } from "../api/hshApi";
export default function Watch() {
  const [schedule,setSchedule]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{ document.title="Watch Live — HolySpirit Hub"; fetchSchedule().then(r=>setSchedule(r.schedule||[])).catch(()=>{}).finally(()=>setLoading(false)); },[]);
  return (<>
    <style>{`.sched-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}.sched-item{background:white;border-radius:16px;padding:24px;border:1px solid rgba(26,10,255,.08);display:flex;align-items:center;gap:20px;}.sched-day{background:var(--grey-light);border-radius:12px;padding:12px 16px;text-align:center;min-width:80px;}.sched-day-name{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--grey);}.sched-day-time{font-family:var(--ffh);font-size:20px;font-weight:700;color:var(--blue);}.stream-wrap{background:#050215;border-radius:24px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;margin:48px 0;border:2px solid rgba(26,10,255,.2);}.live-badge-big{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);border-radius:50px;padding:8px 18px;font-size:13px;color:#ef4444;margin-bottom:20px;}.live-badge-big::before{content:"";width:8px;height:8px;background:#ef4444;border-radius:50%;animation:pulse-ring 1.5s infinite;}.big-play-btn{width:100px;height:100px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-size:40px;color:white;margin:0 auto 24px;box-shadow:0 0 0 24px rgba(26,10,255,.1);}@media(max-width:600px){.sched-grid{grid-template-columns:1fr;}}`}</style>
    <div className="page-hero"><h1><em style={{color:"var(--gold)"}}>Watch</em> Live</h1><p>Join us from anywhere in the world for Spirit-led worship and teaching.</p></div>
    <section className="section"><div className="container">
      <div className="label">Live Stream</div><h2 className="section-title">Join Us <em>Online</em></h2>
      <div className="stream-wrap"><div style={{textAlign:"center",color:"white"}}><div className="live-badge-big">LIVE every Sunday</div><div className="big-play-btn"><a href="https://www.youtube.com/@holyspirithub">▶</a></div><h3 style={{fontSize:22,marginBottom:8}}>Stream starts soon</h3><p style={{color:"rgba(255,255,255,.5)",fontSize:15}}>Join at the scheduled times below</p><div style={{marginTop:24}}>{/*<button className="btn-gold">Set a Reminder</button>*/}</div></div></div>
      <h3 style={{fontSize:28,fontFamily:"var(--ffh)",marginBottom:8}}>Service Schedule</h3>
      <p style={{color:"var(--grey)",marginBottom:32}}>All times are in West Africa Time (WAT).</p>
      {loading?<div className="loading-screen"><span className="spinner spinner-dark"/></div>:
      <div className="sched-grid">{schedule.map(s=><div key={s.id} className="sched-item"><div className="sched-day"><div className="sched-day-name">{s.day_of_week.slice(0,3)}</div><div className="sched-day-time">{s.start_time.split(" ")[0]}</div><div style={{fontSize:10,color:"var(--grey)"}}>WAT</div></div><div><div style={{fontSize:17,fontWeight:600}}>{s.title}</div><div style={{fontSize:13,color:"var(--grey)",marginTop:4}}>{s.day_of_week} · {s.start_time}</div></div></div>)}</div>}
    </div></section>
  </>);
}
