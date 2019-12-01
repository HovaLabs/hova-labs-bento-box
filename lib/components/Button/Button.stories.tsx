import React from "react";

import { Button } from "./";
import { ThemeContextContainer } from "..";
export default {
  title: "My Button"
};

export const text = () => <Button>Hello Button</Button>;

export const emoji = () => (
  <ThemeContextContainer>
    <Button variant="primary" size="m">
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  </ThemeContextContainer>
);
