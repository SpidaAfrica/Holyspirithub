import { useEffect } from "react";

export default function Give() {
  useEffect(() => {
    document.title = "Give — HolySpirit Hub";
  }, []);

  return (
    <>
      <style>{`
        .give-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: start;
          margin-top: 56px;
        }

        .give-card {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 8px 48px rgba(26,10,255,.08);
        }

        .bank-box {
          border: 1px solid rgba(26,10,255,.1);
          border-radius: 16px;
          padding: 24px;
          background: rgba(26,10,255,.02);
        }

        .copy-btn {
          margin-top: 12px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: var(--blue);
          color: white;
          cursor: pointer;
          font-size: 13px;
        }

        .scripture-card {
          background: linear-gradient(135deg,var(--blue),var(--blue-dark));
          border-radius: 20px;
          padding: 36px;
          color: white;
          text-align: center;
          margin-top: 20px;
        }

        @media(max-width:800px){
          .give-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <h1>
          Give <em style={{ color: "var(--gold)" }}>Generously</em>
        </h1>
        <p>
          Your giving partners with us to spread the consciousness of the Holy Spirit globally.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="give-grid">

            {/* LEFT SIDE */}
            <div>
              <div className="label">Make a Donation</div>
              <h2 className="section-title">
                Give <em>Today</em>
              </h2>
              <div className="divider" />

              <div className="give-card">

                {/* BANK DETAILS */}
                <div className="bank-box">
                  <h3>Bank Transfer</h3>

                  <p style={{ fontWeight: 600, marginTop: 10 }}>
                    THE HOLYSPIRIT HUB INTERNATIONAL
                  </p>

                  <div style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.8 }}>
                    <p><strong>Bank:</strong> UBA</p>
                    <p><strong>Naira:</strong> 1030053633</p>
                    <p><strong>Dollar:</strong> 3005121921</p>
                    <p><strong>Pounds:</strong> 3005122739</p>
                  </div>

                  <button
                    className="copy-btn"
                    onClick={() => navigator.clipboard.writeText("1030053633")}
                  >
                    Copy Naira Account
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div
                style={{
                  background: "var(--grey-light)",
                  borderRadius: 20,
                  padding: 32,
                  marginBottom: 20
                }}
              >
                <h3>Giving Categories</h3>

                <ul style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 14,
                  color: "var(--grey)"
                }}>
                  {[
                    ["🌾", "Offering", "General ministry operations"],
                    ["💰", "Tithe", "Return to God a tenth"],
                    ["🌍", "Crusades & Missions", "Fund outreach"],
                    ["🏗️", "Building", "Infrastructure"]
                  ].map(([icon, n, d]) => (
                    <li key={n} style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <div><strong>{n}</strong> — {d}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="scripture-card">
                <blockquote>
                  "Each of you should give what you have decided in your heart to give,
                  not reluctantly or under compulsion, for God loves a cheerful giver."
                </blockquote>
                <cite>— 2 Corinthians 9:7</cite>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
