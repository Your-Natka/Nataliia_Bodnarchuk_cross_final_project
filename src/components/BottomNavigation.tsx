import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { dimensions } from "../constants/dimensions";
import Icon, { IconName } from "./Icon";
import { COLORS } from "../constants/colors";
import { Screen } from "../types";
import { useTheme } from "../context/ThemeContext";

interface BottomNavigationProps {
  activeScreen: Screen;
  cartCount: number;
  onNavigate: (screen: Screen) => void;
}

interface NavigationItem {
  screen: Screen;
  label: string;
  icon: IconName;
}

const items: NavigationItem[] = [
  {
    screen: "home",
    label: "Home",
    icon: "spriteHome",
  },
  {
    screen: "menu",
    label: "Menu",
    icon: "spriteMenu",
  },
  {
    screen: "cafe",
    label: "Cafe",
    icon: "spriteCafe",
  },
  {
    screen: "cart",
    label: "Cart",
    icon: "spriteCart",
  },
];

export default function BottomNavigation({
  activeScreen,
  cartCount,
  onNavigate,
}: BottomNavigationProps) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const horizontalPadding = width <= 340 ? 6 : 12;

  const navigationBackground = isDark
    ? COLORS.darkBottomNavigation
    : COLORS.white;
  const inactiveColor = isDark ? COLORS.darkInactive : "#B7C8BC";
  const borderColor = isDark ? COLORS.darkBorder : "#EEF0ED";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: navigationBackground,
          borderTopColor: borderColor,
        },
      ]}
    >
      <View
        style={[styles.navigation, { paddingHorizontal: horizontalPadding }]}
      >
        {items.map((item) => {
          const active = activeScreen === item.screen;

          return (
            <TouchableOpacity
              key={item.screen}
              activeOpacity={0.8}
              onPress={() => onNavigate(item.screen)}
              style={styles.item}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name={item.icon}
                  size={22}
                  color={active ? COLORS.primary : inactiveColor}
                />

                {item.screen === "cart" && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.label,
                  { color: inactiveColor },
                  active && styles.activeLabel,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    borderTopWidth: 1,
  },

  navigation: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  iconWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 28,
    marginBottom: 3,
  },

  label: {
    fontSize: 10,
    fontWeight: "500",
  },

  activeLabel: {
    color: COLORS.primary,
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center",
  },
});
