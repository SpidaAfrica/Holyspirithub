const BASE = "https://api.holyspirithubinternational.org";

async function call(path, options = {}) {
  try {
    const res  = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json();
    if (!data.success && res.status >= 400) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    if (err.name === "TypeError") throw new Error("Unable to reach the server.");
    throw err;
  }
}

export const submitPrayer       = (body)   => call("/prayer/submit.php",        { method:"POST", body:JSON.stringify(body) });
export const fetchPrayerWall    = (limit)  => call(`/prayer/wall.php?limit=${limit||10}`);
export const sendContact        = (body)   => call("/contact/send.php",         { method:"POST", body:JSON.stringify(body) });
export const subscribeNewsletter= (body)   => call("/newsletter/subscribe.php", { method:"POST", body:JSON.stringify(body) });
export const fetchTeachings     = (params) => call(`/teachings/list.php?${new URLSearchParams(params)}`);
export const fetchEvents        = (params) => call(`/events/list.php?${new URLSearchParams(params||{upcoming:1,limit:10})}`);
export const submitRsvp         = (body)   => call("/events/rsvp.php",          { method:"POST", body:JSON.stringify(body) });
export const fetchBlogPosts     = (params) => call(`/blog/list.php?${new URLSearchParams(params||{})}`);
export const fetchBlogPost      = (slug)   => call(`/blog/post.php?slug=${slug}`);
export const initializeDonation = (body)   => call("/give/initialize.php",      { method:"POST", body:JSON.stringify(body) });
export const verifyDonation     = (ref)    => call("/give/verify.php",          { method:"POST", body:JSON.stringify({reference:ref}) });
export const fetchSchedule      = ()       => call("/schedule/list.php");

// Prayer Live
export const fetchLiveSessions  = ()       => call("/prayer-live/sessions.php");
export const createSession      = (body)   => call("/prayer-live/create.php",   { method:"POST", body:JSON.stringify(body) });
export const joinSession        = (body)   => call("/prayer-live/join.php",     { method:"POST", body:JSON.stringify(body) });
export const endSession         = (code)   => call("/prayer-live/end.php",      { method:"POST", body:JSON.stringify({code}) });
export const sendReaction       = (body)   => call("/prayer-live/react.php",    { method:"POST", body:JSON.stringify(body) });
export const sendMessage        = (body)   => call("/prayer-live/message.php",  { method:"POST", body:JSON.stringify(body) });
export const pollSession        = (code,since) => call(`/prayer-live/poll.php?code=${code}${since?`&since=${since}`:""}`);

// Gallery
export const fetchGallery       = (params) => call(`/gallery/list.php?${new URLSearchParams(params||{})}`);

// Event Flyers
export const fetchFlyers        = (params) => call(`/events/flyers.php?${new URLSearchParams(params||{limit:10})}`);

// Feedback
export const submitFeedback     = (body)   => call("/feedback/submit.php", { method:"POST", body:JSON.stringify(body) });
