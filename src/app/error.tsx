"use client";

import { Button } from "react-bootstrap";

// error.tsx has to be a client component

interface ErrorPageProps {
  error: Error;
  //   reset func, attempts to re render page
  //   has to be called reset, via nextJS
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div>
      <h1>Error</h1>
      <p>Something went wrong</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
