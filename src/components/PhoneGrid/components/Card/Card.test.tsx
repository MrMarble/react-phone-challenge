import { Phone } from "@prisma/client";
import { render } from "@testing-library/react";

import { Card } from "./index";

describe("Card component", () => {
  it("renders without crashing", () => {
    const phone: Phone = {
      id: 1,
      name: "iPhone",
      manufacturer: "Apple",
    } as Phone;

    const { getByText } = render(<Card phone={phone} />);

    expect(getByText("iPhone")).toBeInTheDocument();
  });
});
