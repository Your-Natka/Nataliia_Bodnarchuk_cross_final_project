import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onDecrease}
        style={styles.button}
      >
        <Icon name="minus" size={13} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={styles.value}>
        <Text style={styles.valueText}>{quantity}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onIncrease}
        style={[styles.button, styles.plusButton]}
      >
        <Icon name="plus" size={13} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    width: 26,
    height: 26,
    borderRadius: 5,
    backgroundColor: "#F5F7F5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },

  plusButton: {
    backgroundColor: COLORS.primary,
  },

  value: {
    minWidth: 34,
    height: 26,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D8E0DA",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },

  valueText: {
    color: COLORS.text,
    fontSize: 11,
  },
});
