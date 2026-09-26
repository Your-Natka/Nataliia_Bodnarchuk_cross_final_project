import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import StatusBar from "../components/StatusBar";
import { FONT_SIZES } from "../constants/typography";
import { COLORS } from "../constants/colors";
import { OrderMode } from "../types";

interface WelcomeScreenProps {
  onChoose: (mode: OrderMode) => void;
}

export default function WelcomeScreen({ onChoose }: WelcomeScreenProps) {
  const { width } = useWindowDimensions();

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const horizontalMargin = 10;
  const heroWidth = width - horizontalMargin * 2;

  return (
    <View style={styles.screen}>
      <StatusBar />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleTheme}
        style={[
          styles.themeButton,
          {
            backgroundColor: isDark
              ? COLORS.darkButton
              : COLORS.optionBackground,
          },
        ]}
      >
        <Text
          style={{
            color: isDark ? COLORS.darkText : COLORS.primary,
            fontSize: FONT_SIZES.sectionTitle,
          }}
        >
          {isDark ? "☀" : "☾"}
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.heroContainer,
          {
            width: heroWidth,
            height: heroWidth * 1.5,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/Welcome.png")}
          style={styles.hero}
          resizeMode="cover"
        />

        {/* Тільки Welcome to — на картинці */}
        <Text style={styles.welcome}>Welcome to</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleBlock}>
          <Text style={styles.logo}>Drinkly</Text>
          <Text style={styles.subtitle}>Café & Bar</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChoose("dine-in")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Dine in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChoose("takeaway")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Take away</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  heroContainer: {
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 7,
  },

  hero: {
    width: "100%",
    height: "100%",
  },

  themeButton: {
    position: "absolute",
    top: 42,
    right: 20,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  welcome: {
    position: "absolute",
    bottom: 22,
    left: 0,
    right: 0,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 48,
    lineHeight: 54,
    fontWeight: "400",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },

  titleBlock: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    color: COLORS.primary,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    marginTop: 2,
  },

  buttons: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    marginTop: "auto",
  },

  button: {
    flex: 1,
    height: 64,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "500",
  },
});
