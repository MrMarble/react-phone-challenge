import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Phone } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Card } from "../src/components/Card";
import useNearScreen from "../src/hooks/userNearScreen";
import { getPhones } from "./api/phones";

export async function getServerSideProps() {
  const phones = await getPhones(0, 10);
  return {
    props: { phones },
  };
}

export default function Home({
  phones: initialPhones,
}: {
  phones: Array<Phone>;
}) {
  const [page, setPage] = useState(1);
  const [phones, setPhones] = useState(initialPhones);
  const [loading, setLoading] = useState(false);
  const { isNearScreen, fromRef } = useNearScreen<HTMLDivElement>({
    distance: "600px",
  });

  const fetchPhones = async () => {
    setLoading(true);
    const { phones: newPhones } = await (
      await axios.get(`/api/phones?page=${page}`)
    ).data;
    setPage(page + 1);
    setPhones([...phones, ...newPhones]);
    setLoading(false);
  };

  useEffect(() => {
    if (isNearScreen) {
      fetchPhones();
    }
  }, [isNearScreen]);

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

      <SimpleGrid minChildWidth="240px" spacing={10}>
        {phones.map((phone) => (
          <Card key={phone.id} phone={phone} />
        ))}
      </SimpleGrid>
      {loading && (
        <Center>
          <Box p="30">
            <Spinner label="loading" size="xl" color="teal.200" />
          </Box>
        </Center>
      )}
      <div id="bottom" ref={fromRef} />
    </>
  );
}
