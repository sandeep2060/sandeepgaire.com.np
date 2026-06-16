import { Suspense, lazy, useCallback, useState } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Preloader } from "./components/Preloader";

const TechMarquee = lazy(() =>
  import("./components/TechMarquee").then((module) => ({ default: module.TechMarquee })),
);
const About = lazy(() =>
  import("./components/About").then((module) => ({ default: module.About })),
);
const WhyWorkWithMe = lazy(() =>
  import("./components/WhyWorkWithMe").then((module) => ({ default: module.WhyWorkWithMe })),
);
const Skills = lazy(() =>
  import("./components/Skills").then((module) => ({ default: module.Skills })),
);
const Experience = lazy(() =>
  import("./components/Experience").then((module) => ({ default: module.Experience })),
);
const Projects = lazy(() =>
  import("./components/Projects").then((module) => ({ default: module.Projects })),
);
const CTASection = lazy(() =>
  import("./components/CTASection").then((module) => ({ default: module.CTASection })),
);
const Contact = lazy(() =>
  import("./components/Contact").then((module) => ({ default: module.Contact })),
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer })),
);
const BackToTop = lazy(() =>
  import("./components/BackToTop").then((module) => ({ default: module.BackToTop })),
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Preloader onDone={finishLoading} />}
      <div className="app-shell">
        <AmbientBackground />
        <ScrollProgress />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Suspense fallback={null}>
            <TechMarquee />
            <About />
            <div className="section-divider" />
            <WhyWorkWithMe />
            <Skills />
            <Experience />
            <Projects />
            <CTASection />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <BackToTop />
        </Suspense>
      </div>
    </>
  );
}
