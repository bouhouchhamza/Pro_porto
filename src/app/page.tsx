import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ToolsWorkflow from "./components/ToolsWorkflow";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
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
      <ExperienceSection />
      <Quote />
      <Contact />
      <Footer />
    </main>
  );
}
