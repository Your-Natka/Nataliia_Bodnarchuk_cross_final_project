import React from "react";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TabNavigator from "./TabNavigator";
import CafeScreen from "../pages/Cafe";
import Icon, { IconName } from "../components/Icon";
import { COLORS } from "../constants/colors";
import { DrawerParamList } from "./navigationTypes";

const Drawer = createDrawerNavigator<DrawerParamList>();

interface MenuItem {
  label: string;
  icon: IconName;
  screen: "MainTabs" | "Cafe";
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: "spriteHome",
    screen: "MainTabs",
  },
  {
    label: "Menu",
    icon: "spriteMenu",
    screen: "MainTabs",
  },
  {
    label: "My Order",
    icon: "spriteCart",
    screen: "MainTabs",
  },
  {
    label: "Café",
    icon: "spriteCafe",
    screen: "Cafe",
  },
];

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.28)",
        drawerStyle: {
          width: "74%",
          maxWidth: 310,
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
      <Drawer.Screen name="Cafe" component={CafeScreen} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const handleMainTabNavigation = (screen: "Home" | "Menu" | "Cart") => {
    navigation.navigate("MainTabs", {
      screen,
    });

    navigation.closeDrawer();
  };

  const handleNavigation = (item: MenuItem) => {
    if (item.screen === "Cafe") {
      navigation.navigate("Cafe");
      navigation.closeDrawer();
      return;
    }

    if (item.label === "Home") {
      handleMainTabNavigation("Home");
      return;
    }

    if (item.label === "Menu") {
      handleMainTabNavigation("Menu");
      return;
    }

    if (item.label === "My Order") {
      handleMainTabNavigation("Cart");
    }
  };

  return (
    <View style={styles.drawer}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>Drinkly</Text>

            <Text style={styles.logoSubtitle}>Café & Bar</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.closeDrawer()}
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
              onPress={() => handleNavigation(item)}
              style={styles.menuItem}
            >
              <View style={styles.menuIconBox}>
                <Icon name={item.icon} size={19} color={COLORS.white} />
              </View>

              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.divider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              navigation.closeDrawer();
              navigation.getParent()?.navigate("Welcome");
            }}
            style={styles.changeButton}
          >
            <Icon name="revers" size={17} color={COLORS.primary} />

            <Text style={styles.changeText}>Change order type</Text>
          </TouchableOpacity>

          <View style={styles.socialSection}>
            <SocialItem
              label="Instagram"
              icon="instagram"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/");
              }}
            />

            <SocialItem
              label="Facebook"
              icon="facebook"
              onPress={() => {
                Linking.openURL("https://www.facebook.com/");
              }}
            />

            <SocialItem
              label="TikTok"
              icon="tiktok"
              onPress={() => {
                Linking.openURL("https://www.tiktok.com/");
              }}
            />
          </View>
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
  drawer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: 48,
    paddingBottom: 22,
  },

  /*
   * The inner content is slightly narrower than the drawer
   * and centered. This keeps the menu visually balanced
   * on both narrow and wide screens.
   */
  content: {
    width: "100%",
    maxWidth: 290,
    alignSelf: "center",
    flex: 1,
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
    marginTop: -5,
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

  socialSection: {
    marginTop: 4,
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
