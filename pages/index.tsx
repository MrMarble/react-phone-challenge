import { Phone } from "@prisma/client";
import { PhoneGrid } from "components/PhoneGrid";
import Head from "next/head";

import { getPhoneCount, getPhones } from "./api/phones";

export async function getServerSideProps() {
  const phones = await getPhones(0, 10);
  const total = await getPhoneCount();
  return {
    props: { phones, total },
  };
}

export default function Home({
  phones: initialPhones,
  total = 0,
}: {
  phones: Array<Phone>;
  total: number;
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
      <PhoneGrid initialPhones={initialPhones} total={total} />
    </>
  );
}
