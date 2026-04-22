import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GlobalStyles  from "./components/GlobalStyles";
import Nav           from "./components/Nav";
import Footer        from "./components/Footer";

// Pages
import Home          from "./pages/Home";
import About         from "./pages/About";
import Teachings     from "./pages/Teachings";
import Watch         from "./pages/Watch";
import Events        from "./pages/Events";
import Prayer        from "./pages/Prayer";
import PrayerLive    from "./pages/PrayerLive";
import Give          from "./pages/Give";
import Community     from "./pages/Community";
import Blog          from "./pages/Blog";
import Contact       from "./pages/Contact";
import NotFound      from "./pages/NotFound";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Pages that use the full-screen room view (no nav/footer)
const FULLSCREEN_ROUTES = ["/prayer-live"];

function Layout() {
  const { pathname } = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.some(r => pathname.startsWith(r));

  return (
    <>
      {!isFullscreen && <Nav />}
      <main style={{ paddingTop: isFullscreen ? 0 : "0px" }}>
        <Routes>
          <Route path="/"            element={<Home />}       />
          <Route path="/about"       element={<About />}      />
          <Route path="/teachings"   element={<Teachings />}  />
          <Route path="/watch"       element={<Watch />}      />
          <Route path="/events"      element={<Events />}     />
          <Route path="/prayer"      element={<Prayer />}     />
          <Route path="/prayer-live" element={<PrayerLive />} />
          <Route path="/give"        element={<Give />}       />
          <Route path="/community"   element={<Community />}  />
          <Route path="/blog"        element={<Blog />}       />
          <Route path="/blog/:slug"  element={<Blog />}       />
          <Route path="/contact"     element={<Contact />}    />
          <Route path="*"            element={<NotFound />}   />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
