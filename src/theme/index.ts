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

const appTheme = extendTheme({
  colors: newColorTheme,
  // fontConfig: {
  //   Inter: {
  //     100: {
  //       normal: "Inter_100Thin",
  //     },
  //     200: {
  //       normal: "Inter_200ExtraLight",
  //     },
  //     300: {
  //       normal: "Inter_300Light",
  //     },
  //     400: {
  //       normal: "Inter_400Regular",
  //     },
  //     500: {
  //       normal: "Inter_500Medium",
  //     },
  //     600: {
  //       normal: "Inter_600SemiBold",
  //     },
  //     700: {
  //       normal: "Inter_700Bold",
  //     },
  //     800: {
  //       normal: "Inter_800ExtraBold",
  //     },
  //     900: {
  //       normal: "Inter_900Black",
  //     },
  //   },
  // },
  // fonts: {
  //   heading: "Inter",
  //   body: "Inter",
  //   mono: "Inter",
  // },
});
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
