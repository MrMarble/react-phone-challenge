import { Badge, Box } from "@chakra-ui/react";
import { Phone } from "@prisma/client";
import Image from "next/image";

export const Card = ({ phone }: { phone: Phone }) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Box minH="200" position="relative">
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
          {phone.screenType} &bull; {phone.ram}
        </Box>
      </Box>

      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {phone.name}
      </Box>

      <Box>{phone.price}</Box>
    </Box>
  </Box>
);
