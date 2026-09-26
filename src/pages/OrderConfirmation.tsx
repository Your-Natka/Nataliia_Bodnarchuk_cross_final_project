import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";

interface OrderConfirmationScreenProps {
  orderNumber?: string;
  onHome: () => void;
}

export default function OrderConfirmationScreen({
  orderNumber = "1024",
  onHome,
}: OrderConfirmationScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkOuter}>
          <View style={styles.checkInner}>
            <Text style={styles.check}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Order Confirmation!</Text>

        <Text style={styles.description}>
          Your order is being prepared.
          {"\n"}
          We’ll notify you soon.
        </Text>

        <Text style={styles.orderNumber}>Order #{orderNumber}</Text>

        <View style={styles.buttons}>
          <Button title="Place order" onPress={() => {}} />

          <Button title="Back to home" variant="secondary" onPress={onHome} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  checkOuter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 3,
    borderColor: "#557968",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  checkInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#557968",
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    fontSize: 45,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  title: {
    fontSize: 21,
    fontWeight: "500",
    color: "#557968",
    textAlign: "center",
    marginBottom: 9,
  },

  description: {
    fontSize: 11,
    lineHeight: 17,
    color: "#8A9891",
    textAlign: "center",
    marginBottom: 18,
  },

  orderNumber: {
    fontSize: 18,
    fontWeight: "500",
    color: "#557968",
    marginBottom: 30,
  },

  buttons: {
    width: "100%",
    gap: 8,
  },
});
