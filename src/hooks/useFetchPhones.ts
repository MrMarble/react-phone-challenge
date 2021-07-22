import { Phone } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

export default function useFetchPhones({
  firstPage = 0,
  initialPhones = [],
}: {
  firstPage: number;
  initialPhones: Array<Phone>;
}) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(firstPage);
  const [phones, setPhones] = useState<Array<Phone>>(initialPhones);

  const fetch = async () => {
    setLoading(true);

    const { phones: newPhones } = await (
      await axios.get(`/api/phones?page=${page}`)
    ).data;

    setPhones([...phones, ...newPhones]);
    setLoading(false);
    setPage(page + 1);
  };

  return { loading, phones, fetch };
}
