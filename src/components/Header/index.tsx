import { usePhoneContext } from "components/Provider";
import { useEffect, useState } from "react";

import { HeaderComponent } from "./Header";

function scaleBetween(
  unscaledNum: number,
  minAllowed: number,
  maxAllowed: number,
  min: number,
  max: number
) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

export const Header = () => {
  const { phoneCount, totalPhones } = usePhoneContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressPercent = scaleBetween(phoneCount, 0, 100, 0, totalPhones);
    console.log({ progress, phoneCount });
    setProgress(progressPercent | 0);
  }, [phoneCount]);

  return <HeaderComponent progress={progress} />;
};
