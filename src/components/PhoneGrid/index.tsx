import type { Phone } from "@prisma/client";
import { usePhoneContext } from "components/Provider";
import useFetchPhones from "hooks/useFetchPhones";
import useNearScreen from "hooks/useNearScreen";
import { useEffect } from "react";

import { PhoneGridComponent } from "./PhoneGrid";

export const PhoneGrid = ({
  initialPhones,
  total,
}: {
  initialPhones: Array<Phone>;
  total: number;
}) => {
  const { setPhoneCount, setTotalPhones } = usePhoneContext();

  const { loading, phones, fetch } = useFetchPhones({
    firstPage: 1,
    initialPhones,
  });
  const { isNearScreen, fromRef } = useNearScreen<HTMLDivElement>({
    distance: "600px",
  });

  useEffect(() => {
    if (total) {
      setPhoneCount(phones.length);
      setTotalPhones(total);
    }
  }, [total, phones]);

  useEffect(() => {
    if (isNearScreen) {
      fetch();
    }
  }, [isNearScreen]);

  return (
    <PhoneGridComponent phones={phones} loading={loading} fromRef={fromRef} />
  );
};
