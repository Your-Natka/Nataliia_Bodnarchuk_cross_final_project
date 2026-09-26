import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

interface StatusBarProps {
  light?: boolean;
}

export default function StatusBar({ light = false }: StatusBarProps) {
  const color = light ? "rgba(255,255,255,0.9)" : COLORS.text;

  return (
    <View style={styles.container}>
      <Text style={[styles.time, { color }]}>9:41</Text>

      <View style={styles.right}>
        <Text style={[styles.icon, { color }]}>▮▮▮</Text>

        <Text style={[styles.icon, { color }]}>◔</Text>

        <View style={[styles.battery, { borderColor: color }]}>
          <View style={[styles.batteryFill, { backgroundColor: color }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexShrink: 0,
  },

  time: {
    fontSize: 10,
    fontWeight: "700",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 8,
    marginLeft: 6,
  },

  battery: {
    width: 23,
    height: 11,
    borderWidth: 1.2,
    borderRadius: 3,
    padding: 2,
    justifyContent: "center",
    marginLeft: 6,
  },

  batteryFill: {
    width: "75%",
    height: "100%",
    borderRadius: 1,
  },
});
