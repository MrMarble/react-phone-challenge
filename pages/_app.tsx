import { ChakraProvider, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { Header } from "../src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Header />
      <Container maxW="7xl">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}
export default MyApp;
