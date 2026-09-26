import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../constants/colors";

interface CheckoutChoiceProps {
  active: boolean;
  label: string;
  onPress: () => void;
}

export default function CheckoutChoice({
  active,
  label,
  onPress,
}: CheckoutChoiceProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        active ? styles.activeContainer : styles.inactiveContainer,
      ]}
    >
      <View
        style={[
          styles.radioOuter,
          active ? styles.activeRadioOuter : styles.inactiveRadioOuter,
        ]}
      >
        {active && <View style={styles.radioInner} />}
      </View>

      <Text
        style={[
          styles.label,
          active ? styles.activeLabel : styles.inactiveLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  activeContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },

  inactiveContainer: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  radioOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  activeRadioOuter: {
    borderColor: COLORS.primary,
  },

  inactiveRadioOuter: {
    borderColor: COLORS.muted,
  },

  radioInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },

  label: {
    fontSize: 9,
    fontWeight: "400",
  },

  activeLabel: {
    color: COLORS.primary,
  },

  inactiveLabel: {
    color: COLORS.text,
  },
});
