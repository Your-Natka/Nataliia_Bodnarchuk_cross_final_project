import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";
import QuantityControl from "./QuantityControl";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
  price: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  price,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <View style={styles.card}>
      <Image
        source={
          typeof item.drink.image === "number"
            ? item.drink.image
            : { uri: item.drink.image }
        }
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.top}>
          <Text numberOfLines={1} style={styles.name}>
            {item.drink.name}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRemove}
            style={styles.deleteButton}
          >
            <Icon name="bin" size={15} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.options}>{item.optionLabel}</Text>

        <View style={styles.bottom}>
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(item.quantity - 1)}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
          />

          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 76,
    padding: dimensions.spacing.sm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    flexDirection: "row",
  },

  image: {
    width: dimensions.images.cartItem.width,
    height: dimensions.images.cartItem.height,
    borderRadius: 4,
    backgroundColor: COLORS.quantityBackground,
    marginRight: dimensions.spacing.md,
  },

  content: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 2,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    flex: 1,
    minWidth: 0,
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
  },

  deleteButton: {
    padding: 2,
    marginLeft: 5,
  },

  options: {
    color: COLORS.muted,
    fontSize: dimensions.typography.extraSmall,
    marginTop: 3,
    marginBottom: 5,
  },

  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    color: COLORS.primary,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },
});
