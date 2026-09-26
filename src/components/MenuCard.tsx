import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";
import { Drink } from "../types";

interface MenuCardProps {
  drink: Drink;
  onPress: () => void;
}

export default function MenuCard({ drink, onPress }: MenuCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={
          typeof drink.image === "number" ? drink.image : { uri: drink.image }
        }
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{drink.name}</Text>

        <Text style={styles.price}>${drink.price.toFixed(2)}</Text>
      </View>

      <View style={styles.plus}>
        <Icon name="plus" size={14} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 58,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  image: {
    width: 54,
    height: 54,
    margin: 2,
    borderRadius: 4,
    backgroundColor: "#E2E7E3",
  },

  info: {
    flex: 1,
    paddingHorizontal: 7,
  },

  name: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 3,
  },

  price: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "500",
  },

  plus: {
    width: 27,
    height: 27,
    marginRight: 8,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
