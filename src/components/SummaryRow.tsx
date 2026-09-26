import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

interface SummaryRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

export default function SummaryRow({
  label,
  value,
  bold = false,
}: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, bold && styles.boldLabel]}>{label}</Text>

      <Text style={[styles.value, bold && styles.boldValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    color: COLORS.muted,
    fontSize: 9,
  },

  value: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "500",
  },

  boldLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "600",
  },

  boldValue: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },
});
