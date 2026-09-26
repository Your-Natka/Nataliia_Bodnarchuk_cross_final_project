import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Icon, { IconName } from "../components/Icon";
import { COLORS } from "../constants/colors";
import { Screen } from "../types";

interface BurgerMenuScreenProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  onStartOver: () => void;
}

interface MenuItem {
  label: string;
  icon: IconName;
  screen: Screen;
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: "spriteHome",
    screen: "home",
  },
  {
    label: "Menu",
    icon: "spriteMenu",
    screen: "menu",
  },
  {
    label: "My Order",
    icon: "spriteCart",
    screen: "cart",
  },
  {
    label: "Café",
    icon: "spriteCafe",
    screen: "cafe",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    icon: "instagram" as IconName,
    url: "https://www.instagram.com/",
  },
  {
    label: "Facebook",
    icon: "facebook" as IconName,
    url: "https://www.facebook.com/",
  },
  {
    label: "TikTok",
    icon: "tiktok" as IconName,
    url: "https://www.tiktok.com/",
  },
];

export default function BurgerMenuScreen({
  visible,
  onClose,
  onNavigate,
  onStartOver,
}: BurgerMenuScreenProps) {
  const { width } = useWindowDimensions();

  if (!visible) {
    return null;
  }

  const drawerWidth = Math.min(width * 0.74, 310);

  const handleSocialPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch {
      // Ignore link errors.
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.overlayTouchable}
      />

      <View style={[styles.drawer, { width: drawerWidth }]}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>Drinkly</Text>

            <Text style={styles.logoSubtitle}>Café & Bar</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={styles.closeButton}
          >
            <Icon name="close" size={17} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.location}>
          <Text style={styles.locationLabel}>LOCATION</Text>

          <Text style={styles.locationValue}>Coffee Street 12, Łódź</Text>
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.75}
              onPress={() => {
                onNavigate(item.screen);
                onClose();
              }}
              style={styles.menuItem}
            >
              <View style={styles.menuIconBox}>
                <Icon name={item.icon} size={19} color={COLORS.white} />
              </View>

              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Change order type */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              onStartOver();
              onClose();
            }}
            style={styles.changeButton}
          >
            <Icon name="revers" size={17} color={COLORS.primary} />

            <Text style={styles.changeText}>Change order type</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Social links */}
          {socialLinks.map((social) => (
            <SocialItem
              key={social.label}
              label={social.label}
              icon={social.icon}
              onPress={() => handleSocialPress(social.url)}
            />
          ))}
        </View>

        <Text style={styles.footer}>Drinkly · Warszawa · 2026</Text>
      </View>
    </View>
  );
}

function SocialItem({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.socialItem}
    >
      <View style={styles.socialIcon}>
        <Icon name={icon} size={17} color="#D7E0D8" />
      </View>

      <Text style={styles.socialText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    flexDirection: "row",
  },

  overlayTouchable: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  drawer: {
    height: "100%",
    backgroundColor: COLORS.primary,
    paddingTop: 48,
    paddingBottom: 22,
    zIndex: 101,
  },

  logoRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoBlock: {
    flexDirection: "column",
    alignItems: "baseline",
    flexShrink: 1,
  },

  logo: {
    color: COLORS.white,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  logoSubtitle: {
    marginLeft: 7,
    color: "rgba(255,255,255,0.82)",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  location: {
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 18,
    padding: 11,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  locationLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 8,
    marginBottom: 3,
    letterSpacing: 1,
  },

  locationValue: {
    color: COLORS.white,
    fontSize: 10,
  },

  navigation: {
    paddingHorizontal: 9,
    flex: 1,
  },

  menuItem: {
    height: 42,
    borderRadius: 6,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  menuIconBox: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  menuText: {
    marginLeft: 9,
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
  },

  changeButton: {
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 9,
    backgroundColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  changeIcon: {
    width: 24,
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },

  changeText: {
    marginLeft: 9,
    color: COLORS.white,
    fontSize: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 13,
  },

  socialItem: {
    height: 36,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  socialIcon: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  socialText: {
    marginLeft: 9,
    color: "#D7E0D8",
    fontSize: 10,
  },

  footer: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 8,
    textAlign: "center",
  },
});
