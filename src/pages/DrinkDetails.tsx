import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { dimensions } from "../constants/dimensions";
import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import OptionButton from "../components/OptionButton";
import QuantityControl from "../components/QuantityControl";
import Icon from "../components/Icon";
import { COLORS } from "../constants/colors";
import { Drink, DrinkOptions } from "../types";
import { getCartItemTotal } from "../utils/price";

interface DrinkDetailsScreenProps {
  drink: Drink;
  onBack: () => void;
  onAddToCart: (drink: Drink, options: DrinkOptions, quantity: number) => void;
}
export default function DrinkDetailsScreen({
  drink,
  onBack,
  onAddToCart,
}: DrinkDetailsScreenProps) {
  const isCoffee =
    drink.category === "Coffee" || drink.category === "Cold Drinks";
  const isTea = drink.category === "Tea";
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [milk, setMilk] = useState<"Regular" | "Oat" | "Almond">("Regular");
  const [sugar, setSugar] = useState(1);
  const [whippedCream, setWhippedCream] = useState(false);
  const [teaType, setTeaType] = useState<"Tea bag" | "Loose leaf">("Tea bag");
  const [lemon, setLemon] = useState(false);
  const [honey, setHoney] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(drink.popular === true);
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;
  const options: DrinkOptions = isCoffee
    ? { size, milk, sugar, whippedCream }
    : isTea
      ? { teaType, sugar, lemon, honey }
      : {};
  const totalPrice = getCartItemTotal(drink, options, quantity);
  return (
    <View style={styles.screen}>
      <StatusBar />
      <Header title="Drink Details" onBack={onBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.imageContainer,
            { marginHorizontal: horizontalPadding },
          ]}
        >
          <Image
            source={
              typeof drink.image === "number"
                ? drink.image
                : { uri: drink.image }
            }
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsFavorite((value) => !value)}
            style={styles.heart}
          >
            <Icon
              name="heart"
              size={18}
              color={COLORS.primary}
              filled={isFavorite}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.info, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.titleRow}>
            <Text style={styles.name}> {drink.name} </Text>
            <Text style={styles.basePrice}>${drink.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}> {drink.description} </Text>
          {isCoffee && (
            <>
              <Text style={styles.label}> Size </Text>
              <View style={styles.optionsRow}>
                {(["Small", "Medium", "Large"] as const).map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    active={size === item}
                    onPress={() => setSize(item)}
                  />
                ))}
              </View>
              <Text style={styles.label}> Milk </Text>
              <View style={styles.optionsRow}>
                {(["Regular", "Oat", "Almond"] as const).map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    active={milk === item}
                    onPress={() => setMilk(item)}
                  />
                ))}
              </View>
              <Text style={styles.label}> Sugar </Text>
              <View style={styles.sugarRow}>
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderFill,
                      { width: `${(sugar / 4) * 100}%` },
                    ]}
                  />
                  {[0, 1, 2, 3, 4].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => setSugar(value)}
                      style={[
                        styles.sugarPoint,
                        { left: `${(value / 4) * 100}%` },
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.sugarValue}> {sugar} </Text>
              </View>
              <Text style={styles.label}> Whipped cream </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setWhippedCream((value) => !value)}
                style={[
                  styles.extraButton,
                  whippedCream && styles.extraButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.extraText,
                    whippedCream && styles.extraTextActive,
                  ]}
                >
                  {whippedCream ? "Added" : "Add"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {isTea && (
            <>
              <Text style={styles.label}> Brewing </Text>
              <View style={styles.optionsRow}>
                {(["Tea bag", "Loose leaf"] as const).map((item) => (
                  <OptionButton
                    key={item}
                    label={item}
                    active={teaType === item}
                    onPress={() => setTeaType(item)}
                  />
                ))}
              </View>
              <Text style={styles.label}> Sugar </Text>
              <View style={styles.sugarRow}>
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderFill,
                      { width: `${(sugar / 4) * 100}%` },
                    ]}
                  />
                  {[0, 1, 2, 3, 4].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => setSugar(value)}
                      style={[
                        styles.sugarPoint,
                        { left: `${(value / 4) * 100}%` },
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.sugarValue}> {sugar} </Text>
              </View>
            </>
          )}
          <View style={styles.quantityRow}>
            <Text style={styles.label}> Quantity </Text>
            <QuantityControl
              quantity={quantity}
              onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
              onIncrease={() => setQuantity((value) => value + 1)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onAddToCart(drink, options, quantity)}
          style={styles.addButton}
        >
          <Text style={styles.addText}> Add to cart </Text>
          <Text style={styles.addPrice}> ${totalPrice.toFixed(2)} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, gap: dimensions.spacing.md },
  content: { paddingBottom: 100 },
  imageContainer: {
    height: 150,
    borderRadius: dimensions.cards.radius,
    overflow: "hidden",
    backgroundColor: COLORS.quantityBackground,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    width: dimensions.buttons.quantity,
    height: dimensions.buttons.quantity,
    borderRadius: dimensions.buttons.quantity / 2,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { paddingHorizontal: 14, paddingTop: 10 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
    minWidth: 0,
    color: COLORS.primary,
    fontSize: dimensions.typography.sectionTitle,
    fontWeight: "500",
  },
  basePrice: {
    color: COLORS.primary,
    fontSize: dimensions.typography.body,
    fontWeight: "600",
    marginLeft: 8,
  },
  description: {
    color: COLORS.muted,
    fontSize: dimensions.typography.extraSmall,
    lineHeight: 14,
    marginTop: 5,
    marginBottom: 14,
  },
  label: {
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
    marginBottom: 7,
  },
  optionsRow: { flexDirection: "row", gap: 7, marginBottom: 13 },
  sugarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 15,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: COLORS.categoryBackground,
    position: "relative",
  },
  sliderFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  sugarPoint: {
    position: "absolute",
    top: -6,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  sugarValue: {
    width: 25,
    color: COLORS.primary,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "600",
    textAlign: "right",
  },
  extraButton: {
    alignSelf: "flex-start",
    minWidth: 70,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  extraButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  extraText: {
    color: COLORS.primary,
    fontSize: dimensions.typography.extraSmall,
  },
  extraTextActive: { color: COLORS.white },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  bottomButton: { position: "absolute", left: 14, right: 14, bottom: 20 },
  addButton: {
    height: dimensions.buttons.primaryHeight,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addText: {
    color: COLORS.white,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
  },
  addPrice: {
    color: COLORS.white,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
  },
});
