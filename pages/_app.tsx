import { ChakraProvider, Container } from "@chakra-ui/react";
import PhoneProvider from "components/Provider";
import type { AppProps } from "next/app";

import { Header } from "../src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <PhoneProvider>
        <>
          <Header />
          <Container maxW="7xl">
            <Component {...pageProps} />
          </Container>
        </>
      </PhoneProvider>
    </ChakraProvider>
  );
}
export default MyApp;
