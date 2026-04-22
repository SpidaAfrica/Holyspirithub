import { useState, useEffect } from "react";
import { submitPrayer, fetchPrayerWall } from "../api/hshApi";
export default function Prayer() {
  const [form,setForm]=useState({name:"",email:"",request:"",anonymous:false,show_on_wall:true});
  const [loading,setLoading]=useState(false);const [submitted,setSubmitted]=useState(false);
  const [wall,setWall]=useState([]);const [wallLoading,setWallLoading]=useState(true);const [msg,setMsg]=useState("");
  useEffect(()=>{ document.title="Prayer — HolySpirit Hub"; fetchPrayerWall(8).then(r=>setWall(r.items||[])).catch(()=>{}).finally(()=>setWallLoading(false)); },[]);
  const handleSubmit=async e=>{e.preventDefault();setLoading(true);try{const r=await submitPrayer(form);setMsg(r.message);setSubmitted(true);fetchPrayerWall(8).then(r=>setWall(r.items||[])).catch(()=>{});}catch(err){setMsg(err.message);}finally{setLoading(false);}};
  return (<>
    <style>{`.pr-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:56px;align-items:start;}.pr-form-card{background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(26,10,255,.08);border:1px solid rgba(26,10,255,.08);}.pr-anon{display:flex;align-items:center;gap:10px;font-size:14px;cursor:pointer;margin-bottom:16px;}.pr-wall-item{background:white;border-radius:16px;padding:18px 22px;border:1px solid rgba(26,10,255,.08);font-size:14px;line-height:1.7;margin-bottom:12px;}.pr-wall-item:first-child{border-left:4px solid var(--blue);}@media(max-width:800px){.pr-grid{grid-template-columns:1fr;}}`}</style>
    <div className="page-hero"><h1>Prayer <em style={{color:"var(--gold)"}}>Requests</em></h1><p>We are a praying community. Submit your request and we will stand with you.</p></div>
    <section className="section"><div className="container"><div className="pr-grid">
      <div><div className="label">Submit a Request</div><h2 className="section-title">We're Praying <em>With You</em></h2><div className="divider"/><p style={{color:"var(--grey)",lineHeight:1.8,marginBottom:32}}>Our dedicated prayer team intercedes over every request. The Holy Spirit, your Helper, is involved.</p>
        <div className="pr-form-card">{submitted?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:56,marginBottom:16}}>🙏</div><h3 style={{fontSize:24,marginBottom:12}}>We're praying for you!</h3><p style={{color:"var(--grey)"}}>{msg}</p><button className="btn-primary" style={{marginTop:24}} onClick={()=>setSubmitted(false)}>Submit Another</button></div>:
        <form onSubmit={handleSubmit}><div className="form-group"><label className="form-label">Your Name</label><input className="form-input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="First name"/></div><div className="form-group"><label className="form-label">Email (optional)</label><input className="form-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="For follow-up"/></div><div className="form-group"><label className="form-label">Your Prayer Request</label><textarea className="form-input" required value={form.request} onChange={e=>setForm({...form,request:e.target.value})} placeholder="Share what you'd like us to pray about…"/></div><label className="pr-anon"><input type="checkbox" style={{accentColor:"var(--blue)"}} checked={form.anonymous} onChange={e=>setForm({...form,anonymous:e.target.checked})}/>Keep my name anonymous on the prayer wall</label><label className="pr-anon"><input type="checkbox" style={{accentColor:"var(--blue)"}} checked={form.show_on_wall} onChange={e=>setForm({...form,show_on_wall:e.target.checked})}/>Show on community prayer wall</label><button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center"}} disabled={loading}>{loading?<span className="spinner"/>:"Submit Prayer Request 🙏"}</button></form>}
        </div></div>
      <div><h3 style={{fontSize:24,fontFamily:"var(--ffh)",marginBottom:8}}>🔥 Prayer Wall</h3><p style={{color:"var(--grey)",fontSize:14,marginBottom:20}}>Join the community in intercession.</p>
        {wallLoading?<div className="loading-screen"><span className="spinner spinner-dark"/></div>:wall.length===0?<div className="empty-state"><div className="empty-icon">🙏</div><p>Be the first to submit a request.</p></div>:
        wall.map(w=><div key={w.id} className="pr-wall-item">"{w.request}"<div style={{fontSize:12,color:"var(--grey)",marginTop:8}}>— {w.display_name} · {w.status==="praying"?"🙏 Being prayed for":"🕊️"}</div></div>)}
      </div>
    </div></div></section>
  </>);
}
