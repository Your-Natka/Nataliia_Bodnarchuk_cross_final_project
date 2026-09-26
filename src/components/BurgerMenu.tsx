import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon, { IconName } from "../components/Icon";

import { COLORS } from "../constants/colors";
import { Screen } from "../types";

interface BurgerMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  onStartOver: () => void;
}

export default function BurgerMenu({
  open,
  onClose,
  onNavigate,
  onStartOver,
}: BurgerMenuProps) {
  if (!open) {
    return null;
  }

  const items: {
    icon: IconName;
    label: string;
    screen: Screen;
  }[] = [
    {
      icon: "spriteHome",
      label: "Home",
      screen: "home",
    },
    {
      icon: "spriteMenu",
      label: "Menu",
      screen: "menu",
    },
    {
      icon: "spriteCart",
      label: "My Order",
      screen: "cart",
    },
    {
      icon: "spriteCafe",
      label: "Café",
      screen: "cafe",
    },
  ];

  const socials: {
    icon: IconName;
    label: string;
  }[] = [
    {
      icon: "instagram",
      label: "Instagram",
    },
    {
      icon: "facebook",
      label: "Facebook",
    },
    {
      icon: "tiktok",
      label: "TikTok",
    },
  ];

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlay}
        onPress={onClose}
      />

      <View style={styles.drawer}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.logo}>Drinkly</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={styles.closeButton}
          >
            <Icon name="revers" size={19} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.location}>
          <Text style={styles.locationTitle}>LOCATION</Text>

          <Text style={styles.locationText}>Coffee Street 12, Łódź</Text>
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.8}
              onPress={() => {
                onNavigate(item.screen);
                onClose();
              }}
              style={styles.navigationItem}
            >
              <View style={styles.navigationIcon}>
                <Icon name={item.icon} size={17} color={COLORS.white} />
              </View>

              <Text style={styles.navigationText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Change order */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onStartOver();
              onClose();
            }}
            style={styles.changeOrder}
          >
            <View style={styles.navigationIcon}>
              <Icon name="revers" size={19} color={COLORS.white} />
            </View>

            <Text style={styles.changeOrderText}>Change order type</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Social links */}
          {socials.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.8}
              style={styles.socialItem}
            >
              <View style={styles.socialIcon}>
                <Icon
                  name={item.icon}
                  size={16}
                  color="rgba(255,255,255,0.72)"
                />
              </View>

              <Text style={styles.socialText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Drinkly · Łódź · 2026</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    flexDirection: "row",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  drawer: {
    width: "74%",
    height: "100%",
    backgroundColor: COLORS.primary,
    paddingBottom: 22,
    zIndex: 101,
  },

  drawerHeader: {
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: COLORS.white,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  closeButton: {
    width: 29,
    height: 29,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  location: {
    marginHorizontal: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 5,
  },

  locationTitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 7,
    marginBottom: 2,
    letterSpacing: 0.8,
  },

  locationText: {
    color: COLORS.white,
    fontSize: 8,
  },

  navigation: {
    flex: 1,
    paddingHorizontal: 9,
  },

  navigationItem: {
    width: "100%",
    height: 37,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    marginBottom: 2,
  },

  navigationIcon: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  navigationText: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 9,
  },

  changeOrder: {
    width: "100%",
    height: 35,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    marginTop: 7,
  },

  changeOrderText: {
    color: COLORS.white,
    fontSize: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 12,
  },

  socialItem: {
    width: "100%",
    height: 31,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  socialIcon: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  socialText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 8,
  },

  footer: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 7,
    textAlign: "center",
  },
});
