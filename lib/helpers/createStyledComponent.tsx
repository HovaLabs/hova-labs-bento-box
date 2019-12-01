// @flow
import React from "react";
import { Theme } from "../theme";
import { ThemeContext } from "../components/ThemeContext";

type Contexts = {
  theme: Theme;
  //   Dimensions: DimensionsContextType;
};

type Props = {
  [key: string]: any;
};

type StyleObjectFunction = (contexts: Contexts, props: Props) => StyleObject;
type PropsStylesObjectFunction = (
  context: Contexts,
  props: Props
) => PropsStylesObject;
type StyleFunction = (contexts: Contexts, props: Props) => StyleValue;
type StyleValue = string | number | StyleFunction;
type StyleObject = {
  [key: string]: StyleValue;
};
type PropsStylesObject = {
  [key: string]: StyleObject;
};

// For a given style key/value
// If the value is a function - call the function with props as an arg
// Else return the value
//
// In the case of a function, recursively resolve until the value is no longer a function
const resolveStyle = (
  styleValue: StyleValue,
  contexts: Contexts,
  props: any
): StyleValue => {
  if (typeof styleValue === "number" || typeof styleValue === "string") {
    return styleValue;
  }
  return resolveStyle(styleValue(contexts, props), contexts, props);
};

const createStyles = (
  styleInputObject: StyleObject = {},
  contexts: Contexts,
  props: any = {}
) => {
  const styleOutputObject: any = {};
  Object.keys(styleInputObject).forEach((key: string) => {
    const value: StyleValue = styleInputObject[key];
    styleOutputObject[key] = resolveStyle(value, contexts, props);
  });
  return styleOutputObject;
};

// TODO: Add forwardref
export const createStyledComponent = (ComponentInput: any) => (
  styleArg?: StyleObject | StyleObjectFunction,
  propsStylesArg?: PropsStylesObject | PropsStylesObjectFunction
) =>
  React.memo<any>(
    (props: Props = {}): React.ReactElement => {
      const { theme } = React.useContext(ThemeContext);
      const contexts: Contexts = {
        theme
        // Dimensions: React.useContext(DimensionsContext)
      };

      // If either arg is a function, resolve it to an object
      const computedStyleObject: any =
        (typeof styleArg === "function"
          ? styleArg(contexts, props)
          : styleArg) || {};
      const castedComputedStyleObject: StyleObject = computedStyleObject;

      const computedPropsStylesObject: PropsStylesObject =
        (typeof propsStylesArg === "function"
          ? propsStylesArg(contexts, props)
          : propsStylesArg) || {};

      const computedStyle = createStyles(
        castedComputedStyleObject,
        contexts,
        props
      );

      const computedPropsStyles: any = {};
      Object.keys(computedPropsStylesObject).forEach((key: string) => {
        const styleProp = computedPropsStylesObject[key];
        computedPropsStyles[key] = createStyles(styleProp, contexts, props);
      });

      return (
        <ComponentInput
          style={computedStyle}
          {...computedPropsStyles}
          {...props}
        />
      );
    }
  );
