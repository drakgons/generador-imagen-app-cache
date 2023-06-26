import SearchPage from "./SearchPage";

// cant put metadata inside client components, hence client components
// go inside server components, i.e. SearchPage
export const metadata = {
  title: "Search - NextJS 13.4 Image Gallery",
};

export default function Search() {
  return <SearchPage />;
}
