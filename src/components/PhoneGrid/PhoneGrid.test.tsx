import { Phone } from "@prisma/client";
import { render } from "@testing-library/react";
import { createRef } from "react";

import { PhoneGridComponent } from "./PhoneGrid";

describe("PhoneGrid component", () => {
  const PHONE = {
    id: 1,
    name: "iPhone",
    manufacturer: "Apple",
    price: 200,
    screenSize: "4.7",
    color: "Black",
    ram: "32GB",
    description: "",
    imageFileName: "",
    processor: "",
    screenType: "",
  };
  const PHONES: Array<Phone> = [PHONE, { ...PHONE, id: 2, name: "Nexus" }];
  const REF = createRef<HTMLDivElement>();

  it("renders without crashing", () => {
    const { getByText } = render(
      <PhoneGridComponent phones={PHONES} loading={false} fromRef={REF} />
    );

    expect(getByText("iPhone")).toBeInTheDocument();
  });
  describe("when loading", () => {
    it("shows loader", () => {
      const { getByTestId } = render(
        <PhoneGridComponent phones={PHONES} loading fromRef={REF} />
      );

      expect(getByTestId("spinner")).toBeInTheDocument();
    });
  });
  describe("when not loading", () => {
    it("loader is not shown", () => {
      const { queryByTestId } = render(
        <PhoneGridComponent phones={PHONES} loading={false} fromRef={REF} />
      );

      expect(queryByTestId("spinner")).toBeNull();
    });
  });
});
