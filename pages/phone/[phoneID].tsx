import {
  Box,
  Center,
  Flex,
  ListItem,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Phone } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Details() {
  const router = useRouter();
  const { phoneID } = router.query;
  const [phone, setPhone] = useState<Phone>();
  const [loading, setLoading] = useState(true);

  const fetchPhone = async () => {
    const newPhone = await (await axios.get(`/api/phones/${phoneID}`)).data;
    setPhone(newPhone);
    setLoading(false);
  };

  useEffect(() => {
    if (phoneID) {
      fetchPhone();
    }
  }, [phoneID]);

  return (
    <>
      <Head>
        <title>{loading ? "Details" : phone?.name}</title>
      </Head>
      <Center>
        <Box p="6" boxShadow="lg" borderRadius="lg" display="flex" w="100%">
          <Stack direction={["column", "row"]} align="center" justify="center">
            <Box minH="sm" minW="sm" position="relative">
              <SkeletonCircle
                isLoaded={!loading}
                margin="auto"
                transform="auto"
                translateY="50%"
                position="relative"
                size="200"
              />
              {phone && (
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={phone?.imageFileName || "/no_image.svg"}
                  alt={phone?.name}
                />
              )}
            </Box>
            <Box minW="sm">
              <SkeletonText spacing={4} noOfLines={10} isLoaded={!loading} />

              {phone && (
                <UnorderedList>
                  {Object.entries(phone)
                    .filter(([key]) => !["id", "imageFileName"].includes(key))
                    .map(([key, value]) => (
                      <ListItem key={key}>
                        <Text as="b" textTransform="capitalize">
                          {key}:&nbsp;
                        </Text>
                        {value}
                      </ListItem>
                    ))}
                </UnorderedList>
              )}
            </Box>
          </Stack>
        </Box>
      </Center>
    </>
  );
}
