import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as api from "../api/hshApi";

/*
  URL: /prayer-live
  URL: /prayer-live?room=ABC123  ← listeners join directly via link
*/

const EMOJIS = ["🙏","🔥","❤️","✨","🕊️","💧","🙌","⚡"];
const randomId = () => Math.random().toString(36).slice(2,8).toUpperCase();
const nowTime  = () => new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
const initials = (n) => (n||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

const DEMO_LISTENERS = [
  {id:1,name:"Adaeze Obi",reaction:null},{id:2,name:"Emmanuel K.",reaction:"🙏"},
  {id:3,name:"Grace M.",reaction:null},{id:4,name:"David E.",reaction:"🔥"},
  {id:5,name:"Ruth O.",reaction:"❤️"},{id:6,name:"James N.",reaction:null},
];
const DEMO_MSGS = [
  {id:1,sender:"Emmanuel K.",text:"Lord we lift every sick person here 🙏",time:"10:02",isHost:false},
  {id:2,sender:"Grace M.",text:"Amen! Healing is the children's bread",time:"10:03",isHost:false},
];

function useToast() {
  const [t,setT] = useState(null);
  const show = useCallback((msg,type="ok")=>{setT({msg,type});setTimeout(()=>setT(null),3500);},[]);
  const el = t ? <div className={`pl-toast pl-toast-${t.type}`}>{t.msg}</div> : null;
  return [show, el];
}

export default function PrayerLive() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomCode = searchParams.get("room");

  const [view,     setView]     = useState(roomCode ? "join" : "lobby");
  const [role,     setRole]     = useState(null);
  const [session,  setSession]  = useState(null);
  const [userName, setUserName] = useState("");
  const [joinCode, setJoinCode] = useState(roomCode || "");
  const [loading,  setLoading]  = useState(false);
  const [sessions, setSessions] = useState([]);
  const [showToast, toastEl]    = useToast();

  useEffect(() => {
    window.scrollTo(0,0);
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const r = await api.fetchLiveSessions();
      setSessions(r.sessions||[]);
    } catch {
      setSessions([
        {id:"ABC123",title:"Morning Prayer Watch",host:"Pastor David",status:"live",listeners:24},
        {id:"DEF456",title:"Healing & Deliverance",host:"Elder James",status:"live",listeners:12},
        {id:"GHI789",title:"Night Watch Intercession",host:"Minister Ruth",status:"ended",listeners:87},
      ]);
    }
  };

  const startSession = async (title, topic) => {
    setLoading(true);
    const code = randomId();
    try {
      await api.createSession({ code, title, topic, host: userName });
    } catch {}
    setSession({ code, title, topic, host: userName, status:"live" });
    setRole("host");
    setView("room");
    // Update URL to reflect the room
    navigate(`/prayer-live?room=${code}`, { replace: true });
    setLoading(false);
  };

  const joinSession = async (code) => {
    if (!code || !userName) { showToast("Please enter your name and the room code","err"); return; }
    setLoading(true);
    try {
      const r = await api.joinSession({ code: code.toUpperCase(), name: userName });
      setSession({ ...r.session, myName: userName });
      setRole("listener");
      setView("room");
      navigate(`/prayer-live?room=${code.toUpperCase()}`, { replace: true });
    } catch {
      setSession({ code:code.toUpperCase(), title:"Live Prayer Session", topic:"Healing and restoration",
        host:"Prayer Leader", status:"live", myName: userName });
      setRole("listener");
      setView("room");
    }
    setLoading(false);
  };

  const leaveRoom = () => {
    setView("lobby");
    setSession(null);
    setRole(null);
    navigate("/prayer-live", { replace: true });
    fetchSessions();
  };

  return (
    <>
      <style>{`
        .pl-page { font-family:var(--ff); }
        /* LOBBY */
        .pl-lobby { min-height:100vh;background:linear-gradient(160deg,#050215,#0a0635 40%,#120b6e 70%,#0a0635);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 20px 60px;text-align:center;position:relative;overflow:hidden; }
        .pl-lobby::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 30%,rgba(26,10,255,.2),transparent 70%);pointer-events:none;}
        .pl-lobby-icon{font-size:60px;margin-bottom:20px;animation:float 4s ease-in-out infinite;}
        .pl-lobby h1{font-family:var(--ffh);font-size:clamp(36px,6vw,68px);color:white;margin-bottom:12px;}
        .pl-lobby h1 em{font-style:italic;color:var(--gold);}
        .pl-lobby-sub{color:rgba(255,255,255,.6);font-size:16px;max-width:460px;line-height:1.7;margin-bottom:48px;}
        .pl-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;width:100%;max-width:520px;margin-bottom:48px;}
        .pl-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:32px 24px;cursor:pointer;transition:all .3s;}
        .pl-card:hover{background:rgba(26,10,255,.15);border-color:var(--blue);transform:translateY(-4px);box-shadow:0 16px 48px rgba(26,10,255,.2);}
        .pl-card.gold-card:hover{background:rgba(201,168,76,.08);border-color:var(--gold);}
        .pl-card-icon{font-size:36px;margin-bottom:14px;}
        .pl-card h3{font-size:18px;font-weight:600;color:white;margin-bottom:6px;}
        .pl-card p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.5;}
        .pl-sessions{width:100%;max-width:520px;}
        .pl-sessions-label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:10px;text-align:left;}
        .pl-session-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 18px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:all .2s;}
        .pl-session-item:hover{border-color:var(--blue);background:rgba(26,10,255,.1);}
        .pl-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
        .pl-dot.live{background:#ef4444;animation:blink 1.2s ease infinite;}
        .pl-dot.ended{background:rgba(255,255,255,.25);}
        .pl-si-info{flex:1;}
        .pl-si-title{font-size:14px;font-weight:500;color:white;}
        .pl-si-meta{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px;}
        .pl-si-count{font-size:13px;color:rgba(255,255,255,.4);}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

        /* SETUP / JOIN FORM */
        .pl-form-view{min-height:100vh;background:linear-gradient(160deg,#050215,#0a0635 50%,#0f0640);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 20px 60px;}
        .pl-form-card{width:100%;max-width:460px;}
        .pl-form-card h1{font-family:var(--ffh);font-size:clamp(28px,5vw,46px);color:white;margin-bottom:8px;}
        .pl-form-card p{color:rgba(255,255,255,.5);font-size:15px;margin-bottom:36px;}
        .pl-finput{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px 18px;color:white;font-size:15px;font-family:var(--ff);outline:none;transition:border-color .2s;margin-bottom:12px;}
        .pl-finput:focus{border-color:var(--blue);}
        .pl-finput::placeholder{color:rgba(255,255,255,.3);}
        textarea.pl-finput{min-height:90px;resize:vertical;}
        .pl-back{background:none;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:9px 18px;border-radius:50px;font-size:13px;cursor:pointer;margin-bottom:28px;transition:all .2s;font-family:var(--ff);}
        .pl-back:hover{border-color:rgba(255,255,255,.4);color:white;}

        /* ROOM */
        .pl-room{display:grid;grid-template-columns:1fr 340px;height:100vh;overflow:hidden;}
        .pl-room-main{display:flex;flex-direction:column;background:linear-gradient(160deg,#050215,#0a0635 50%,#0f0640);}
        .pl-room-header{padding:14px 24px;background:rgba(5,2,21,.8);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:14px;flex-shrink:0;}
        .pl-back-btn{color:rgba(255,255,255,.5);cursor:pointer;font-size:20px;transition:color .2s;background:none;border:none;}
        .pl-back-btn:hover{color:white;}
        .pl-room-title-wrap{flex:1;}
        .pl-room-title{font-family:var(--ffh);font-size:19px;font-weight:600;color:white;}
        .pl-room-host{font-size:12px;color:rgba(255,255,255,.4);margin-top:1px;}
        .pl-live-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);border-radius:50px;padding:5px 12px;font-size:11px;font-weight:700;color:#ef4444;letter-spacing:.04em;}
        .pl-live-badge::before{content:'';width:7px;height:7px;background:#ef4444;border-radius:50%;animation:blink 1.2s infinite;}
        .pl-ended-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:50px;padding:5px 12px;font-size:11px;color:rgba(255,255,255,.4);}
        .pl-listener-count{font-size:13px;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:6px;}
        .pl-listener-count::before{content:'';width:7px;height:7px;background:#10b981;border-radius:50%;}

        /* Stage */
        .pl-stage{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;position:relative;}
        .pl-visualizer{position:relative;width:180px;height:180px;display:flex;align-items:center;justify-content:center;margin-bottom:28px;}
        .pl-viz-ring{position:absolute;border-radius:50%;border:1px solid;}
        .pl-viz-ring-1{width:180px;height:180px;border-color:rgba(26,10,255,.25);animation:plViz 2.2s ease-in-out infinite;}
        .pl-viz-ring-2{width:140px;height:140px;border-color:rgba(26,10,255,.18);animation:plViz 2.2s ease-in-out infinite .3s;}
        .pl-viz-ring-3{width:100px;height:100px;border-color:rgba(26,10,255,.12);animation:plViz 2.2s ease-in-out infinite .6s;}
        .pl-visualizer.speaking .pl-viz-ring-1{animation:plVizActive .8s ease-in-out infinite;}
        .pl-visualizer.speaking .pl-viz-ring-2{animation:plVizActive .8s ease-in-out infinite .15s;}
        .pl-visualizer.speaking .pl-viz-ring-3{animation:plVizActive .8s ease-in-out infinite .3s;}
        @keyframes plViz{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.06);opacity:.5}}
        @keyframes plVizActive{0%{transform:scale(1);opacity:.4}50%{transform:scale(1.14);opacity:.85}100%{transform:scale(1);opacity:.4}}
        .pl-host-av{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--blue),#4a30ff);display:flex;align-items:center;justify-content:center;font-family:var(--ffh);font-size:28px;font-weight:700;color:white;z-index:1;position:relative;box-shadow:0 0 40px rgba(26,10,255,.4);}
        .pl-host-name{font-family:var(--ffh);font-size:22px;font-weight:600;color:white;margin-bottom:4px;}
        .pl-host-status{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:24px;}
        .pl-audio-bars{display:flex;align-items:flex-end;gap:3px;height:36px;margin-bottom:28px;}
        .pl-bar{width:4px;background:var(--blue);border-radius:2px;transition:height .1s;}
        .pl-bars-silent .pl-bar{height:3px !important;}
        .pl-topic-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 18px;font-size:13px;color:rgba(255,255,255,.5);max-width:360px;text-align:center;line-height:1.5;}
        .pl-topic-box em{color:var(--gold);font-style:normal;}

        /* Listener reactions bar */
        .pl-reaction-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:20px;}
        .pl-react-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:50px;padding:8px 14px;font-size:18px;cursor:pointer;transition:all .2s;}
        .pl-react-btn:hover{border-color:var(--blue);background:rgba(26,10,255,.15);transform:scale(1.12);}
        .pl-react-btn.reacted{border-color:var(--gold);background:rgba(201,168,76,.1);}

        /* Host controls */
        .pl-host-ctrl{padding:20px 24px;background:rgba(5,2,21,.8);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;}
        .pl-hc-top{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:14px;}
        .pl-hc-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
        .pl-mic-btn{width:68px;height:68px;border-radius:50%;background:var(--blue);border:none;font-size:26px;cursor:pointer;transition:all .3s;box-shadow:0 0 32px rgba(26,10,255,.4);display:flex;align-items:center;justify-content:center;}
        .pl-mic-btn:hover{transform:scale(1.08);}
        .pl-mic-btn.muted{background:rgba(239,68,68,.2);border:1px solid rgba(239,68,68,.3);box-shadow:none;}
        .pl-ctrl{display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 14px;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.5);font-size:11px;}
        .pl-ctrl:hover{border-color:var(--blue);color:white;background:rgba(26,10,255,.1);}
        .pl-ctrl span:first-child{font-size:20px;}
        .pl-end-btn{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#ef4444;border-radius:50px;padding:9px 22px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;font-family:var(--ff);}
        .pl-end-btn:hover{background:rgba(239,68,68,.2);}
        .pl-code-box{font-size:12px;color:rgba(255,255,255,.4);}
        .pl-code-box em{color:var(--gold);font-style:normal;letter-spacing:.1em;font-size:14px;font-weight:600;}

        /* Share */
        .pl-share-box{background:rgba(5,2,21,.95);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px;margin-top:16px;width:100%;max-width:400px;}
        .pl-share-box h4{font-size:14px;font-weight:600;color:white;margin-bottom:12px;}
        .pl-share-link{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px 14px;font-size:12px;color:rgba(255,255,255,.5);display:flex;align-items:center;justify-content:space-between;gap:8px;word-break:break-all;}
        .pl-copy-btn{background:var(--blue);border:none;border-radius:7px;padding:6px 12px;color:white;font-size:11px;cursor:pointer;white-space:nowrap;font-family:var(--ff);flex-shrink:0;}

        /* Sidebar */
        .pl-room-sidebar{border-left:1px solid rgba(255,255,255,.07);background:rgba(5,2,21,.7);backdrop-filter:blur(12px);display:flex;flex-direction:column;overflow:hidden;}
        .pl-sidebar-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.07);}
        .pl-sidebar-tab{flex:1;padding:13px;text-align:center;font-size:13px;color:rgba(255,255,255,.4);cursor:pointer;transition:all .2s;border-bottom:2px solid transparent;}
        .pl-sidebar-tab:hover{color:white;}
        .pl-sidebar-tab.active{color:var(--gold);border-bottom-color:var(--gold);}
        .pl-listeners-list{flex:1;overflow-y:auto;padding:12px;}
        .pl-reaction-totals{display:flex;flex-wrap:wrap;gap:6px;padding:6px 0 14px;}
        .pl-rt{background:rgba(255,255,255,.05);border-radius:50px;padding:4px 10px;font-size:12px;color:rgba(255,255,255,.5);display:flex;gap:4px;}
        .pl-li{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;transition:background .2s;}
        .pl-li:hover{background:rgba(255,255,255,.04);}
        .pl-li-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--blue),#7c3aed);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:white;flex-shrink:0;}
        .pl-li-name{font-size:13px;color:rgba(255,255,255,.75);flex:1;}
        .pl-li-react{font-size:17px;animation:popIn .3s ease;}
        @keyframes popIn{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
        .pl-reactions-bar{padding:12px;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:6px;flex-wrap:wrap;}
        .pl-rb{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:50px;padding:7px 12px;font-size:16px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:4px;}
        .pl-rb span{font-size:11px;color:rgba(255,255,255,.4);}
        .pl-rb:hover{border-color:var(--blue);background:rgba(26,10,255,.1);transform:scale(1.08);}
        .pl-rb.reacted{border-color:var(--gold);background:rgba(201,168,76,.1);}
        /* Chat */
        .pl-chat-list{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;}
        .pl-chat-msg{background:rgba(255,255,255,.05);border-radius:11px;padding:9px 13px;animation:popIn .2s ease;}
        .pl-chat-msg.host-msg{background:rgba(26,10,255,.15);border:1px solid rgba(26,10,255,.2);}
        .pl-chat-sender{font-size:11px;font-weight:600;color:var(--gold);margin-bottom:3px;}
        .pl-chat-sender.host-s{color:#6ab0ff;}
        .pl-chat-text{font-size:13px;color:rgba(255,255,255,.8);line-height:1.5;}
        .pl-chat-time{font-size:10px;color:rgba(255,255,255,.25);margin-top:4px;}
        .pl-chat-input-area{padding:10px;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:7px;}
        .pl-chat-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 13px;color:white;font-size:13px;font-family:var(--ff);outline:none;}
        .pl-chat-input:focus{border-color:var(--blue);}
        .pl-chat-input::placeholder{color:rgba(255,255,255,.25);}
        .pl-send-btn{background:var(--blue);border:none;border-radius:10px;padding:10px 14px;color:white;cursor:pointer;transition:background .2s;font-size:15px;}
        .pl-send-btn:hover{background:var(--blue-dark);}
        /* Floaters */
        .pl-floaters{position:fixed;bottom:80px;right:350px;pointer-events:none;z-index:100;}
        .pl-floater{position:absolute;font-size:26px;animation:plFloat 2.5s ease forwards;}
        @keyframes plFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-110px) scale(1.4)}}
        /* Toast */
        .pl-toast{position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 22px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.25);white-space:nowrap;}
        .pl-toast-ok{background:#0f0640;color:white;border-left:3px solid var(--gold);}
        .pl-toast-err{background:#fff1f2;color:#be123c;border-left:3px solid #be123c;}
        /* Responsive */
        @media(max-width:900px){.pl-room{grid-template-columns:1fr;}.pl-room-sidebar{display:none;}.pl-cards{grid-template-columns:1fr;}}
      `}</style>

      <div className="pl-page">
        {toastEl}

        {view === "lobby"      && <Lobby sessions={sessions} onHost={()=>setView("host-setup")} onJoin={()=>setView("join")} onJoinDirect={(code)=>{setJoinCode(code);setView("join");}} userName={userName} setUserName={setUserName} />}
        {view === "host-setup" && <HostSetup onStart={startSession} onBack={()=>setView("lobby")} loading={loading} userName={userName} setUserName={setUserName} />}
        {view === "join"       && <JoinForm  onJoin={joinSession}   onBack={()=>setView("lobby")} loading={loading} userName={userName} setUserName={setUserName} prefillCode={joinCode} />}
        {view === "room"       && <Room session={session} role={role} onLeave={leaveRoom} showToast={showToast} />}
      </div>
    </>
  );
}

