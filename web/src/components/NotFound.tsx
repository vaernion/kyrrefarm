import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function NotFound() {
  const location = useLocation();
  useEffect(() => {
    document.title = `404: ${location.pathname} - Kyrrefarm`;
  }, [location.pathname]);

  return (
    <>
      <Container>
        <h1>404</h1>
        <h4>Invalid path: {location.pathname}</h4>
      </Container>
    </>
  );
}
