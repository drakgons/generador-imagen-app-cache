"use client";

import Link from "next/link";
import { Container } from "./components/bootstrap";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        {/* Link from nextJS is more efficient than an a tag since if a page is already cached
            if won't cause a re render, whereas an a tag causes a re render */}
        <Navbar.Brand as={Link} href="/">
          NextJS 13.4 Image Generator
        </Navbar.Brand>
        {/* aria-controls defines what this is connected to */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathname === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathname === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/health">
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/Fitness">
                Fitness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/Coding">
                Coding
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={Link}
              href="/search"
              active={pathname === "/search"}
            ></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
