export const dimensions = {
  spacing: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
    xxl: 18,
    xxxl: 20,
  },

  layout: {
    horizontalPadding: 18,
    contentMaxWidth: 430,
    cardGap: 8,
  },

  buttons: {
    primaryHeight: 42,
    icon: 34,
    plus: 28,
    quantity: 26,
  },

  cards: {
    radius: 6,
  },

  images: {
    menuCardHeight: 105,

    popularCard: {
      minWidth: 135,
      maxWidth: 160,
      aspectRatio: 1,
    },

    cartItem: {
      width: 58,
      height: 58,
    },
  },

  statusBar: {
    height: 48,
    paddingHorizontal: 18,
    paddingTop: 13,
  },

  typography: {
    welcomeTitle: 48,
    pageTitle: 40,
    sectionTitle: 19,
    body: 13,
    small: 11,
    extraSmall: 10,
    tiny: 8,
  },
} as const;

export type Dimensions = typeof dimensions;
