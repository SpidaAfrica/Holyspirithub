import { useEffect, useState } from "react";
import logoBlue from "../assets/logo-blue.png";

// TEAM IMAGES
import benjamin from "../assets/Benjamin.jpeg";
import eucharia from "../assets/Eucharia.jpeg";
import victory from "../assets/Victory.jpeg";
import tochi from "../assets/Tochi.jpeg";
import blessing from "../assets/Blessing.jpeg";
import precious from "../assets/Precious.jpeg";

// GALLERY
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-3.jpg";
import g3 from "../assets/gallery-4.jpeg";

export default function About() {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    document.title = "About — HolySpirit Hub";
  }, []);

  const beliefs = [
    { title: "The Death & Resurrection of Jesus", desc: "We believe in the death, burial and resurrection of Jesus Christ." },
    { title: "The Trinity", desc: "We believe in God the Father, God the Son and God the Holy Spirit." },
    { title: "Jesus is God", desc: "Jesus Christ is fully God and Savior of the world." },
    { title: "The Holy Spirit is God", desc: "The Holy Spirit is God—present and active." },
    { title: "Unity of Saints", desc: "We believe in unity among believers." },
    { title: "Victory in Christ", desc: "We have victory over sin, death, sickness and poverty." }
  ];

  const team = [
    { name: "Benjamin Uwa", role: "Founder & Lead Pastor", img: benjamin },
    { name: "Eucharia Abuato", role: "SMR & Organizing Ministry Pastor", img: eucharia },
    { name: "Victory Abuato", role: "Music Ministry Pastor", img: victory },
    { name: "Tochi Akpogu", role: "Praying Ministry Pastor", img: tochi },
    { name: "Blessing Martins", role: "Follow-up Ministry Pastor", img: blessing },
    { name: "Precious Abuato", role: "Drama Ministry Head", img: precious }
  ];

  const gallery = [
    { img: g1, cat: "Sunday Service" },
    { img: g2, cat: "Crusades" },
    { img: g3, cat: "KTHS" }
  ];

  const filteredGallery = filter === "All"
    ? gallery
    : gallery.filter(g => g.cat === filter);

  return (
    <>
      <style>{`
        .ab-story{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .ab-vis{aspect-ratio:1;background:linear-gradient(135deg,var(--grey-light),#e8e4ff);border-radius:28px;display:flex;align-items:center;justify-content:center;}
        .ab-vis img{width:70%;}

        .mission-vision-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;}

        .beliefs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px;}
        .belief-card{border:1px solid rgba(26,10,255,.1);border-radius:16px;padding:28px;transition:.3s;}
        .belief-card:hover{background:rgba(26,10,255,.03);}
        .belief-num{font-size:48px;color:rgba(26,10,255,.1);}

        .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
        .team-card{text-align:center;}
        .team-card img{width:100%;height:220px;object-fit:cover;border-radius:16px;}

        .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
        .gallery-img{width:100%;height:200px;object-fit:cover;border-radius:16px;cursor:pointer;}

        .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;}
        .lightbox img{max-width:90%;max-height:80%;border-radius:16px;}

        @media(max-width:900px){
          .ab-story,.beliefs-grid,.team-grid,.gallery-grid,.mission-vision-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      {/* HERO */}
      <div className="page-hero">
        <h1>About <em style={{color:"var(--gold)"}}>HolySpirit Hub</em></h1>
        <p>A ministry raising Spirit-conscious believers.</p>
      </div>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="ab-story">
            <div className="ab-vis">
              <img src={logoBlue} alt="HolySpirit Hub Logo" />
            </div>

            <div>
              <div className="label">Our Story</div>
              <h2 className="section-title">Born from an <em>Encounter</em></h2>

              <p>
                HolySpirit Hub started January 28th, 2022 in Ota, Ogun State,
                following God's instruction to raise believers conscious of the Holy Spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div className="mission-vision-grid">

            <div style={{background:"white",borderRadius:24,padding:48}}>
              <div className="label">Mission</div>
              <h3>What We Do</h3>
              <p>
                To raise believers who are conscious of the Holy Spirit and empowered
                to influence every sphere of life — Family, Education, Religion,
                Business & Finance, Leadership & Politics, Media & Entertainment,
                and Art & Culture — through The Word, Prayer, Evangelism, and Unity.
              </p>
            </div>

            <div style={{background:"white",borderRadius:24,padding:48}}>
              <div className="label">Vision</div>
              <h3>Where We Are Going</h3>
              <p>
                A generation of believers who live daily in the consciousness of the
                Holy Spirit, manifesting the life of Christ and transforming their world.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section">
        <div className="container">
          <div className="label">What We Believe</div>
          <h2 className="section-title">Our Core <em>Beliefs</em></h2>

          <div className="beliefs-grid">
            {beliefs.map((b,i)=>(
              <div key={b.title} className="belief-card">
                <div className="belief-num">0{i+1}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div style={{textAlign:"center"}}>
            <div className="label">Our Leaders</div>
            <h2 className="section-title">Meet the <em>Team</em></h2>
          </div>

          <div className="team-grid">
            {team.map(t=>(
              <div key={t.name} className="team-card">
                <img src={t.img} alt={t.name} />
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <div className="container">
          <h2>Hub Gallery</h2>

          <div className="gallery-grid">
            {filteredGallery.map((g,i)=>(
              <img
                key={i}
                src={g.img}
                alt={`Gallery ${g.cat} ${i+1}`}
                className="gallery-img"
                onClick={()=>setPreview(g.img)}
              />
            ))}
          </div>
        </div>
      </section>

      {preview && (
        <div className="lightbox" onClick={()=>setPreview(null)}>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </>
  );
}
