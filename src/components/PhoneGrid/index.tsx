import type { Phone } from "@prisma/client";
import useFetchPhones from "hooks/useFetchPhones";
import useNearScreen from "hooks/useNearScreen";
import { useEffect } from "react";

import { PhoneGridComponent } from "./PhoneGrid";

export const PhoneGrid = ({
  initialPhones,
}: {
  initialPhones: Array<Phone>;
}) => {
  const { loading, phones, fetch } = useFetchPhones({
    firstPage: 1,
    initialPhones,
  });
  const { isNearScreen, fromRef } = useNearScreen<HTMLDivElement>({
    distance: "600px",
  });

  useEffect(() => {
    if (isNearScreen) {
      fetch();
    }
  }, [isNearScreen]);

  return (
    <PhoneGridComponent phones={phones} loading={loading} fromRef={fromRef} />
  );
};
