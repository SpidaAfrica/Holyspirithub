// ================================================================
// HolySpirit Hub — API Service
// Base: https://api.holyspirithub.international
// ================================================================

const BASE = "https://api.holyspirithubinternational.org";

async function call(path, options = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json();
    if (!data.success && res.status >= 400) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (err) {
    if (err.name === "TypeError") throw new Error("Unable to reach the server. Check your connection.");
    throw err;
  }
}

// ── Prayer ────────────────────────────────────────────────────
export const submitPrayer = (body) =>
  call("/prayer/submit.php", { method: "POST", body: JSON.stringify(body) });

export const fetchPrayerWall = (limit = 10) =>
  call(`/prayer/wall.php?limit=${limit}`);

// ── Contact ───────────────────────────────────────────────────
export const sendContact = (body) =>
  call("/contact/send.php", { method: "POST", body: JSON.stringify(body) });

// ── Newsletter ────────────────────────────────────────────────
export const subscribeNewsletter = (body) =>
  call("/newsletter/subscribe.php", { method: "POST", body: JSON.stringify(body) });

// ── Teachings ─────────────────────────────────────────────────
export const fetchTeachings = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return call(`/teachings/list.php?${q}`);
};

// ── Events ────────────────────────────────────────────────────
export const fetchEvents = (params = { upcoming: 1, limit: 10 }) => {
  const q = new URLSearchParams(params).toString();
  return call(`/events/list.php?${q}`);
};

export const submitRsvp = (body) =>
  call("/events/rsvp.php", { method: "POST", body: JSON.stringify(body) });

// ── Blog ──────────────────────────────────────────────────────
export const fetchBlogPosts = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return call(`/blog/list.php?${q}`);
};

export const fetchBlogPost = (slug) =>
  call(`/blog/post.php?slug=${slug}`);

// ── Give ──────────────────────────────────────────────────────
export const initializeDonation = (body) =>
  call("/give/initialize.php", { method: "POST", body: JSON.stringify(body) });

export const verifyDonation = (reference) =>
  call("/give/verify.php", { method: "POST", body: JSON.stringify({ reference }) });

// ── Schedule ──────────────────────────────────────────────────
export const fetchSchedule = () =>
  call("/schedule/list.php");
