import { Box, Center, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import type { Phone } from "@prisma/client";
import type { RefObject } from "react";

import { Card } from "./components/Card";

export const PhoneGridComponent = ({
  phones,
  loading,
  fromRef,
}: {
  phones: Array<Phone>;
  loading: boolean;
  fromRef: RefObject<HTMLDivElement>;
}) => (
  <>
    <SimpleGrid minChildWidth="240px" spacing={10} pb="10">
      {phones.map((phone) => (
        <Card key={phone.id} phone={phone} />
      ))}
    </SimpleGrid>
    {loading && (
      <Center>
        <Box p="30">
          <Spinner
            label="loading"
            size="xl"
            color="teal.200"
            data-testid="spinner"
          />
        </Box>
      </Center>
    )}
    {phones.length === 0 && (
      <Heading textAlign="center">Database is empty ☠️</Heading>
    )}
    <div id="bottom" ref={fromRef} />
  </>
);
