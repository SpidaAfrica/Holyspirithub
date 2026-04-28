import { useState, useEffect } from "react";
import { submitFeedback } from "../api/hshApi";

const TYPES = ["General","Service","Teaching","Website","Prayer","Suggestion"];

export default function Feedback() {
  const [form, setForm] = useState({
    name:"", email:"", type:"General", rating:0, message:""
  });
  const [hover,    setHover]   = useState(0);
  const [loading,  setLoading] = useState(false);
  const [success,  setSuccess] = useState(false);
  const [error,    setError]   = useState("");

  useEffect(()=>{ document.title = "Feedback — HolySpirit Hub"; },[]);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please fill in your name and message."); return;
    }
    setError("");
    setLoading(true);
    try {
      await submitFeedback(form);
      setSuccess(true);
      setForm({ name:"", email:"", type:"General", rating:0, message:"" });
    } catch(err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .fb-page{min-height:80vh;background:var(--grey-light);padding:80px 0;}
        .fb-card{background:white;border-radius:28px;padding:56px 48px;max-width:640px;margin:0 auto;box-shadow:0 8px 48px rgba(26,10,255,.07);border:1px solid rgba(26,10,255,.06);}
        .fb-header{text-align:center;margin-bottom:44px;}
        .fb-icon{font-size:52px;margin-bottom:16px;}
        .fb-header h1{font-size:clamp(26px,3.5vw,38px);font-weight:700;margin-bottom:10px;}
        .fb-header p{color:var(--grey);font-size:16px;line-height:1.6;max-width:420px;margin:0 auto;}

        .fb-group{margin-bottom:22px;}
        .fb-label{display:block;font-size:13px;font-weight:600;color:var(--dark);margin-bottom:7px;letter-spacing:.02em;}
        .fb-input{width:100%;padding:13px 16px;border:1.5px solid rgba(0,0,0,.1);border-radius:12px;font-size:15px;font-family:var(--ff);outline:none;transition:border-color .2s,box-shadow .2s;background:#fafafa;}
        .fb-input:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(26,10,255,.07);background:white;}
        textarea.fb-input{min-height:140px;resize:vertical;line-height:1.6;}

        .fb-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .fb-type-btn{padding:10px 8px;border-radius:10px;border:1.5px solid rgba(0,0,0,.1);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;text-align:center;font-family:var(--ff);background:#fafafa;}
        .fb-type-btn.selected{border-color:var(--blue);background:rgba(26,10,255,.06);color:var(--blue);font-weight:700;}
        .fb-type-btn:hover:not(.selected){border-color:rgba(26,10,255,.3);}

        .stars{display:flex;gap:8px;margin-top:4px;}
        .star{font-size:32px;cursor:pointer;transition:transform .15s;line-height:1;}
        .star:hover{transform:scale(1.2);}
        .star-label{font-size:13px;color:var(--grey);margin-top:8px;}

        .fb-submit{width:100%;padding:16px;background:var(--blue);color:white;border:none;border-radius:14px;font-size:16px;font-weight:600;cursor:pointer;font-family:var(--ff);transition:all .2s;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:8px;}
        .fb-submit:hover:not(:disabled){background:#0d0a99;transform:translateY(-1px);box-shadow:0 8px 24px rgba(26,10,255,.25);}
        .fb-submit:disabled{opacity:.6;cursor:not-allowed;}

        .fb-error{background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;color:#dc2626;font-size:14px;margin-bottom:16px;}
        .fb-success{text-align:center;padding:48px 24px;}
        .fb-success-icon{font-size:64px;margin-bottom:20px;}
        .fb-success h2{font-size:26px;font-weight:700;margin-bottom:10px;}
        .fb-success p{color:var(--grey);font-size:16px;line-height:1.6;margin-bottom:28px;}

        @media(max-width:600px){
          .fb-card{padding:36px 24px;}
          .fb-type-grid{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>

      {/* HERO */}
      <div className="page-hero">
        <h1>Share Your <em style={{color:"var(--gold)"}}>Feedback</em></h1>
        <p>Your voice matters to us. Let us know how we can serve you better.</p>
      </div>

      <div className="fb-page">
        <div className="container">
          <div className="fb-card">

            {success ? (
              <div className="fb-success">
                <div className="fb-success-icon">🙏</div>
                <h2>Thank You!</h2>
                <p>
                  Your feedback has been received. We genuinely value every word
                  and will review it prayerfully. God bless you!
                </p>
                <button
                  className="btn-primary"
                  style={{padding:"12px 32px",fontSize:15}}
                  onClick={()=>setSuccess(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="fb-header">
                  <div className="fb-icon">💬</div>
                  <h1>We'd Love to Hear From You</h1>
                  <p>
                    Whether it's encouragement, a suggestion, or a concern — every
                    piece of feedback helps us grow as a community.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {error && <div className="fb-error">⚠️ {error}</div>}

                  {/* Name + Email */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div className="fb-group">
                      <label className="fb-label">Your Name *</label>
                      <input
                        className="fb-input"
                        placeholder="Full name"
                        value={form.name}
                        onChange={e=>set("name",e.target.value)}
                        required
                      />
                    </div>
                    <div className="fb-group">
                      <label className="fb-label">Email <span style={{fontWeight:400,color:"var(--grey)"}}>(optional)</span></label>
                      <input
                        className="fb-input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e=>set("email",e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="fb-group">
                    <label className="fb-label">Feedback Category</label>
                    <div className="fb-type-grid">
                      {TYPES.map(t => (
                        <button
                          key={t}
                          type="button"
                          className={`fb-type-btn ${form.type===t?"selected":""}`}
                          onClick={()=>set("type",t)}
                        >{t}</button>
                      ))}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="fb-group">
                    <label className="fb-label">Overall Rating <span style={{fontWeight:400,color:"var(--grey)"}}>(optional)</span></label>
                    <div className="stars">
                      {[1,2,3,4,5].map(n => (
                        <span
                          key={n}
                          className="star"
                          onMouseEnter={()=>setHover(n)}
                          onMouseLeave={()=>setHover(0)}
                          onClick={()=>set("rating",n)}
                        >
                          {n <= (hover || form.rating) ? "⭐" : "☆"}
                        </span>
                      ))}
                    </div>
                    {(hover || form.rating) > 0 && (
                      <div className="star-label">
                        {["","Poor","Fair","Good","Great","Excellent!"][(hover||form.rating)]}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="fb-group">
                    <label className="fb-label">Your Message *</label>
                    <textarea
                      className="fb-input"
                      placeholder="Share your thoughts, experiences, or suggestions with us…"
                      value={form.message}
                      onChange={e=>set("message",e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="fb-submit" disabled={loading}>
                    {loading ? <><span className="spinner"/> Sending…</> : <>Send Feedback 🕊️</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
