import { useEffect, useState } from "react";
import logoBlue from "../assets/logo-blue.png";

// TEAM IMAGES
import benjamin from "../assets/Benjamin.jpeg";
import eucharia from "../assets/Eucharia.jpeg";
import victory from "../assets/Victory.jpeg";
import tochi from "../assets/Tochi.jpeg";
import blessing from "../assets/Blessing.jpeg";
import precious from "../assets/Precious.jpeg";

// GALLERY IMAGES
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
    { title: "The Death & Resurrection of Jesus", desc: "We believe in the death, burial and resurrection of Jesus Christ as the foundation of our faith." },
    { title: "The Trinity", desc: "We believe in God the Father, God the Son and God the Holy Spirit—three in one." },
    { title: "Jesus is God", desc: "Jesus Christ is fully God and fully man, the Savior of the world." },
    { title: "The Holy Spirit is God", desc: "The Holy Spirit is God—present, active, and dwelling within believers." },
    { title: "Unity of the Saints", desc: "We believe in the unity of all believers regardless of denomination." },
    { title: "Victory in Christ", desc: "Through Christ we have victory over sin, death, sickness, poverty, and all consequences of the fall." }
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

  const filteredGallery = filter === "All" ? gallery : gallery.filter(g => g.cat === filter);

  return (
    <>
      <style>{`
        .beliefs-grid, .team-grid, .gallery-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:24px;
          margin-top:40px;
        }

        .beliefs-grid {
          grid-template-columns:repeat(2,1fr);
        }

        .belief-card {
          border:1px solid rgba(26,10,255,.1);
          border-radius:16px;
          padding:24px;
        }

        .belief-num {
          font-size:40px;
          color:rgba(26,10,255,.15);
        }

        .team-card img, .gallery-img {
          width:100%;
          height:220px;
          object-fit:cover;
          border-radius:16px;
        }

        .gallery-img {
          cursor:pointer;
        }

        .lightbox {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.9);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
        }

        .lightbox img {
          max-width:90%;
          max-height:80%;
          border-radius:16px;
        }

        .filters {
          display:flex;
          gap:10px;
          margin-top:20px;
        }

        .filter-btn {
          padding:8px 18px;
          border-radius:50px;
          border:1px solid var(--blue);
          cursor:pointer;
        }

        .active {
          background:var(--blue);
          color:white;
        }

        .mission-vision-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:48px;
        }

        @media(max-width:900px){
          .beliefs-grid,
          .team-grid,
          .gallery-grid,
          .mission-vision-grid {
            grid-template-columns:1fr;
          }
        }
      `}</style>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60}}>
            <img src={logoBlue} alt="HolySpirit Hub Logo" />

            <div>
              <h2>Our Story</h2>
              <p>HolySpirit Hub started January 28th, 2022 in Ota, Ogun State.</p>
              <p>We raise believers conscious of the Holy Spirit to influence every sphere of life.</p>
              <p><strong>Core values:</strong> The Word, Prayer, Evangelism, Unity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section" style={{background:"var(--grey-light)"}}>
        <div className="container">
          <div className="mission-vision-grid">

            <div style={{background:"white",padding:30,borderRadius:16}}>
              <h3>Mission</h3>
              <p>Raise believers conscious of the Holy Spirit influencing all spheres of life.</p>
            </div>

            <div style={{background:"white",padding:30,borderRadius:16}}>
              <h3>Vision</h3>
              <p>A generation living in the fullness of the Holy Spirit.</p>
            </div>

          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section">
        <div className="container">
          <h2>Our Beliefs</h2>

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
      <section className="section">
        <div className="container">
          <h2>Meet the Team</h2>

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

          <div className="filters">
            {["All","Sunday Service","Crusades","KTHS"].map(c=>(
              <button
                key={c}
                className={`filter-btn ${filter===c?"active":""}`}
                onClick={()=>setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

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

      {/* LIGHTBOX */}
      {preview && (
        <div className="lightbox" onClick={()=>setPreview(null)}>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </>
  );
}
