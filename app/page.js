import dynamic from "next/dynamic";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import HeroSection from "./components/homepage/hero-section";
import SideProjects from "./components/homepage/side-projects";

const Skills = dynamic(() => import("./components/homepage/skills"), {
  ssr: false,
});

const Experience = dynamic(() => import("./components/homepage/experience"), {
  ssr: false,
});

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