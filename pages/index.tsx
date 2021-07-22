import { Container, SimpleGrid } from "@chakra-ui/react";
import { Phone } from "@prisma/client";
import Head from "next/head";

import { Card } from "../components/Card";
import { getPhones } from "./api/phones";

export async function getServerSideProps() {
  const phones = await getPhones(0, 10);
  return {
    props: { phones },
  };
}

export default function Home({ phones }: { phones: Array<Phone> }) {
  return (
    <>
      <Head>
        <title>Phone catalogue</title>
        <meta
          name="description"
          content="Phone catalogue react code challenge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="3xl">
        <SimpleGrid minChildWidth="240px" spacing={10}>
          {phones.map((phone) => (
            <Card key={phone.id} phone={phone} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
