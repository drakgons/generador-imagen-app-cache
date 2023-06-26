import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container, SSRProvider } from "./components/bootstrap";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

// global metadata, but can use more specific metadata inside the pages
export const metadata = {
  title: "NextJS 13.4 image generator",
  description:
    "Practice project to reference and review NextJS 13.4 stable features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* body is similar to outlet in react router dom - wraps children */}
      <body className={inter.className}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className=" py-4"> {children}</Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  );
}
