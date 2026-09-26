import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../constants/colors";

interface OptionButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function OptionButton({
  label,
  active,
  onPress,
}: OptionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, active && styles.active]}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 58,
    minHeight: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
  },

  active: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },

  text: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
  },

  activeText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
