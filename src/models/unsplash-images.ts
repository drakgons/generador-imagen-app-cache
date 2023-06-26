// has to match the exact spelling of the res from unsplash api, which can
// be seen on the unsplash website

export interface UnsplashImage {
  description: string;
  user: {
    username: string;
  };
  urls: {
    raw: string;
  };
  width: number;
  height: number;
}
export interface UnsplashSearchResponse {
  results: UnsplashImage[];
}
