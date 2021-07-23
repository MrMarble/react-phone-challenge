import {
  createContext,
  Dispatch,
  ReactChild,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Context = {
  phoneCount: number;
  totalPhones: number;
  setPhoneCount: Dispatch<SetStateAction<number>>;
  setTotalPhones: Dispatch<SetStateAction<number>>;
};

const PhoneContext = createContext<Context>({
  phoneCount: 0,
  totalPhones: 0,
  setPhoneCount: () => {},
  setTotalPhones: () => {},
});

export const usePhoneContext = () => useContext(PhoneContext);

export default function PhoneProvider({ children }: { children: ReactChild }) {
  const [phoneCount, setPhoneCount] = useState(0);
  const [totalPhones, setTotalPhones] = useState(0);

  const value = {
    phoneCount,
    totalPhones,
    setPhoneCount,
    setTotalPhones,
  };
  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
}
