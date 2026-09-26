import React, { useState } from "react";
import { StyleSheet, TextInput, View, useWindowDimensions } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search drinks...",
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  return (
    <View
      style={[
        styles.container,
        {
          marginHorizontal: horizontalPadding,
        },
        focused && styles.containerFocused,
      ]}
    >
      <Icon
        name="search"
        size={20}
        color={focused ? COLORS.primary : COLORS.muted}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputPlaceholder}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    marginBottom: 14,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.searchBorder,
    backgroundColor: COLORS.searchBackground,
    flexDirection: "row",
    alignItems: "center",
  },

  containerFocused: {
    borderColor: COLORS.primary,
  },

  input: {
    flex: 1,
    minWidth: 0,
    color: COLORS.text,
    fontSize: 12,
    paddingVertical: 0,
    marginLeft: 12,
  },
});
