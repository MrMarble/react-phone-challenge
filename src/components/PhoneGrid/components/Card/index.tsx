import { Badge, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Phone } from "@prisma/client";
import Image from "next/image";
import NextLink from "next/link";
export const Card = ({ phone }: { phone: Phone }) => (
  <LinkBox as="article">
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ boxShadow: "teal 0px 0px 11px -3px" }}
    >
      <Box minH="200" position="relative" overflow="hidden">
        <Image
          objectFit="cover"
          layout="fill"
          src={phone.imageFileName || "/no_image.svg"}
          alt={`${phone.manufacturer} ${phone.name}`}
        />
      </Box>

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {phone.manufacturer}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {phone.ram}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <NextLink href={`/phone/${phone.id}`} passHref>
            <LinkOverlay>{phone.name}</LinkOverlay>
          </NextLink>
        </Box>

        <Box>{phone.price ? `${phone.price} €` : "--"}</Box>
      </Box>
    </Box>
  </LinkBox>
);
