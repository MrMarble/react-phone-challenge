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
  filter: string;
  setPhoneCount: Dispatch<SetStateAction<number>>;
  setTotalPhones: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<string>>;
};

const PhoneContext = createContext<Context>({
  filter: "",
  phoneCount: 0,
  totalPhones: 0,
  setPhoneCount: () => {},
  setTotalPhones: () => {},
  setFilter: () => {},
});

export const usePhoneContext = () => useContext(PhoneContext);

export default function PhoneProvider({ children }: { children: ReactChild }) {
  const [phoneCount, setPhoneCount] = useState(0);
  const [totalPhones, setTotalPhones] = useState(0);
  const [filter, setFilter] = useState("");

  const value = {
    phoneCount,
    totalPhones,
    filter,
    setPhoneCount,
    setFilter,
    setTotalPhones,
  };
  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
}
