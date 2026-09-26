export const COLORS = {
  // Light theme
  bg: "#FFFFFF",
  bgWelcome: "#F7F7F4",
  surface: "#FFFFFF",
  card: "#FFFFFF",

  border: "#B9C9C0",

  primary: "#557968",
  primaryDark: "#496B5B",
  primaryMid: "#8FAE9D",

  accent: "#B8C9BF",
  primaryLight: "#E5ECE7",

  muted: "#8FA098",
  warm: "#F7F7F4",

  text: "#3F5F51",
  textSecondary: "#61766C",
  textMuted: "#899790",

  searchBackground: "#F8F8F6",
  searchBorder: "#EEF0ED",

  categoryBackground: "#DCE5DF",
  inputPlaceholder: "#A0AAA5",

  quantityBackground: "#F5F7F5",
  quantityBorder: "#D8E0DA",

  optionBackground: "#F7F8F6",
  rangeBackground: "#DCE5DF",

  white: "#FFFFFF",
  black: "#000000",

  homeIndicator: "rgba(65, 91, 80, 0.3)",

  // Dark theme
  darkBg: "#1A211F",
  darkSurface: "#202A26",
  darkCard: "#26332F",
  darkBorder: "#3A4842",

  darkText: "#E5ECE7",
  darkTextSecondary: "#B8C9BF",
  darkTextMuted: "#8FA098",

  darkButton: "#26332F",
  darkButtonBorder: "#3A4842",

  darkInactive: "#718279",
  darkBottomNavigation: "#1A211F",
} as const;

export type Colors = typeof COLORS;
