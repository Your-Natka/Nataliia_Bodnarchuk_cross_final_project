import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

import Icon from "./Icon";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  backButtonStyle?: StyleProp<ViewStyle>;
  onCart?: () => void;
  cartCount?: number;
  showCart?: boolean;
  isLogo?: boolean;
}

export default function Header({
  title,
  onBack,
  backButtonStyle,
  onCart,
  cartCount = 0,
  showCart = false,
  isLogo = false,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const { theme, toggleTheme } = useTheme();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const isDark = theme === "dark";

  const textColor = isDark ? COLORS.darkText : COLORS.primary;

  const buttonBackground = COLORS.optionBackground;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: horizontalPadding,
          backgroundColor: isDark ? COLORS.darkBg : "transparent",
        },
      ]}
    >
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBack}
            style={[
              styles.sideButton,
              { backgroundColor: buttonBackground },
              backButtonStyle,
            ]}
          >
            <Icon name="back" size={20} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[isLogo ? styles.logo : styles.title, { color: textColor }]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.right}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleTheme}
          style={[styles.sideButton, { backgroundColor: buttonBackground }]}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 16,
            }}
          >
            {isDark ? "☀" : "☾"}
          </Text>
        </TouchableOpacity>

        {showCart && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCart}
            style={[styles.sideButton, { backgroundColor: buttonBackground }]}
          >
            <Icon name="cart" size={20} color={textColor} />

            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    width: dimensions.buttons.icon,
    alignItems: "flex-start",
  },

  right: {
    width: dimensions.buttons.icon,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sideButton: {
    width: dimensions.buttons.icon,
    height: dimensions.buttons.icon,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    flex: 1,
    minWidth: 0,
    textAlign: "center",
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  title: {
    flex: 1,
    minWidth: 0,
    textAlign: "center",
    fontSize: dimensions.typography.sectionTitle,
    fontWeight: "500",
    lineHeight: 24,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: dimensions.typography.tiny,
    fontWeight: "700",
    textAlign: "center",
  },
});
