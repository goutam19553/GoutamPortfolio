import { personalData } from "@/utils/data/personal-data";
import HomeContent from "./home-content";

async function getData() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 60 } } // ISR to avoid per-request fetching
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

  return <HomeContent blogs={blogs} />;
}
