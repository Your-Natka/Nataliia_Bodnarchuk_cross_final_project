import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

import { COLORS } from "../constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: 13,
    fontWeight: "500",
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryText: {
    color: COLORS.primary,
  },
});
