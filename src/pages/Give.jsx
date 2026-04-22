import { useState, useEffect } from "react";
import { initializeDonation } from "../api/hshApi";
export default function Give() {
  const [amount,setAmount]=useState("");const [type,setType]=useState("offering");const [email,setEmail]=useState("");const [name,setName]=useState("");const [loading,setLoading]=useState(false);const [errMsg,setErrMsg]=useState("");
  useEffect(()=>{ document.title="Give — HolySpirit Hub"; },[]);
  const presets=["1000","5000","10000","25000","50000"];
  const fmt=n=>n?"₦"+Number(n).toLocaleString():"₦0";
  const handleGive=async e=>{e.preventDefault();const amt=parseInt(amount.replace(/,/g,""));if(!amt||amt<100){setErrMsg("Minimum donation is ₦100");return;}if(!email){setErrMsg("Email is required");return;}setErrMsg("");setLoading(true);try{const r=await initializeDonation({amount_kobo:amt*100,giving_type:type,email,name,callback_url:window.location.origin+"/give/callback"});window.location.href=r.authorization_url;}catch(err){setErrMsg(err.message);}finally{setLoading(false);}};
  return (<>
    <style>{`.give-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:start;margin-top:56px;}.give-card{background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(26,10,255,.08);}.give-types{display:flex;gap:8px;margin-bottom:28px;flex-wrap:wrap;}.give-type{padding:9px 20px;border-radius:50px;font-size:14px;border:1px solid rgba(26,10,255,.2);transition:all .2s;font-family:var(--ff);color:var(--text);cursor:pointer;}.give-type.active{background:var(--blue);color:white;border-color:var(--blue);}.presets{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}.preset{padding:9px 16px;border-radius:10px;font-size:14px;border:1px solid rgba(26,10,255,.2);transition:all .2s;font-family:var(--ff);cursor:pointer;}.preset.active,.preset:hover{background:rgba(26,10,255,.06);border-color:var(--blue);color:var(--blue);}.amt-wrap{position:relative;margin-bottom:16px;}.amt-sym{position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:22px;font-weight:700;color:var(--grey);pointer-events:none;}.amt-input{width:100%;padding:16px 16px 16px 48px;font-size:28px;font-weight:700;font-family:var(--ffh);border:2px solid rgba(26,10,255,.15);border-radius:16px;outline:none;color:var(--text);transition:border-color .2s;}.amt-input:focus{border-color:var(--blue);}.scripture-card{background:linear-gradient(135deg,var(--blue),var(--blue-dark));border-radius:20px;padding:36px;color:white;text-align:center;margin-top:20px;}.scripture-card blockquote{font-family:var(--ffh);font-size:18px;font-style:italic;line-height:1.6;margin-bottom:12px;}.scripture-card cite{font-size:12px;opacity:.65;}.give-err{background:#fff1f2;color:#be123c;border-left:3px solid #be123c;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:14px;}@media(max-width:800px){.give-grid{grid-template-columns:1fr;}}`}</style>
    <div className="page-hero"><h1>Give <em style={{color:"var(--gold)"}}>Generously</em></h1><p>Your giving partners with us to spread the consciousness of the Holy Spirit globally.</p></div>
    <section className="section"><div className="container"><div className="give-grid">
      <div><div className="label">Make a Donation</div><h2 className="section-title">Give <em>Today</em></h2><div className="divider"/>
        <div className="give-card">
          <div className="give-types">{["offering","tithe","missions","building"].map(t=><button key={t} className={`give-type ${type===t?"active":""}`} onClick={()=>setType(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
      {/*<form onSubmit={handleGive}>
            <p style={{fontSize:14,color:"var(--grey)",marginBottom:10}}>Select or enter amount (₦)</p>
            <div className="presets">{presets.map(p=><button key={p} type="button" className={`preset ${amount===p?"active":""}`} onClick={()=>setAmount(p)}>₦{Number(p).toLocaleString()}</button>)}</div>
            <div className="amt-wrap"><span className="amt-sym">₦</span><input className="amt-input" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,""))}/></div>
            <div className="form-group"><label className="form-label">Your Name (optional)</label><input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/></div>
            <div className="form-group"><label className="form-label">Email Address *</label><input className="form-input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="For your receipt"/></div>
            {errMsg&&<div className="give-err">{errMsg}</div>}
            <button type="submit" className="btn-gold" style={{width:"100%",justifyContent:"center",fontSize:16,padding:16}} disabled={loading}>{loading?<span className="spinner"/>:`Give ${fmt(amount)} via Paystack 🙏`}</button>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"var(--grey)",marginTop:14}}>🔒 Secured by Paystack · ₦100 minimum</div>
          </form>*/}
          <div style={{
            border: "1px solid rgba(26,10,255,.1)",
            borderRadius: 16,
            padding: 24,
            background: "rgba(26,10,255,.02)"
          }}>
            <h3 style={{marginBottom: 12}}>Bank Transfer</h3>
          
            <p style={{marginBottom: 10, fontWeight: 600}}>
              THE HOLYSPIRIT HUB INTERNATIONAL
            </p>
          
            <div style={{fontSize: 14, color: "var(--grey)", lineHeight: 1.8}}>
              <p><strong>Bank:</strong> UBA</p>
              <p><strong>Naira:</strong> 1030053633</p>
              <p><strong>Dollar:</strong> 3005121921</p>
              <p><strong>Pounds:</strong> 3005122739</p>
            </div>
            <button onClick={() => navigator.clipboard.writeText("1030053633")}>
              Copy Naira Account
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{background:"var(--grey-light)",borderRadius:20,padding:32,marginBottom:20}}><h3 style={{fontSize:20,marginBottom:10}}>Giving Categories</h3><ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,fontSize:14,color:"var(--grey)"}}>{[["🌾","Offering","General ministry operations"],["💰","Tithe","Return to God a tenth"],["🌍","Missions","Fund global outreach"],["🏗️","Building","Physical & digital infrastructure"]].map(([icon,n,d])=><li key={n} style={{display:"flex",gap:10}}><span style={{fontSize:20}}>{icon}</span><div><strong>{n}</strong> — {d}</div></li>)}</ul></div>
        <div className="scripture-card"><blockquote>"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</blockquote><cite>— 2 Corinthians 9:7</cite></div>
      </div>
    </div></div></section>
  </>);
}
