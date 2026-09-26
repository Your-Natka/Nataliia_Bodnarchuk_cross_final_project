import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search drinks...",
  onFocus,
  onBlur,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);

    setTimeout(() => {
      onBlur?.();
    }, 150);
  };

  const handleClear = () => {
    onChangeText("");
  };

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
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <Icon name="close" size={18} color={COLORS.muted} />
        </TouchableOpacity>
      )}
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

  clearButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
