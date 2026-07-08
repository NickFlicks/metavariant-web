import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Docs from "./pages/Docs.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the new page a tick to render before looking for the anchor.
      const id = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <ScrollToTop />
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
