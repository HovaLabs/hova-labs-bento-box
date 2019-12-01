import { createStyledComponent } from "../../helpers";

export const Button = createStyledComponent("button")(c => ({
  alignItems: "center",
  appearance: "none",
  border: 0,
  borderRadius: c.theme.radii.l,
  backgroundColor: c.theme.colors.accentPrimary,
  padding: c.theme.space.l
}));
