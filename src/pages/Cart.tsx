import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import SummaryRow from "../components/SummaryRow";
import StatusBar from "../components/StatusBar";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { CartItem as CartItemType, OrderMode } from "../types";
import { getCartItemTotal } from "../utils/price";

interface CartScreenProps {
  items: CartItemType[];
  mode: OrderMode;
  onBack: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
}

export default function CartScreen({
  items,
  mode,
  onBack,
  onCheckout,
  onUpdateQuantity,
  onRemove,
}: CartScreenProps) {
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getCartItemTotal(item.drink, item.options, item.quantity),
    0,
  );

  const fee = mode === "takeaway" ? 0.5 : 0;
  const total = subtotal + fee;

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header
        title="Cart"
        onBack={onBack}
        backButtonStyle={{
          backgroundColor: COLORS.white,
        }}
      />

      {items.length === 0 ? (
        <View
          style={[
            styles.emptyContainer,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <Text style={styles.emptyIcon}>🛒</Text>

          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptyText}>Add a drink from the menu</Text>

          <Button
            title="Back to menu"
            onPress={onBack}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.list,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {items.map((item, index) => {
              const price = getCartItemTotal(
                item.drink,
                item.options,
                item.quantity,
              );

              return (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  price={`€${price.toFixed(2)}`}
                  onUpdateQuantity={(quantity) =>
                    onUpdateQuantity(index, quantity)
                  }
                  onRemove={() => onRemove(index)}
                />
              );
            })}
          </ScrollView>

          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={`€${subtotal.toFixed(2)}`} />

            {fee > 0 && (
              <SummaryRow label="Takeaway" value={`€${fee.toFixed(2)}`} />
            )}

            <SummaryRow label="Total" value={`€${total.toFixed(2)}`} bold />

            <Button
              title="Checkout"
              onPress={onCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.searchBackground,
    gap: dimensions.spacing.md,
  },

  list: {
    paddingBottom: 180,
    gap: dimensions.spacing.md,
  },

  summary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: dimensions.layout.horizontalPadding,
    paddingTop: 12,
    paddingBottom: 24,
  },

  checkoutButton: {
    marginTop: 9,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: dimensions.typography.sectionTitle,
    fontWeight: "600",
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 6,
    fontSize: dimensions.typography.small,
    color: COLORS.muted,
  },

  emptyButton: {
    width: "100%",
    marginTop: 24,
    backgroundColor: COLORS.primary,
  },
});