// ── LOBBY ─────────────────────────────────────────────────────
function Lobby({ sessions, onHost, onJoin, onJoinDirect, userName, setUserName }) {
  const live  = sessions.filter(s=>s.status==="live");
  const ended = sessions.filter(s=>s.status==="ended");
  return (
    <div className="pl-lobby">
      <div className="pl-lobby-icon">🕊️</div>
      <h1>Prayer <em>Platform</em></h1>
      <p className="pl-lobby-sub">Join a live prayer session or lead one yourself. The Holy Spirit moves when we agree together in His name.</p>

      {live.length > 0 && (
        <div className="pl-sessions" style={{marginBottom:32}}>
          <div className="pl-sessions-label">🔴 Live Now</div>
          {live.map(s=>(
            <div key={s.id} className="pl-session-item" onClick={()=>onJoinDirect(s.id)}>
              <div className="pl-dot live"/>
              <div className="pl-si-info">
                <div className="pl-si-title">{s.title}</div>
                <div className="pl-si-meta">Led by {s.host}</div>
              </div>
              <div className="pl-si-count">👥 {s.listeners}</div>
            </div>
          ))}
        </div>
      )}

      <div className="pl-cards">
        <div className="pl-card gold-card" onClick={onHost}>
          <div className="pl-card-icon">🎙️</div>
          <h3>Lead Prayer</h3>
          <p>Start a live session. Share your mic and lead others in prayer.</p>
        </div>
        <div className="pl-card" onClick={onJoin}>
          <div className="pl-card-icon">🙏</div>
          <h3>Join a Session</h3>
          <p>Enter a room code to join a live prayer session.</p>
        </div>
      </div>

      {ended.length > 0 && (
        <div className="pl-sessions">
          <div className="pl-sessions-label">Recent Sessions</div>
          {ended.slice(0,3).map(s=>(
            <div key={s.id} className="pl-session-item" style={{cursor:"default"}}>
              <div className="pl-dot ended"/>
              <div className="pl-si-info">
                <div className="pl-si-title">{s.title}</div>
                <div className="pl-si-meta">Led by {s.host} · {s.listeners} joined</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── HOST SETUP ────────────────────────────────────────────────
function HostSetup({ onStart, onBack, loading, userName, setUserName }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  return (
    <div className="pl-form-view">
      <div className="pl-form-card">
        <button className="pl-back" onClick={onBack}>← Back</button>
        <div style={{fontSize:48,marginBottom:16}}>🎙️</div>
        <h1>Lead a Prayer Session</h1>
        <p>Your microphone will be shared live with everyone who joins your room.</p>
        <input className="pl-finput" placeholder="Your name (e.g. Pastor David)" value={userName} onChange={e=>setUserName(e.target.value)}/>
        <input className="pl-finput" placeholder="Session title (e.g. Morning Prayer Watch)" value={title} onChange={e=>setTitle(e.target.value)}/>
        <textarea className="pl-finput" placeholder="Prayer focus / topic (optional)" value={topic} onChange={e=>setTopic(e.target.value)}/>
        <button className="btn-gold" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>onStart(title||"Live Prayer Session",topic)} disabled={!userName||loading}>
          {loading?<span className="spinner"/>:"🎙️ Start Session"}
        </button>
      </div>
    </div>
  );
}

// ── JOIN FORM ─────────────────────────────────────────────────
function JoinForm({ onJoin, onBack, loading, userName, setUserName, prefillCode }) {
  const [code, setCode] = useState(prefillCode||"");
  return (
    <div className="pl-form-view">
      <div className="pl-form-card">
        <button className="pl-back" onClick={onBack}>← Back</button>
        <div style={{fontSize:48,marginBottom:16}}>🙏</div>
        <h1>Join a Prayer Session</h1>
        <p>Enter the room code shared by the prayer leader.</p>
        <input className="pl-finput" placeholder="Your name" value={userName} onChange={e=>setUserName(e.target.value)}/>
        <input className="pl-finput" placeholder="Room code (e.g. ABC123)" value={code}
          onChange={e=>setCode(e.target.value.toUpperCase())}
          style={{letterSpacing:"0.15em",fontSize:20,textAlign:"center"}}
          maxLength={6}
          onKeyDown={e=>e.key==="Enter"&&onJoin(code)}
        />
        <button className="btn-primary" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>onJoin(code)} disabled={!userName||!code||loading}>
          {loading?<span className="spinner"/>:"Join Session →"}
        </button>
      </div>
    </div>
  );
}

// ── ROOM ──────────────────────────────────────────────────────
function Room({ session, role, onLeave, showToast }) {
  const [isMuted,   setIsMuted]   = useState(false);
  const [isLive,    setIsLive]    = useState(true);
  const [activeTab, setActiveTab] = useState("reactions");
  const [listeners, setListeners] = useState(DEMO_LISTENERS);
  const [messages,  setMessages]  = useState(DEMO_MSGS);
  const [chatInput, setChatInput] = useState("");
  const [reactions, setReactions] = useState({"🙏":34,"🔥":18,"❤️":27,"✨":12,"🕊️":9,"🙌":21,"💧":6,"⚡":8});
  const [myReact,   setMyReact]   = useState(null);
  const [floaters,  setFloaters]  = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [speaking,  setSpeaking]  = useState(true);
  const chatRef  = useRef(null);
  const streamRef = useRef(null);
  const analyser  = useRef(null);
  const audioCtx  = useRef(null);

  // Mic setup for host
  useEffect(() => {
    if (role !== "host") return;
    navigator.mediaDevices?.getUserMedia({ audio: true, video: false })
      .then(stream => {
        streamRef.current = stream;
        audioCtx.current  = new AudioContext();
        const src = audioCtx.current.createMediaStreamSource(stream);
        analyser.current  = audioCtx.current.createAnalyser();
        analyser.current.fftSize = 256;
        src.connect(analyser.current);
        const tick = () => {
          if (!analyser.current) return;
          const d = new Uint8Array(analyser.current.frequencyBinCount);
          analyser.current.getByteFrequencyData(d);
          const avg = d.reduce((a,b)=>a+b,0)/d.length;
          setSpeaking(avg > 8);
          requestAnimationFrame(tick);
        };
        tick();
      })
      .catch(()=>showToast("Mic access denied — demo mode active"));
    return () => { streamRef.current?.getTracks().forEach(t=>t.stop()); audioCtx.current?.close(); };
  }, [role,showToast]);

  // Simulate new listeners
  useEffect(() => {
    if (!isLive) return;
    const t = setInterval(() => {
      if (Math.random()>.6) {
        const names=["Blessed A.","Faith O.","Promise C.","Victor E.","Peace N."];
        setListeners(p=>[...p,{id:Date.now(),name:names[Math.floor(Math.random()*names.length)],reaction:null}]);
      }
    }, 9000);
    return ()=>clearInterval(t);
  }, [isLive]);

  // Poll for new messages/reactions (listener)
  useEffect(() => {
    if (role !== "listener" || !isLive) return;
    const t = setInterval(async () => {
      try {
        const r = await api.pollSession(session.code);
        if (r.status === "ended") { setIsLive(false); showToast("The prayer session has ended 🙏"); }
        if (r.messages?.length) setMessages(prev=>[...prev,...r.messages.filter(m=>!prev.find(p=>p.sent_at===m.sent_at&&p.sender===m.sender))]);
        if (r.reactions)        setReactions(r.reactions);
        if (r.listener_count)   setListeners(prev=>{ if(prev.length<r.listener_count) return [...prev,{id:Date.now(),name:"New listener",reaction:null}]; return prev; });
      } catch {}
    }, 3500);
    return ()=>clearInterval(t);
  }, [role, session?.code, isLive,showToast]);

  useEffect(() => { chatRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  const toggleMic = () => {
    streamRef.current?.getTracks().forEach(t=>{t.enabled=isMuted;});
    setIsMuted(m=>!m); setSpeaking(false);
  };

  const endSession = async () => {
    if (!window.confirm("End this prayer session for everyone?")) return;
    setIsLive(false);
    streamRef.current?.getTracks().forEach(t=>t.stop());
    try { await api.endSession(session.code); } catch {}
    showToast("Session ended. Thank you for leading prayer 🙏");
    setTimeout(onLeave, 1500);
  };

  const react = async (emoji) => {
    setReactions(r=>({...r,[emoji]:(r[emoji]||0)+1}));
    setMyReact(emoji);
    const id = Date.now();
    setFloaters(f=>[...f,{id,emoji,x:Math.random()*60}]);
    setTimeout(()=>setFloaters(f=>f.filter(fl=>fl.id!==id)),2600);
    try { await api.sendReaction({code:session.code,emoji,name:session.myName||session.host}); } catch {}
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = {id:Date.now(),sender:session.myName||session.host,text:chatInput.trim(),time:nowTime(),isHost:role==="host"};
    setMessages(m=>[...m,msg]);
    setChatInput("");
    try { await api.sendMessage({code:session.code,sender:msg.sender,text:msg.text,isHost:msg.isHost}); } catch {}
  };

  const shareLink = `${window.location.origin}/prayer-live?room=${session.code}`;
  const copyLink  = () => { navigator.clipboard.writeText(shareLink).then(()=>showToast("Link copied! 🔗")); };

  const barHeights = [10,18,26,16,30,20,12,24,14,28];

  return (
    <div className="pl-room">
      {/* Floating reactions */}
      <div className="pl-floaters">
        {floaters.map(f=>(
          <div key={f.id} className="pl-floater" style={{left:f.x+"%"}}>{f.emoji}</div>
        ))}
      </div>

      {/* MAIN */}
      <div className="pl-room-main">
        <div className="pl-room-header">
          <button className="pl-back-btn" onClick={onLeave} title="Leave session">←</button>
          <div className="pl-room-title-wrap">
            <div className="pl-room-title">{session.title}</div>
            <div className="pl-room-host">Led by {session.host}</div>
          </div>
          {isLive ? <div className="pl-live-badge">LIVE</div> : <div className="pl-ended-badge">Ended</div>}
          <div className="pl-listener-count">{listeners.length} listening</div>
        </div>

        <div className="pl-stage">
          <div className={`pl-visualizer ${speaking&&!isMuted?"speaking":""}`}>
            <div className="pl-viz-ring pl-viz-ring-1"/>
            <div className="pl-viz-ring pl-viz-ring-2"/>
            <div className="pl-viz-ring pl-viz-ring-3"/>
            <div className="pl-host-av">{initials(session.host)}</div>
          </div>

          <div className="pl-host-name">{session.host}</div>
          <div className="pl-host-status">
            {role==="host"
              ? (isMuted?"🔇 Muted":speaking?"🎙️ Speaking…":"🎙️ Mic on")
              : isLive?"🔊 Listening live":"Session ended"}
          </div>

          <div className={`pl-audio-bars ${!speaking||isMuted?"pl-bars-silent":""}`}>
            {barHeights.map((h,i)=>(
              <div key={i} className="pl-bar" style={{height: speaking&&!isMuted ? Math.max(3,h+Math.random()*14)+"px" : "3px"}}/>
            ))}
          </div>

          {session.topic && (
            <div className="pl-topic-box">🙏 Prayer Focus: <em>{session.topic}</em></div>
          )}

          {role==="listener" && isLive && (
            <div className="pl-reaction-row">
              {EMOJIS.map(e=>(
                <button key={e} className={`pl-react-btn ${myReact===e?"reacted":""}`} onClick={()=>react(e)}>{e}</button>
              ))}
            </div>
          )}

          {role==="host" && showShare && (
            <div className="pl-share-box">
              <h4>Share this session</h4>
              <div className="pl-share-link">
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{shareLink}</span>
                <button className="pl-copy-btn" onClick={copyLink}>Copy</button>
              </div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:8}}>
                Room code: <em style={{color:"var(--gold)",letterSpacing:".1em",fontWeight:600}}>{session.code}</em>
              </p>
            </div>
          )}
        </div>

        {role==="host" && (
          <div className="pl-host-ctrl">
            <div className="pl-hc-top">
              <div className="pl-ctrl" onClick={()=>setShowShare(s=>!s)}>
                <span>🔗</span><span>Share</span>
              </div>
              <button className={`pl-mic-btn ${isMuted?"muted":""}`} onClick={toggleMic}>
                {isMuted?"🔇":"🎙️"}
              </button>
              <div className="pl-ctrl" onClick={()=>setActiveTab("chat")}>
                <span>💬</span><span>Chat</span>
              </div>
            </div>
            <div className="pl-hc-bottom">
              <div className="pl-code-box">Room code: <em>{session.code}</em></div>
              <button className="pl-end-btn" onClick={endSession}>End Session</button>
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <div className="pl-room-sidebar">
        <div className="pl-sidebar-tabs">
          <div className={`pl-sidebar-tab ${activeTab==="reactions"?"active":""}`} onClick={()=>setActiveTab("reactions")}>
            Listeners ({listeners.length})
          </div>
          <div className={`pl-sidebar-tab ${activeTab==="chat"?"active":""}`} onClick={()=>setActiveTab("chat")}>
            Prayers 💬
          </div>
        </div>

        {activeTab==="reactions" && (
          <>
            <div className="pl-listeners-list">
              <div className="pl-reaction-totals">
                {Object.entries(reactions).map(([e,c])=>(
                  <div key={e} className="pl-rt">{e}<span style={{color:"white",fontWeight:500}}>{c}</span></div>
                ))}
              </div>
              {listeners.map(l=>(
                <div key={l.id} className="pl-li">
                  <div className="pl-li-av">{initials(l.name)}</div>
                  <div className="pl-li-name">{l.name}</div>
                  {l.reaction && <div className="pl-li-react">{l.reaction}</div>}
                </div>
              ))}
            </div>
            <div className="pl-reactions-bar">
              {EMOJIS.map(e=>(
                <button key={e} className={`pl-rb ${myReact===e?"reacted":""}`} onClick={()=>react(e)}>
                  {e}<span>{reactions[e]||0}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab==="chat" && (
          <>
            <div className="pl-chat-list">
              {messages.map(m=>(
                <div key={m.id} className={`pl-chat-msg ${m.isHost?"host-msg":""}`}>
                  <div className={`pl-chat-sender ${m.isHost?"host-s":""}`}>
                    {m.isHost?"🎙️ ":""}{m.sender}
                  </div>
                  <div className="pl-chat-text">{m.text}</div>
                  <div className="pl-chat-time">{m.time}</div>
                </div>
              ))}
              <div ref={chatRef}/>
            </div>
            <div className="pl-chat-input-area">
              <input className="pl-chat-input" placeholder="Type your prayer…"
                value={chatInput} onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&sendChatMessage()}/>
              <button className="pl-send-btn" onClick={sendChatMessage}>→</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
