import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CafeLink from "../components/CafeLink";
import Icon from "../components/Icon";
import StatusBar from "../components/StatusBar";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface CafeScreenProps {
  onBack: () => void;
}

export default function CafeScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  return (
    <View style={styles.screen}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="back" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Café</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.imageContainer,
            { marginHorizontal: horizontalPadding },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&h=400&fit=crop&auto=format",
            }}
            style={styles.image}
          />
        </View>

        <View style={[styles.info, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>Drinkly</Text>
            <Text style={styles.logoSubtitle}>Café & Bar</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Opening hours</Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Mon – Fri</Text>
              <Text style={styles.rowValue}>7:00 – 20:00</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Saturday</Text>
              <Text style={styles.rowValue}>8:00 – 21:00</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Sunday</Text>
              <Text style={styles.rowValue}>9:00 – 18:00</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Follow us</Text>

            <CafeLink
              icon={<Icon name="instagram" size={19} color={COLORS.primary} />}
              label="@drinkly.cafe"
            />

            <CafeLink
              icon={<Icon name="facebook" size={19} color={COLORS.primary} />}
              label="Drinkly Café"
            />

            <CafeLink
              icon={<Icon name="tiktok" size={19} color={COLORS.primary} />}
              label="@drinkly"
              last
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    gap: dimensions.spacing.md,
  },

  header: {
    height: 50,
    paddingHorizontal: 14,
    alignItems: "center",
    flexDirection: "row",
  },

  backButton: {
    width: dimensions.buttons.icon,
    height: dimensions.buttons.icon,
    borderRadius: 5,
    backgroundColor: COLORS.warm,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: dimensions.typography.sectionTitle,
    fontWeight: "500",
  },

  headerSpacer: {
    width: dimensions.buttons.icon,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  imageContainer: {
    height: 150,
    borderRadius: dimensions.cards.radius,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  info: {
    paddingTop: 13,
  },

  logoBlock: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 14,
  },

  logo: {
    color: COLORS.primary,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  logoSubtitle: {
    marginLeft: 7,
    color: COLORS.textSecondary,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    padding: 11,
    marginBottom: 9,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "600",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  rowLabel: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.extraSmall,
  },

  rowValue: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.extraSmall,
  },

  homeIndicator: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.text,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.25,
  },
});
