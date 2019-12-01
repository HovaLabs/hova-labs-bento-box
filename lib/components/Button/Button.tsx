import React from "react";

import * as S from "./ButtonStyles";

interface ButtonProps {
  /**
   * The content to be rendered inside of the button
   * If present, this prop will override any other content props
   */
  children?: React.ReactNode;
  /**
   * w3 "disabled" property
   */
  disabled?: boolean;
  /**
   * Use button as a url. This will cause the "onClick" handler to be ignored
   */
  href?: string;
  /**
   * Click handler for the button. This will be ignored if href is preset or if disabled
   */
  onClick?: Function;
  /**
   * Set the size of the button
   * @default "l"
   */
  size?: "s" | "m" | "l";
  /**
   * Text to be rendered inside button. This will be ignored if children are present
   */
  title?: string;
  /**
   * w3 button prop type. ("button", "reset", "submit")
   */
  type?: "button" | "reset" | "submit";
  /**
   * Which type of button?
   */
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = ({
  children,
  disabled,
  href,
  variant,
  onClick,
  size,
  title,
  type
}: ButtonProps) => {
  return <S.Button>{children}</S.Button>;
};
