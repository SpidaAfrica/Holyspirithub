import { useEffect, useState } from "react";
import logoBlue from "../assets/logo-blue.png";

// TEAM IMAGES
import benjamin from "../assets/team-benjamin.jpg";
import damilola from "../assets/team-dami.jpg";
import eucharia from "../assets/team-eucharia.jpg";
import victory from "../assets/team-victory.jpg";
import tochi from "../assets/team-tochi.jpg";
import blessing from "../assets/team-blessing.jpg";
import precious from "../assets/team-precious.jpg";

// GALLERY IMAGES
import g1 from "../assets/gallery1.jpg";
import g2 from "../assets/gallery2.jpg";
import g3 from "../assets/gallery3.jpg";

export default function About() {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    document.title = "About — HolySpirit Hub";
  }, []);

  // 🔥 BELIEFS (WITH NUMBERING SYSTEM)
  const beliefs = [
    {
      title: "The Death & Resurrection of Jesus",
      desc: "We believe in the death, burial and resurrection of Jesus Christ as the foundation of our faith."
    },
    {
      title: "The Trinity",
      desc: "We believe in God the Father, God the Son and God the Holy Spirit—three in one."
    },
    {
      title: "Jesus is God",
      desc: "Jesus Christ is fully God and fully man, the Savior of the world."
    },
    {
      title: "The Holy Spirit is God",
      desc: "The Holy Spirit is not a force but God Himself—present, active, and dwelling within believers."
    },
    {
      title: "Unity of the Saints",
      desc: "We believe in the unity of all believers regardless of denomination."
    },
    {
      title: "Victory in Christ",
      desc: "Through Christ we have victory over sin, death, sickness, poverty, and all consequences of the fall."
    }
  ];

  // 🔥 TEAM
  const team = [
    { name: "Benjamin Uwa", role: "Founder & Lead Pastor", img: benjamin },
    { name: "Oluwadamilola Benjamin-Uwa", role: "Media Ministry Pastor", img: damilola },
    { name: "Eucharia Abuato", role: "SMR & Organizing Ministry Pastor", img: eucharia },
    { name: "Victory Abuato", role: "Music Ministry Pastor", img: victory },
    { name: "Tochi Akpogu", role: "Praying Ministry Pastor", img: tochi },
    { name: "Blessing Martins", role: "Follow-up Ministry Pastor", img: blessing },
    { name: "Precious Abuato", role: "Drama Ministry Head", img: precious }
  ];

  // 🔥 GALLERY
  const gallery = [
    { img: g1, cat: "Sunday Service" },
    { img: g2, cat: "Crusades" },
    { img: g3, cat: "KTHS" }
  ];

  const filteredGallery =
    filter === "All" ? gallery : gallery.filter((g) => g.cat === filter);

  return (
    <>
      <style>{`
        .beliefs-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .belief-card {
          border: 1px solid rgba(26,10,255,.1);
          border-radius: 16px;
          padding: 28px;
        }

        .belief-num {
          font-size: 48px;
          font-weight: 700;
          color: rgba(26,10,255,.1);
          margin-bottom: 8px;
        }

        .team-grid, .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .team-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 16px;
        }

        .gallery-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 16px;
          cursor: pointer;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .lightbox img {
          max-width: 90%;
          max-height: 80%;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 18px;
          border-radius: 50px;
          border: 1px solid var(--blue);
          cursor: pointer;
        }

        .active {
          background: var(--blue);
          color: white;
        }

        @media(max-width:900px){
          .beliefs-grid, .team-grid, .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <img src={logoBlue} alt="" style={{ width: "70%" }} />

            <div>
              <h2>Our Story</h2>

              <p>
                HolySpirit Hub started on January 28th, 2022 in Ota, Ogun State,
                following a divine instruction given to Benjamin Uwa—to raise a people
                who are conscious of the Holy Spirit.
              </p>

              <p>
                We are committed to influencing every sphere of life:
                Family, Education, Religion, Business & Finance,
                Leadership & Politics, Media & Entertainment, Art & Culture.
              </p>

              <p>
                Our core values are:
                <strong> The Word, Prayer, Evangelism and Unity.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BELIEFS (NUMBERING PRESERVED) */}
      <section className="section">
        <div className="container">
          <h2>Our Beliefs</h2>

          <div className="beliefs-grid">
            {beliefs.map((b, i) => (
              <div key={b.title} className="belief-card">
                <div className="belief-num">0{i + 1}</div>
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
            {team.map((t) => (
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
            {["All","Sunday Service","Crusades","KTHS"].map((c)=>(
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
          <img src={preview} alt="" />
        </div>
      )}
    </>
  );
}
