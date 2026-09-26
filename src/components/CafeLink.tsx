import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

interface CafeLinkProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  last?: boolean;
}

export default function CafeLink({
  icon,
  label,
  sublabel,
  last = false,
}: CafeLinkProps) {
  return (
    <View style={[styles.container, !last && styles.withBorder]}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>

        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },

  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconContainer: {
    width: 23,
    height: 23,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "500",
  },

  sublabel: {
    color: COLORS.muted,
    fontSize: 8,
    marginTop: 1,
  },
});
