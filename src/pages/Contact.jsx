import { useState, useEffect } from "react";
import { sendContact } from "../api/hshApi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.title = "Contact — HolySpirit Hub";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendContact(form);
      setMsg(res.message);
      setSent(true);
    } catch (err) {
      setMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          margin-top: 56px;
          align-items: start;
        }

        .ct-card {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 8px 48px rgba(26,10,255,.08);
        }

        .ct-info-item {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          align-items: flex-start;
        }

        .ct-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--grey-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 20px;
        }

        @media(max-width:800px){
          .ct-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-hero">
        <h1>
          Get in <em style={{ color: "var(--gold)" }}>Touch</em>
        </h1>
        <p>We'd love to hear from you. Our team responds within 24 hours.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="ct-grid">

            {/* LEFT SIDE */}
            <div>
              <div className="label">Send a Message</div>
              <h2 className="section-title">
                We're <em>Listening</em>
              </h2>
              <div className="divider" />

              <div className="ct-card">
                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
                    <h3 style={{ fontSize: 24, marginBottom: 12 }}>
                      Message received!
                    </h3>
                    <p style={{ color: "var(--grey)" }}>{msg}</p>

                    <button
                      className="btn-primary"
                      style={{ marginTop: 24 }}
                      onClick={() => setSent(false)}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input
                          className="form-input"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Full name"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          className="form-input"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="you@example.com"
                        />
                      </div>

                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        className="form-input"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        placeholder="What is this about?"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-input"
                        style={{ minHeight: 140 }}
                        required
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Write your message…"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      disabled={loading}
                    >
                      {loading ? <span className="spinner" /> : "Send Message →"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="label">Contact Details</div>
              <h2 className="section-title">
                Find <em>Us</em>
              </h2>
              <div className="divider" />

              <div style={{ marginTop: 32 }}>
                {[
                  ["📍", "Address", "8 Faith Chapel, Ali-isiba, Joju, Sango Ota, Ogun State"],
                  ["📧", "Email", "info@holyspirithubinternational.org"],
                  ["📞", "Phone", "+234 9168190536"],
                  ["🕐", "Services", "Sundays: 3:00 PM – 6:30 PM WAT"]
                ].map(([icon, label, value]) => (
                  <div key={label} className="ct-info-item">
                    <div className="ct-icon">{icon}</div>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--grey)" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 500 }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MAP */}
              <div style={{ height: 240, marginTop: 28 }}>
                <iframe
                  src="https://maps.google.com/maps?q=12%20olugbemi%20street%20ota&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
