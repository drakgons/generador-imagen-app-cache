import { Alert } from "./components/bootstrap";

export default function Home() {
  return (
    <div>
      <Alert>
        <p>
          This is a sample project to showcase and learn the new{" "}
          <strong>NextJS 13.4 Stable App Dir</strong>
        </p>
        <ul>
          <li>static and dynamic server-side rendering</li>
          <li>incremental static regeneration</li>
          <li>client-side rendering</li>
          <li>route handlers (API Endpoints)</li>
          <li>meta-data API</li>
          <li>and more</li>
        </ul>
        <p>
          Every page uses a different approach to{" "}
          <strong>fetching and caching</strong>
        </p>
      </Alert>
      <Alert variant="secondary">
        <p>
          Note: in order to load the data on this side, you will need a free
          Unsplash Api which gives 50 req/hour and add it to .env.local file as
          UNSPLASH_ACCESS_KEY
        </p>
      </Alert>
    </div>
  );
}
