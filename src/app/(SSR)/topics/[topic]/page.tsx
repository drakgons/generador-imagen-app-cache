import { UnsplashImage } from "@/models/unsplash-images";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/app/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: { topic: string };
  //   searchParams are whatever you add after ?  in url
  //   searchParams: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 13.4 Image Generator",
  };
}

// folder is topics, meaning it will be /topics
// subfolder is [topic] which means its variable, could be /topics/apples or /topic/trees etc

// to render some pages in advanced
export async function generateStaticParams() {
  // map each to an object => {topic: "health"} since topic is the param
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=5&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  //   added [] since we are getting an array
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This pages uses <strong>generateStaticParams</strong> to render and
        cache static pages at build time, even though the url has a dynamic
        parameter. Pages that are not included in the generateStaticParams will
        be fetched and rendered on the first access and then cached for
        subsequent requests
      </Alert>
      <div>{topic}</div>
      {images.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
}
