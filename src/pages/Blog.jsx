import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogPosts, fetchBlogPost } from "../api/hshApi";

const CAT_COLORS = {
  Devotional: "#1a0aff",
  Teaching:   "#7c3aed",
  Prayer:     "#dc2626",
  Testimony:  "#059669",
  News:       "#0891b2",
};
const ICONS = ["🕊️","🔥","🙏","📖","✨","🌍","💧","⚡","🌿"];

/* ─── Article / Single Post View ─────────────────────────── */
function ArticleView({ slug }) {
  const navigate = useNavigate();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchBlogPost(slug)
      .then(r => {
        setPost(r.post);
        // Load related posts from same category
        if (r.post?.category) {
          fetchBlogPosts({ category: r.post.category, limit: 3 })
            .then(res => setRelated((res.posts||[]).filter(p => p.slug !== slug)))
            .catch(()=>{});
        }
      })
      .catch(() => navigate("/blog"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span className="spinner spinner-dark" style={{width:36,height:36,borderWidth:3}}/>
      </div>
    );
  }
  if (!post) return null;

  const pubDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-NG",{ year:"numeric", month:"long", day:"numeric" })
    : "";
  const catColor = CAT_COLORS[post.category] || "var(--blue)";

  return (
    <>
      <style>{`
        /* ── Article Hero ── */
        .art-hero{background:linear-gradient(135deg,#0a0f2e 0%,#0d1b68 60%,#1a0a44 100%);padding:120px 0 80px;position:relative;overflow:hidden;}
        .art-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
        .art-hero-inner{position:relative;max-width:800px;margin:0 auto;padding:0 24px;text-align:center;}
        .art-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.6);font-size:14px;margin-bottom:32px;cursor:pointer;transition:color .2s;background:none;border:none;font-family:var(--ff);}
        .art-back:hover{color:white;}
        .art-cat-pill{display:inline-block;padding:6px 18px;border-radius:50px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:white;margin-bottom:20px;}
        .art-hero h1{font-size:clamp(28px,4.5vw,52px);color:white;line-height:1.2;margin-bottom:24px;font-weight:700;}
        .art-hero-meta{display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;color:rgba(255,255,255,.55);font-size:14px;}
        .art-meta-chip{display:flex;align-items:center;gap:6px;}

        /* ── Article Body ── */
        .art-body-wrap{max-width:760px;margin:0 auto;padding:64px 24px 80px;}
        .art-excerpt{font-size:19px;line-height:1.7;color:#555;border-left:4px solid var(--blue);padding-left:24px;margin-bottom:48px;font-style:italic;}
        .art-body{font-size:17px;line-height:1.9;color:#2d2d2d;}
        .art-body p{margin-bottom:24px;}
        .art-body h2{font-size:28px;font-weight:700;margin:48px 0 18px;color:var(--dark);}
        .art-body h3{font-size:22px;font-weight:600;margin:36px 0 14px;color:var(--dark);}
        .art-body blockquote{background:rgba(26,10,255,.04);border-left:4px solid var(--blue);padding:20px 24px;border-radius:0 12px 12px 0;margin:32px 0;font-size:18px;font-style:italic;color:#444;}
        .art-body ul,.art-body ol{padding-left:28px;margin-bottom:24px;}
        .art-body li{margin-bottom:8px;line-height:1.8;}
        .art-body strong{color:#111;font-weight:700;}
        .art-body a{color:var(--blue);text-decoration:underline;}
        .art-body img{width:100%;border-radius:16px;margin:32px 0;}

        /* ── Share Bar ── */
        .art-share{border-top:1px solid #eee;border-bottom:1px solid #eee;padding:24px 0;margin:48px 0;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
        .art-share-label{font-size:13px;font-weight:600;color:var(--grey);text-transform:uppercase;letter-spacing:.06em;margin-right:4px;}
        .art-share-btn{padding:8px 18px;border-radius:50px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid;transition:all .2s;font-family:var(--ff);}

        /* ── Author Card ── */
        .art-author{background:linear-gradient(135deg,rgba(26,10,255,.04),rgba(124,58,237,.04));border:1px solid rgba(26,10,255,.1);border-radius:20px;padding:32px;display:flex;gap:24px;align-items:flex-start;margin-bottom:60px;}
        .art-author-avatar{width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,var(--blue),#7c3aed);display:flex;align-items:center;justify-content:center;font-size:28px;color:white;flex-shrink:0;font-weight:700;}
        .art-author-name{font-size:17px;font-weight:700;margin-bottom:4px;}
        .art-author-role{font-size:13px;color:var(--grey);margin-bottom:8px;}
        .art-author-bio{font-size:14px;color:#555;line-height:1.6;}

        /* ── Related Posts ── */
        .art-related-title{font-size:24px;font-weight:700;margin-bottom:24px;}
        .art-related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;}
        .art-related-card{background:white;border:1px solid rgba(26,10,255,.08);border-radius:16px;overflow:hidden;cursor:pointer;transition:all .3s;}
        .art-related-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(26,10,255,.1);}
        .art-related-thumb{height:120px;display:flex;align-items:center;justify-content:center;font-size:36px;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);}
        .art-related-body{padding:16px;}
        .art-related-cat{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
        .art-related-ttl{font-size:14px;font-weight:600;line-height:1.4;color:var(--dark);}

        @media(max-width:600px){
          .art-author{flex-direction:column;}
          .art-hero-meta{gap:12px;}
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="art-hero">
        <div className="art-hero-inner">
          <button className="art-back" onClick={()=>navigate("/blog")}>
            ← Back to Blog
          </button>
          <div className="art-cat-pill" style={{background:catColor}}>{post.category}</div>
          <h1>{post.title}</h1>
          <div className="art-hero-meta">
            {post.author && (
              <span className="art-meta-chip">✍️ {post.author}</span>
            )}
            {pubDate && (
              <span className="art-meta-chip">📅 {pubDate}</span>
            )}
            {post.read_time && (
              <span className="art-meta-chip">⏱ {post.read_time} read</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className="art-body-wrap">

        {/* Excerpt pull-quote */}
        {post.excerpt && (
          <p className="art-excerpt">{post.excerpt}</p>
        )}

        {/* Main body */}
        <div
          className="art-body"
          dangerouslySetInnerHTML={{ __html: post.body || `<p>${post.excerpt||""}</p>` }}
        />

        {/* Share */}
        <div className="art-share">
          <span className="art-share-label">Share:</span>
          <button className="art-share-btn" style={{borderColor:"#1877f2",color:"#1877f2"}}
            onClick={()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,'_blank')}>
            Facebook
          </button>
          <button className="art-share-btn" style={{borderColor:"#000",color:"#000"}}
            onClick={()=>window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,'_blank')}>
            𝕏 Twitter
          </button>
          <button className="art-share-btn" style={{borderColor:"#25d366",color:"#25d366"}}
            onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(post.title+' '+window.location.href)}`,'_blank')}>
            WhatsApp
          </button>
        </div>

        {/* Author card */}
        <div className="art-author">
          <div className="art-author-avatar">
            {(post.author||"A").charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="art-author-name">{post.author}</div>
            <div className="art-author-role">Author · HolySpirit Hub</div>
            <div className="art-author-bio">
              A minister at HolySpirit Hub passionate about raising Spirit-conscious believers
              through the Word, prayer, and practical teaching.
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <div className="art-related-title">More from {post.category}</div>
            <div className="art-related-grid">
              {related.map((p,i)=>(
                <div key={p.id} className="art-related-card" onClick={()=>navigate(`/blog/${p.slug}`)}>
                  <div className="art-related-thumb">{ICONS[i % ICONS.length]}</div>
                  <div className="art-related-body">
                    <div className="art-related-cat" style={{color:CAT_COLORS[p.category]||"var(--blue)"}}>{p.category}</div>
                    <div className="art-related-ttl">{p.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Blog Listing ─────────────────────────────────────────── */
export default function Blog() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const [posts,    setPosts]   = useState([]);
  const [loading,  setLoading] = useState(true);
  const [filter,   setFilter]  = useState("All");
  const cats = ["All","Devotional","Teaching","Prayer","Testimony","News"];

  useEffect(() => { document.title = "Blog — HolySpirit Hub"; }, []);

  useEffect(() => {
    if (slug) return;
    setLoading(true);
    fetchBlogPosts(filter !== "All" ? { category:filter, limit:12 } : { limit:12 })
      .then(r => setPosts(r.posts||[]))
      .catch(()  => setPosts([]))
      .finally(()=> setLoading(false));
  }, [slug, filter]);

  if (slug) return <ArticleView slug={slug} />;

  return (
    <>
      <style>{`
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:48px;}
        .blog-card{background:white;border-radius:20px;overflow:hidden;border:1px solid rgba(26,10,255,.08);transition:all .3s;cursor:pointer;}
        .blog-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(26,10,255,.1);}
        .blog-thumb{height:180px;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
        .blog-thumb-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.04));}
        .blog-body{padding:28px;}
        .blog-cat{display:inline-block;padding:4px 14px;border-radius:50px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:white;margin-bottom:12px;}
        .blog-title{font-size:19px;font-weight:700;line-height:1.35;margin-bottom:10px;color:var(--dark);}
        .blog-meta{font-size:12px;color:var(--grey);display:flex;gap:14px;margin-bottom:12px;flex-wrap:wrap;}
        .blog-excerpt{font-size:13px;color:#666;line-height:1.65;margin-bottom:16px;}
        .blog-read{font-size:13px;font-weight:600;color:var(--blue);display:flex;align-items:center;gap:4px;}
        .blog-read::after{content:'→';transition:transform .2s;}
        .blog-card:hover .blog-read::after{transform:translateX(4px);}
        .filter-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
        .filter-tab{padding:9px 20px;border-radius:50px;border:1px solid rgba(26,10,255,.2);font-size:14px;font-family:var(--ff);cursor:pointer;transition:all .2s;}
        .filter-tab.active{background:var(--blue);color:white;border-color:var(--blue);}
        @media(max-width:900px){.blog-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.blog-grid{grid-template-columns:1fr;}}
      `}</style>

      <div className="page-hero">
        <h1>Blog & <em style={{color:"var(--gold)"}}>Devotionals</em></h1>
        <p>Spirit-led articles and devotionals to deepen your walk with God.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {cats.map(c => (
              <button
                key={c}
                className={`filter-tab ${filter===c?"active":""}`}
                onClick={()=>setFilter(c)}
              >{c}</button>
            ))}
          </div>

          {loading ? (
            <div className="loading-screen"><span className="spinner spinner-dark"/></div>
          ) : posts.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📝</div><p>No posts yet. Check back soon!</p></div>
          ) : (
            <div className="blog-grid">
              {posts.map((p,i) => (
                <div key={p.id} className="blog-card" onClick={()=>navigate(`/blog/${p.slug}`)}>
                  <div className="blog-thumb">
                    {ICONS[i % ICONS.length]}
                    <div className="blog-thumb-overlay"/>
                  </div>
                  <div className="blog-body">
                    <div className="blog-cat" style={{background:CAT_COLORS[p.category]||"var(--blue)"}}>{p.category}</div>
                    <h3 className="blog-title">{p.title}</h3>
                    <div className="blog-meta">
                      <span>✍️ {p.author}</span>
                      {p.read_time && <span>⏱ {p.read_time}</span>}
                      {p.published_at && <span>📅 {new Date(p.published_at).toLocaleDateString("en-NG",{month:"short",day:"numeric",year:"numeric"})}</span>}
                    </div>
                    {p.excerpt && (
                      <p className="blog-excerpt">{p.excerpt.slice(0,120)}…</p>
                    )}
                    <div className="blog-read">Read article</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
