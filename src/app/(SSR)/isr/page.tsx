import { UnsplashImage } from "@/models/unsplash-images";
import { Alert } from "@/app/components/bootstrap";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Incremental Static Regeneration - NextJS 13.4 Image Generator",
};

export const revalidate = 15;

export default async function ISR() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // next: {
      //   revalidate: 15,
      // },
    }
  );
  const image: UnsplashImage = await response.json();

  //   choose whatever is smaller, 500 or image.width
  const width = Math.min(500, image.width);
  //   width / image.width calculates the ratio between chosen width and original width
  //   then scale the height proportionally
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>Incremental Static Regeneration</strong> A new image
        is fetched every 15 seconds (after refreshing the page, you get a new
        image from Unsplash Api)
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
