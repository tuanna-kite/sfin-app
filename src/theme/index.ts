import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

const newColorTheme = {
  primary: {
    50: "#FFFBF3",
    100: "#FFECCC",
    200: "#FFDDA7",
    300: "#FFCE83",
    400: "#FFBF60",
    500: "#FCB03F",
    600: "#F8A01E",
    700: "#C77F14",
    800: "#925D0B",
    900: "#5C3B05",
  },
};
const appTheme = extendTheme({ colors: newColorTheme });
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
