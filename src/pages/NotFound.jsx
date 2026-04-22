import { Link } from "react-router-dom";
export default function NotFound() {
  return (<div style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:40}}><div style={{fontSize:72,marginBottom:20}}>🕊️</div><h1 style={{fontFamily:"var(--ffh)",fontSize:52,marginBottom:12}}>Page Not Found</h1><p style={{color:"var(--grey)",fontSize:18,marginBottom:36}}>The page you're looking for doesn't exist. But the Holy Spirit is still here.</p><Link to="/" className="btn-primary">← Back to Home</Link></div>);
}
