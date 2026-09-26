import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { ApiCoffee } from "../api/coffeeApi";

interface ApiCoffeeCardProps {
  coffee: ApiCoffee;
  onPress: () => void;
}

export default function ApiCoffeeCard({ coffee, onPress }: ApiCoffeeCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Text style={styles.title}>{coffee.title}</Text>

      <Text style={styles.description} numberOfLines={2}>
        {coffee.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    backgroundColor: COLORS.white,
  },

  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  description: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 17,
  },
});
