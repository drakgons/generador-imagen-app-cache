import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert } from "@/app/components/bootstrap";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  //   brings to custom notFound page if 404 (notFound)
  if (response.status === 404) notFound();

  return await response.json();
}

// although it may seem like we are req twice, nextjs auto deduplicates the reqs
export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      // filtering out the values that are not boolean, so if no last name, only first name and vice versa
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - NextJS 13.4 Image Generator",
  };
}

export default async function Users({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the page
        title dynamically from the Api response
      </Alert>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>First name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
    </div>
  );
}
