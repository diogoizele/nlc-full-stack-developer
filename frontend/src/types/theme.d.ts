import "styled-components";
import { theme } from "../styles/theme/default";

declare module "styled-components" {
  type Theme = typeof theme;

  export interface DefaultTheme extends Theme {}

  export type ThemeProps<T = Theme> = ThemedStyledProps<{}, T>;

  export type ThemedStyledProps<P, T> = P & {
    theme: T;
  };
}
