import { UnsplashImage } from "@/models/unsplash-images";
import { Alert } from "@/app/components/bootstrap";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Static Fetching - NextJS 13.4 Image Generator",
};

export default async function Static() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY
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
        This page <strong>fetches and caches data at build time</strong> even
        though the Unsplash Api always returns a new image, we still get the
        same cached one, until we compile and build it again
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
