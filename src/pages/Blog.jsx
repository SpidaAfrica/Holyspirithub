import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogPosts, fetchBlogPost } from "../api/hshApi";
const CAT_COLORS={Devotional:"#1a0aff",Teaching:"#7c3aed",Prayer:"#dc2626",Testimony:"#059669"};
const ICONS=["🕊️","🔥","🙏","📖","✨","🌍","💧","⚡","🌿"];
export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [posts,setPosts]=useState([]);const [loading,setLoading]=useState(true);const [filter,setFilter]=useState("All");
  const [post,setPost]=useState(null);const [postLoading,setPostLoading]=useState(false);
  const cats=["All","Devotional","Teaching","Prayer","Testimony"];
  useEffect(()=>{ document.title="Blog — HolySpirit Hub"; },[]);
  useEffect(()=>{
    if(slug){setPostLoading(true);fetchBlogPost(slug).then(r=>setPost(r.post)).catch(()=>navigate("/blog")).finally(()=>setPostLoading(false));}
    else{setPost(null);setLoading(true);fetchBlogPosts(filter!=="All"?{category:filter,limit:9}:{limit:9}).then(r=>setPosts(r.posts||[])).catch(()=>setPosts([])).finally(()=>setLoading(false));}
  },[slug,filter,navigate]);
  if(slug){
    return (<><style>{`.blog-post-hero{background:linear-gradient(135deg,var(--dark),#0f0640);padding:140px 0 60px;text-align:center;}.blog-post-body{max-width:760px;margin:0 auto;padding:60px 24px;}.blog-post-body p{font-size:17px;line-height:1.85;color:#333;margin-bottom:20px;}.blog-post-body h2{font-size:28px;margin:32px 0 16px;}`}</style>
      <div className="blog-post-hero"><div className="container"><button className="btn-ghost" onClick={()=>navigate("/blog")} style={{marginBottom:24}}>← Back to Blog</button><h1 style={{fontSize:"clamp(28px,4vw,52px)",color:"white",maxWidth:760,margin:"0 auto 16px"}}>{post?.title||""}</h1><p style={{color:"rgba(255,255,255,.6)",fontSize:15}}>✍️ {post?.author} &nbsp;·&nbsp; ⏱ {post?.read_time} read</p></div></div>
      <div className="blog-post-body">{postLoading?<div className="loading-screen"><span className="spinner spinner-dark"/></div>:post?<div dangerouslySetInnerHTML={{__html:post.body||`<p>${post.excerpt||""}</p>`}}/>:null}</div>
    </>);
  }
  return (<>
    <style>{`.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:48px;}.blog-card{background:white;border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;cursor:pointer;}.blog-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(26,10,255,.1);}.blog-thumb{height:180px;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);display:flex;align-items:center;justify-content:center;font-size:48px;}.blog-body{padding:28px;}.blog-cat{display:inline-block;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:600;color:white;margin-bottom:12px;}.blog-title{font-size:19px;font-weight:600;line-height:1.35;margin-bottom:12px;}.blog-meta{font-size:13px;color:var(--grey);display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap;}.blog-read{font-size:14px;font-weight:500;color:var(--blue);}@media(max-width:900px){.blog-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:600px){.blog-grid{grid-template-columns:1fr;}}`}</style>
    <div className="page-hero"><h1>Blog & <em style={{color:"var(--gold)"}}>Devotionals</em></h1><p>Spirit-led articles and devotionals to deepen your walk with God.</p></div>
    <section className="section"><div className="container">
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:40}}>{cats.map(c=><button key={c} onClick={()=>setFilter(c)} style={{padding:"9px 20px",borderRadius:50,border:"1px solid rgba(26,10,255,.2)",fontSize:14,fontFamily:"var(--ff)",cursor:"pointer",transition:"all .2s",background:filter===c?"var(--blue)":"transparent",color:filter===c?"white":"var(--text)"}}>{c}</button>)}</div>
      {loading?<div className="loading-screen"><span className="spinner spinner-dark"/></div>:posts.length===0?<div className="empty-state"><div className="empty-icon">📝</div><p>No posts yet.</p></div>:
      <div className="blog-grid">{posts.map((p,i)=><div key={p.id} className="blog-card" onClick={()=>navigate(`/blog/${p.slug}`)}><div className="blog-thumb">{ICONS[i%ICONS.length]}</div><div className="blog-body"><div className="blog-cat" style={{background:CAT_COLORS[p.category]||"var(--blue)"}}>{p.category}</div><h3 className="blog-title">{p.title}</h3><div className="blog-meta"><span>✍️ {p.author}</span>{p.read_time&&<span>⏱ {p.read_time}</span>}</div>{p.excerpt&&<p style={{fontSize:13,color:"var(--grey)",lineHeight:1.6,marginBottom:12}}>{p.excerpt.slice(0,100)}…</p>}<div className="blog-read">Read article →</div></div></div>)}</div>}
    </div></section>
  </>);
}
