import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Button from "../components/Button";
import { PaymentMethod } from "../types";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface PaymentMethodScreenProps {
  selectedMethod?: PaymentMethod;
  onBack: () => void;
  onContinue: (method: PaymentMethod) => void;
}

export default function PaymentMethodScreen({
  selectedMethod = "card",
  onBack,
  onContinue,
}: PaymentMethodScreenProps) {
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;
  const [method, setMethod] = useState<PaymentMethod>(selectedMethod);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Payment method</Text>

        <View style={styles.spacer} />
      </View>

      <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.description}>
          Choose how you would like to pay for your order.
        </Text>

        <PaymentOption
          title="Card"
          description="Pay by debit or credit card"
          active={method === "card"}
          icon="💳"
          onPress={() => setMethod("card")}
        />

        <PaymentOption
          title="Cash"
          description="Pay at the café"
          active={method === "cash"}
          icon="💵"
          onPress={() => setMethod("cash")}
        />
      </View>

      <View style={styles.bottom}>
        <Button title="Continue" onPress={() => onContinue(method)} />
      </View>
    </View>
  );
}

function PaymentOption({
  title,
  description,
  active,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  active: boolean;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.option, active && styles.optionActive]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{title}</Text>

        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <View style={[styles.radio, active && styles.radioActive]}>
        {active && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    height: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: dimensions.buttons.icon,
    height: dimensions.buttons.icon,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 28,
    color: COLORS.primary,
  },

  title: {
    fontSize: dimensions.typography.sectionTitle,
    color: COLORS.primary,
    fontWeight: "500",
  },

  spacer: {
    width: dimensions.buttons.icon,
  },

  content: {
    paddingTop: 10,
  },

  description: {
    fontSize: dimensions.typography.small,
    color: COLORS.muted,
    marginBottom: 18,
  },

  option: {
    minHeight: 76,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
  },

  optionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 6,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 21,
  },

  optionText: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },

  optionTitle: {
    fontSize: dimensions.typography.small,
    fontWeight: "600",
    color: COLORS.text,
  },

  optionDescription: {
    marginTop: 3,
    fontSize: dimensions.typography.extraSmall,
    color: COLORS.muted,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.muted,
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  bottom: {
    marginTop: "auto",
    padding: 18,
    paddingBottom: 24,
  },
});
