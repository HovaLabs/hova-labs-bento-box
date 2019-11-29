import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Button } from "..";

test("Basic render with children", () => {
  const buttonChildren = "My Button";
  const { getByText } = render(<Button>{buttonChildren}</Button>);

  expect(getByText(buttonChildren)).toBeInTheDocument();
});
