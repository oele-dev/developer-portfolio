import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import SideProjects from "./components/homepage/side-projects";
import Skills from "./components/homepage/skills";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <SideProjects />
      <ContactSection />
    </>
  )
};