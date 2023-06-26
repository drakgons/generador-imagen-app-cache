import { UnsplashImage } from "@/models/unsplash-images";
import { Alert } from "@/app/components/bootstrap";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Dynamic Fetching - NextJS 13.4 Image Generator",
};

// export const revalidate = 0;
// revalidate whenever page is refreshed with 0
// can do the above, or within the fetch, cache: "no-cache" if i want
// to confugure per fetch, or i can use the next: {} object as well in the fetch

export default async function Dynamic() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      cache: "no-cache",
      // next: {
      //   revalidate: 0,
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
        This page <strong>fetches data dynamically</strong> every time you
        refresh the page, you get a new image from the Unsplash Api
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
