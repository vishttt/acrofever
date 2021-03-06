import { Platform } from "react-native";

export const baseFontSize = 15;

export const fonts = {
  pacifico: "Pacifico",
  openSans: {
    regular: "OpenSansRegular",
    italic: "OpenSansItalic",
    bold: "OpenSansBold",
    boldItalic: "OpenSansBoldItalic",
    light: "OpenSansLight",
    lightItalic: "OpenSansLightItalic"
  },
  // Changing these constant names might break NativeBase
  roboto: {
    regular: "Roboto",
    medium: "Roboto_medium"
  },
  ionicons: "IonIcons"
}

export let colors = {
  black: "#0C2238",
  red: "#CF5A28",
  grey: "#2a2c2b",
  white: "#F8E7BF",
  lightgrey: "#e0e1e2",
  mediumgrey: "rgba(0,0,0,.4)"
};

colors = {
  ...colors,

  primaryColor: colors.red,
  secondaryColor: colors.black
};

export const text = {
  fontFamily: "OpenSansRegular",
  color: colors.black,
  fontSize: baseFontSize
};

export const noteText = {
  ...text,
  color: colors.mediumgrey,
  fontSize: 13
};

export const logo = {
  textAlign: "center",
  fontSize: 72,
  fontFamily: fonts.pacifico,
  color: colors.red,
  textShadowOffset: {
    width: 1,
    height: 1
  },
  textShadowColor: colors.black
};

export const button = {
  backgroundColor: colors.grey,
  elevation: 0
};

export const buttonText = {
  ...text,
  fontSize: Platform.OS === "ios" ? baseFontSize * 1.1 : baseFontSize - 1
};

export const buttonPrimary = {
  ...button,
  backgroundColor: colors.primaryColor
};

export const buttonPrimaryText = {
  ...buttonText,
  color: colors.white
};

export const buttonSecondary = {
  ...button,
  backgroundColor: colors.secondaryColor
};

export const buttonSecondaryText = {
  ...buttonText,
  color: colors.white
};
