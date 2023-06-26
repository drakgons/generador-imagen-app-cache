"use client";

import { UnsplashImage } from "@/models/unsplash-images";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsIsLoading, setSearchResultsIsLoading] = useState(false);
  const [searchResultsIsLoadingError, setSearchResultsIsLoadingError] =
    useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsIsLoadingError(false);
        setSearchResultsIsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsIsLoadingError(true);
      } finally {
        setSearchResultsIsLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not
        leak Api credentials, the req is sent to a nextjs route handler that
        runs on the server. This route handler then fetches the data from the
        Unsplash Api and returns it to the client
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. cats, dogs, sports, ..."
          />
        </Form.Group>
        <Button
          type="submit"
          className="mb-3"
          disabled={searchResultsIsLoading}
        >
          Search
        </Button>
      </Form>
      <div className="d-flex flec-column align-items-center">
        {searchResultsIsLoading && <Spinner animation="border" />}
        {searchResultsIsLoadingError && <p>Something went wrong</p>}
        {searchResults?.length === 0 && <p>Nothing found</p>}
      </div>
      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
