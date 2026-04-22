const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue:#1a0aff; --blue-dark:#0f06b3; --blue-light:#3d30ff;
      --blue-glow:rgba(26,10,255,.18); --gold:#c9a84c; --gold-light:#e8c96a;
      --white:#fff; --off-white:#f8f7f4; --grey-light:#f0eff8;
      --grey:#8a8a9a; --dark:#0a0820; --text:#1a1a2e;
      --ff:'DM Sans',sans-serif; --ffh:'Cormorant Garamond',serif;
    }

    html { scroll-behavior: smooth; }
    body { font-family:var(--ff); color:var(--text); background:var(--white); overflow-x:hidden; line-height:1.6; }
    h1,h2,h3,h4 { font-family:var(--ffh); line-height:1.2; }
    a { text-decoration:none; color:inherit; }
    img { max-width:100%; display:block; }
    button { cursor:pointer; border:none; background:none; font-family:var(--ff); }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:var(--dark); }
    ::-webkit-scrollbar-thumb { background:var(--blue); border-radius:3px; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes slideDown{ from{opacity:0;transform:translateX(-50%) translateY(-10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    @keyframes popUp    { 0%{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

    .section    { padding:90px 0; }
    .section-sm { padding:60px 0; }
    .container  { max-width:1200px; margin:0 auto; padding:0 24px; }

    .btn-primary { display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:white;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:500;letter-spacing:.02em;transition:all .3s;box-shadow:0 4px 20px var(--blue-glow); }
    .btn-primary:hover { background:var(--blue-dark);transform:translateY(-2px);box-shadow:0 8px 30px rgba(26,10,255,.35); }
    .btn-primary:disabled { opacity:.6;cursor:not-allowed;transform:none; }
    .btn-gold { display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--dark);padding:14px 32px;border-radius:50px;font-size:15px;font-weight:600;transition:all .3s; }
    .btn-gold:hover { background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 30px rgba(201,168,76,.4); }
    .btn-gold:disabled { opacity:.6;cursor:not-allowed;transform:none; }
    .btn-outline { display:inline-flex;align-items:center;gap:8px;border:2px solid var(--blue);color:var(--blue);padding:12px 30px;border-radius:50px;font-size:15px;font-weight:500;transition:all .3s; }
    .btn-outline:hover { background:var(--blue);color:white;transform:translateY(-2px); }
    .btn-ghost { display:inline-flex;align-items:center;gap:8px;border:2px solid rgba(255,255,255,.5);color:white;padding:12px 30px;border-radius:50px;font-size:15px;font-weight:500;transition:all .3s; }
    .btn-ghost:hover { border-color:white;background:rgba(255,255,255,.1); }

    .label { display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px; }
    .label::before { content:'';width:24px;height:2px;background:var(--gold); }
    .section-title { font-size:clamp(32px,5vw,52px);font-weight:600;color:var(--dark);margin-bottom:16px; }
    .section-title em { color:var(--blue);font-style:italic; }
    .section-sub { font-size:17px;color:var(--grey);max-width:560px;line-height:1.7; }
    .divider { width:60px;height:3px;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:2px;margin:20px 0; }

    .page-hero { background:linear-gradient(135deg,var(--dark) 0%,#0f0640 50%,#1a0aff22 100%);padding:140px 0 80px;text-align:center;position:relative;overflow:hidden; }
    .page-hero::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(26,10,255,.3) 0%,transparent 70%); }
    .page-hero h1 { font-size:clamp(40px,6vw,72px);color:white;position:relative;z-index:1; }
    .page-hero p  { color:rgba(255,255,255,.7);font-size:18px;max-width:560px;margin:16px auto 0;position:relative;z-index:1; }

    .form-group  { margin-bottom:20px; }
    .form-label  { display:block;font-size:14px;font-weight:500;margin-bottom:8px; }
    .form-input  { width:100%;padding:13px 16px;border:1px solid rgba(26,10,255,.15);border-radius:12px;font-size:15px;font-family:var(--ff);transition:border-color .2s;outline:none;color:var(--text);background:#fafafa; }
    .form-input:focus { border-color:var(--blue);background:white;box-shadow:0 0 0 3px rgba(26,10,255,.06); }
    textarea.form-input { min-height:120px;resize:vertical; }

    .spinner { width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;display:inline-block; }
    .spinner-dark { border-color:rgba(26,10,255,.2);border-top-color:var(--blue); }

    .toast { position:fixed;top:90px;right:24px;z-index:9999;padding:14px 22px;border-radius:14px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.15);animation:popUp .3s ease;max-width:340px; }
    .toast-ok  { background:#0f0640;color:white;border-left:4px solid var(--gold); }
    .toast-err { background:#fff1f2;color:#be123c;border-left:4px solid #be123c; }

    .loading-screen { display:flex;align-items:center;justify-content:center;min-height:300px;flex-direction:column;gap:16px;color:var(--grey); }
    .empty-state    { text-align:center;padding:60px 20px;color:var(--grey); }
    .empty-state .empty-icon { font-size:48px;margin-bottom:16px; }

    @media(max-width:768px) { .section{padding:60px 0;} .page-hero{padding:120px 0 60px;} }
  `}</style>
);

export default GlobalStyles;
