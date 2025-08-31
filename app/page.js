import dynamic from "next/dynamic";
import { personalData } from "@/utils/data/personal-data";

const HeroSection = dynamic(() => import("./components/homepage/hero-section"), { ssr: false });
const AboutSection = dynamic(() => import("./components/homepage/about"), { ssr: false });
const Experience = dynamic(() => import("./components/homepage/experience"), { ssr: false });
const Skills = dynamic(() => import("./components/homepage/skills"), { ssr: false });
const Projects = dynamic(() => import("./components/homepage/projects"), { ssr: false });
const Education = dynamic(() => import("./components/homepage/education"), { ssr: false });
const Blog = dynamic(() => import("./components/homepage/blog"), { ssr: false });
const ContactSection = dynamic(() => import("./components/homepage/contact"), { ssr: false });

async function getData() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
      return [];
    }

    const data = await res.json();

    return data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
