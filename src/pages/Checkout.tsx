import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Button from "../components/Button";
import Header from "../components/Header";
import Icon from "../components/Icon";
import StatusBar from "../components/StatusBar";

import { dimensions } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { CartItem, OrderMode, PaymentMethod } from "../types";
import { getCartItemTotal } from "../utils/price";

interface CheckoutScreenProps {
  items: CartItem[];
  mode: OrderMode;
  onBack: () => void;
  onChangeOrderMode: (mode: OrderMode) => void;
  onConfirm: (paymentMethod: PaymentMethod) => void;
}

export default function CheckoutScreen({
  items,
  mode,
  onBack,
  onChangeOrderMode,
  onConfirm,
}: CheckoutScreenProps) {
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getCartItemTotal(item.drink, item.options, item.quantity),
    0,
  );

  const takeawayFee = mode === "takeaway" ? 0.5 : 0;

  const total = subtotal + takeawayFee;

  const handleChangeOrderMode = () => {
    onChangeOrderMode(mode === "dine-in" ? "takeaway" : "dine-in");
  };

  return (
    <View style={styles.screen}>
      <StatusBar />

      <Header
        title="Checkout"
        onBack={onBack}
        backButtonStyle={{
          backgroundColor: COLORS.white,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        {/* PICKUP LOCATION */}

        <Text style={styles.sectionTitle}>Pickup location</Text>

        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Icon name="coffee" size={19} color={COLORS.primary} />
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Coffee Street 12</Text>

            <Text style={styles.locationText}>Drinkly Café · Łódź</Text>
          </View>
        </View>

        {/* ORDER TYPE */}

        <Text style={styles.sectionTitle}>Order type</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleChangeOrderMode}
          style={styles.orderTypeCard}
        >
          <View style={styles.orderTypeLeft}>
            <View style={styles.radio}>
              <View style={styles.radioInner} />
            </View>

            <Text style={styles.orderTypeText}>
              {mode === "dine-in" ? "Dine in" : "Takeaway"}
            </Text>
          </View>

          <View style={styles.changeMode}>
            <Icon name="revers" size={17} color={COLORS.primaryMid} />

            <Text style={styles.changeText}>Change</Text>
          </View>
        </TouchableOpacity>

        {/* YOUR ORDER */}

        <Text style={styles.sectionTitle}>Your order</Text>

        <View style={styles.orderCard}>
          {items.map((item, index) => {
            const itemTotal = getCartItemTotal(
              item.drink,
              item.options,
              item.quantity,
            );

            return (
              <OrderItem
                key={item.id}
                item={item}
                total={itemTotal}
                isLast={index === items.length - 1}
              />
            );
          })}
        </View>

        {/* PAYMENT */}

        <Text style={styles.sectionTitle}>Payment method</Text>

        <View style={styles.paymentRow}>
          <PaymentButton
            label="Card"
            active={paymentMethod === "card"}
            onPress={() => setPaymentMethod("card")}
          />

          <PaymentButton
            label="Cash"
            active={paymentMethod === "cash"}
            onPress={() => setPaymentMethod("cash")}
          />
        </View>

        {/* PRICE SUMMARY */}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>

            <Text style={styles.summaryValue}>€{subtotal.toFixed(2)}</Text>
          </View>

          {takeawayFee > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Takeaway fee</Text>

              <Text style={styles.summaryValue}>€{takeawayFee.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* PLACE ORDER */}

      <View style={styles.bottom}>
        <Button title="Place order" onPress={() => onConfirm(paymentMethod)} />
      </View>
    </View>
  );
}

/* ================================================== */
/* ORDER ITEM */
/* ================================================== */

function OrderItem({
  item,
  total,
  isLast,
}: {
  item: CartItem;
  total: number;
  isLast: boolean;
}) {
  return (
    <View style={[styles.orderItem, isLast && styles.orderItemLast]}>
      <Image
        source={
          typeof item.drink.image === "number"
            ? item.drink.image
            : { uri: item.drink.image }
        }
        style={styles.orderImage}
      />

      <View style={styles.orderInfo}>
        <View style={styles.orderTop}>
          <Text numberOfLines={1} style={styles.orderName}>
            {item.drink.name}
          </Text>

          <Text style={styles.orderPrice}>€{total.toFixed(2)}</Text>
        </View>

        <Text numberOfLines={2} style={styles.orderOptions}>
          {item.optionLabel}
        </Text>

        <Text style={styles.orderQuantity}>Quantity · {item.quantity}</Text>
      </View>
    </View>
  );
}

/* ================================================== */
/* PAYMENT BUTTON */
/* ================================================== */

function PaymentButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.paymentButton, active && styles.paymentButtonActive]}
    >
      <View style={[styles.paymentRadio, active && styles.paymentRadioActive]}>
        {active && <View style={styles.paymentRadioInner} />}
      </View>

      <Text style={[styles.paymentText, active && styles.paymentTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ================================================== */
/* STYLES */
/* ================================================== */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.searchBackground,
    gap: dimensions.spacing.md,
  },

  content: {
    paddingBottom: 115,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 8,
    color: COLORS.text,
    fontSize: dimensions.typography.body,
    fontWeight: "600",
  },

  /* LOCATION */

  locationCard: {
    minHeight: 64,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: dimensions.cards.radius,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  locationInfo: {
    flex: 1,
    minWidth: 0,
  },

  locationTitle: {
    marginTop: 3,
    color: COLORS.muted,
    fontSize: dimensions.typography.extraSmall,
  },

  locationText: {
    marginTop: 3,
    color: COLORS.muted,
    fontSize: dimensions.typography.extraSmall,
  },

  /* ORDER TYPE */

  orderTypeCard: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  orderTypeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  radio: {
    width: 14,
    height: 14,
    borderRadius: dimensions.cards.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  orderTypeText: {
    color: COLORS.primary,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },

  changeMode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  changeText: {
    color: COLORS.primary,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "500",
  },

  paymentRadio: {
    width: 14,
    height: 14,
    borderRadius: dimensions.cards.radius,
    borderWidth: 1,
    borderColor: COLORS.muted,
    alignItems: "center",
    justifyContent: "center",
  },

  paymentRadioActive: {
    borderColor: COLORS.primary,
  },

  paymentRadioInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  /* ORDER */

  orderCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    paddingHorizontal: 10,
  },

  orderItem: {
    minHeight: 76,
    paddingVertical: 9,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.searchBorder,
  },

  orderItemLast: {
    borderBottomWidth: 0,
  },

  orderImage: {
    width: dimensions.images.cartItem.width,
    height: dimensions.images.cartItem.height,
    borderRadius: 5,
    backgroundColor: COLORS.quantityBackground,
    marginRight: 9,
  },

  orderInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },

  orderTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  orderName: {
    flex: 1,
    marginRight: 8,
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },

  orderPrice: {
    color: COLORS.primary,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },

  orderOptions: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: dimensions.typography.extraSmall,
    lineHeight: 12,
  },

  orderQuantity: {
    marginTop: 3,
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.extraSmall,
  },

  /* PAYMENT */

  paymentRow: {
    flexDirection: "row",
    gap: 8,
  },

  paymentButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  paymentButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },

  paymentText: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.extraSmall,
  },

  paymentTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  /* SUMMARY */

  summary: {
    marginTop: 16,
    paddingHorizontal: 2,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.extraSmall,
  },

  summaryValue: {
    color: COLORS.text,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: dimensions.typography.small,
    fontWeight: "700",
  },

  /* BOTTOM */

  bottom: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 20,
  },
});
