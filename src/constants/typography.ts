import { Platform } from "react-native";

export const FONTS = {
  display: Platform.select({
    ios: "serif",
    android: "serif",
    default: "serif",
  }),

  body: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "sans-serif",
  }),

  serif: Platform.select({
    ios: "serif",
    android: "serif",
    default: "serif",
  }),

  mono: Platform.select({
    ios: "monospace",
    android: "monospace",
    default: "monospace",
  }),
} as const;

export const FONT_SIZES = {
  welcomeTitle: 48,
  pageTitle: 40,
  sectionTitle: 19,
  body: 13,
  small: 11,
  extraSmall: 10,
  tiny: 8,
} as const;

export type Fonts = typeof FONTS;
export type FontSizes = typeof FONT_SIZES;
