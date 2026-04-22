import { useState, useEffect } from "react";
import { subscribeNewsletter } from "../api/hshApi";
export default function Community() {
  const [email,setEmail]=useState("");const [loading,setLoading]=useState(false);const [msg,setMsg]=useState("");
  useEffect(()=>{ document.title="Community — HolySpirit Hub"; },[]);
  const ways = [
  {
    icon: "💬",
    title: "WhatsApp Community",
    desc: "Join our active WhatsApp community for daily devotionals, discussions and prayer.",
    action: "Join WhatsApp Group",
    color: "#25D366",
    link: "https://chat.whatsapp.com/Ca3KQpFt6fbJT2cWXlaWNc"
  },
  {
    icon: "📱",
    title: "Telegram Channel",
    desc: "Follow our Telegram for teaching notifications and Spirit-led content.",
    action: "Join Telegram",
    color: "#0088cc",
    link: "https://t.me/apostleuwabenjaminmessages/"
  },
  {
    icon: "🎥",
    title: "YouTube Channel",
    desc: "Subscribe for all our teachings, worship sessions and conference recordings.",
    action: "Subscribe",
    color: "#FF0000",
    link: "https://www.youtube.com/@holyspirithub"
  },
  {
    icon: "📘",
    title: "Facebook Group",
    desc: "Join our Facebook community for discussions, testimonies and livestreams.",
    action: "Join Facebook Group",
    color: "#1877F2",
    link: "https://facebook.com/theholyspirithub"
  },
  {
    icon: "📸",
    title: "Instagram",
    desc: "Follow for daily quotes, devotionals and event coverage.",
    action: "Follow on Instagram",
    color: "#E1306C",
    link: "https://instagram.com/YOUR_PAGE"
  },
  {
    icon: "🌐",
    title: "Small Groups",
    desc: "Find a Spirit-focused small group in your city or online.",
    action: "Find a Group",
    color: "var(--blue)",
    link: "https://chat.whatsapp.com/Ca3KQpFt6fbJT2cWXlaWNc" // internal page
  }
];
  const handleSub=async e=>{e.preventDefault();setLoading(true);try{const r=await subscribeNewsletter({email});setMsg(r.message);setEmail("");}catch(err){setMsg(err.message);}finally{setLoading(false);}};
  return (<>
    <style>{`.com-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;}.com-card{background:white;border-radius:20px;padding:32px;border:1px solid rgba(26,10,255,.08);text-align:center;transition:all .3s;}.com-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.1);}.com-btn{display:inline-block;padding:11px 24px;border-radius:50px;font-size:14px;font-weight:500;color:white;cursor:pointer;border:none;font-family:var(--ff);transition:all .2s;}.com-btn:hover{opacity:.85;transform:translateY(-2px);}@media(max-width:900px){.com-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:600px){.com-grid{grid-template-columns:1fr;}}`}</style>
    <div className="page-hero"><h1>Join the <em style={{color:"var(--gold)"}}>Community</em></h1><p>You were never meant to walk alone. Find your place in the HolySpirit Hub family.</p></div>
    <section className="section"><div className="container"><div style={{textAlign:"center"}}><div className="label">Connect With Us</div><h2 className="section-title">Many Ways to <em>Connect</em></h2></div>
      <div className="com-grid">{ways.map(w=><div key={w.title} className="com-card"><div style={{fontSize:40,marginBottom:16}}>{w.icon}</div><h3 style={{fontSize:20,marginBottom:10}}>{w.title}</h3><p style={{fontSize:14,color:"var(--grey)",lineHeight:1.7,marginBottom:24}}>{w.desc}</p><a
        href={w.link}
        target="_blank"
        rel="noopener noreferrer"
        className="com-btn"
        style={{background:w.color}}
      >
  {w.action}
</a></div>)}</div>
    </div></section>
    <section className="section" style={{background:"var(--grey-light)"}}><div className="container"><div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}><div className="label">Newsletter</div><h2 className="section-title">Stay in the <em>Flow</em></h2><p style={{color:"var(--grey)",marginBottom:32}}>Weekly devotionals, teaching excerpts, and event updates — every Monday morning.</p><form onSubmit={handleSub} style={{display:"flex",gap:12,maxWidth:480,margin:"0 auto",flexWrap:"wrap"}}><input style={{flex:1,minWidth:200,padding:"14px 18px",border:"1px solid rgba(26,10,255,.15)",borderRadius:50,fontSize:14,fontFamily:"var(--ff)",outline:"none"}} type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required/><button className="btn-primary" type="submit" disabled={loading}>{loading?<span className="spinner"/>:"Subscribe"}</button></form>{msg&&<p style={{fontSize:13,color:"var(--blue)",marginTop:16}}>{msg}</p>}</div></div></section>
  </>);
}
