import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export const Header = () => (
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
  >
    <Flex alignItems="center">
      <Image src="/favicon.ico" width="32" height="32" alt="logo" />
      <Heading color="white" pl="3">
        <NextLink href="/">phones</NextLink>
      </Heading>
    </Flex>
  </Box>
);
