import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Docs from "./pages/Docs.jsx";
import Privacy from "./pages/Privacy.jsx";
import Contact from "./pages/Contact.jsx";
import { pageVariant } from "./lib/motion.js";

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    // mode="wait" serialized exit-then-enter by waiting for the outgoing
    // page's onExitComplete before mounting the next one. Fast navigation
    // (especially the browser back/forward buttons, which can fire more
    // than one history change before a 250ms exit transition finishes) could
    // desync that wait, leaving the incoming page mounted but stuck at its
    // initial/exit style (opacity: 0, translateY). mode="popLayout" runs the
    // outgoing and incoming pages' animations independently instead of
    // gating one on the other, so there's nothing to get stuck waiting on,
    // and it pulls the exiting page out of layout flow (position: absolute)
    // so it doesn't stack on top of or push around the incoming page while
    // both are briefly in the DOM together.
    // location.key (unique per history entry) replaces location.pathname so
    // two visits to the same route are always treated as distinct mounts.
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.key}
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col bg-white text-ink">
        <ScrollToTop />
        <NavBar />
        {/* relative: popLayout takes the exiting page out of flow with
            position: absolute, which needs a positioned ancestor to anchor
            to, otherwise it'd jump to the nearest one further up the tree. */}
        <main className="relative flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
