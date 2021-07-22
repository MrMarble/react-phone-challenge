import { Phone } from "@prisma/client";
import { PhoneGrid } from "components/PhoneGrid";
import Head from "next/head";

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
      <PhoneGrid initialPhones={initialPhones} />
    </>
  );
}
