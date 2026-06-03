import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ToolsWorkflow from "./components/ToolsWorkflow";
import AboutSection from "./components/AboutSection";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <ToolsWorkflow />
      <AboutSection />
      <Quote />
      <Contact />
      <Footer />
    </main>
  );
}
