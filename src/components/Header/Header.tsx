import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

import { Progress } from "./components/Progress";

export const HeaderComponent = ({ progress = 0 }) => (
  <Box
    as="header"
    position="sticky"
    bg="teal"
    paddingInlineStart="6"
    paddingInlineEnd="6"
    height="4.5rem"
    top="0"
    zIndex="10"
    mb="3rem"
    display="flex"
    data-testid="header"
  >
    <Flex alignItems="center">
      <Image src="/favicon.ico" width="32" height="32" alt="logo" />
      <Heading color="white" pl="3">
        <NextLink href="/">phones</NextLink>
      </Heading>
    </Flex>
    <Progress
      bottom="0"
      left="0"
      value={progress}
      width="100%"
      position="absolute"
    />
  </Box>
);
