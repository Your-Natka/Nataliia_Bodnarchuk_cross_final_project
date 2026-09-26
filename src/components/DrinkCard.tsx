import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { Drink } from "../types";

interface DrinkCardProps {
  drink: Drink;
  onPress: (drink: Drink) => void;
  variant?: "horizontal" | "popular";
  isFavorite?: boolean;
  onToggleFavorite?: (drinkId: string) => void;
}

function DrinkCard({
  drink,
  onPress,
  variant = "horizontal",
  isFavorite = false,
  onToggleFavorite,
}: DrinkCardProps) {
  const { width } = useWindowDimensions();

  const favoriteScale = useSharedValue(1);

  useEffect(() => {
    favoriteScale.value = withSpring(isFavorite ? 1.25 : 1, {
      damping: 10,
      stiffness: 300,
    });
  }, [isFavorite, favoriteScale]);

  const animatedFavoriteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const popularWidth = Math.min(
    dimensions.images.popularCard.maxWidth,
    Math.max(
      dimensions.images.popularCard.minWidth,
      (width - horizontalPadding * 2) * 0.42,
    ),
  );

  const imageSource =
    typeof drink.image === "number" ? drink.image : { uri: drink.image };

  if (variant === "popular") {
    return (
      <View style={[styles.popularCard, { width: popularWidth }]}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(drink)}>
          <Image source={imageSource} style={styles.popularImage} />

          <View style={styles.popularInfo}>
            <View style={styles.popularText}>
              <Text numberOfLines={1} style={styles.popularName}>
                {drink.name}
              </Text>

              <Text style={styles.popularPrice}>${drink.price.toFixed(2)}</Text>
            </View>

            <View style={styles.popularPlus}>
              <Icon name="plus" size={13} color={COLORS.white} />
            </View>
          </View>
        </TouchableOpacity>

        {onToggleFavorite && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onToggleFavorite(drink.id);
            }}
            style={styles.favoriteButton}
          >
            <Animated.Text style={[styles.favoriteText, animatedFavoriteStyle]}>
              {isFavorite ? "♥" : "♡"}
            </Animated.Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(drink)}
      style={styles.card}
    >
      <Image source={imageSource} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {drink.name}
        </Text>

        <Text style={styles.price}>${drink.price.toFixed(2)}</Text>
      </View>

      <View style={styles.plus}>
        <Icon name="plus" size={14} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(DrinkCard);

const styles = StyleSheet.create({
  /*
   * REGULAR DRINK CARD
   */

  card: {
    minHeight: 64,
    padding: dimensions.spacing.sm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 54,
    height: 54,
    borderRadius: 4,
    backgroundColor: "#E2E7E3",
    marginRight: 9,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
    marginBottom: 4,
  },

  price: {
    color: COLORS.primary,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "500",
  },

  plus: {
    width: dimensions.buttons.plus,
    height: dimensions.buttons.plus,
    borderRadius: dimensions.buttons.plus / 2,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * POPULAR CARD
   */

  popularCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  popularImage: {
    width: "100%",
    aspectRatio: dimensions.images.popularCard.aspectRatio,
    backgroundColor: "#E2E7E3",
  },

  popularInfo: {
    minHeight: 54,
    paddingHorizontal: 9,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  popularText: {
    flex: 1,
    minWidth: 0,
  },

  popularName: {
    color: COLORS.text,
    fontSize: dimensions.typography.small,
    fontWeight: "500",
    marginBottom: 3,
  },

  popularPrice: {
    color: COLORS.primary,
    fontSize: dimensions.typography.extraSmall,
    fontWeight: "500",
  },

  popularPlus: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: dimensions.spacing.sm,
  },

  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.90)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteText: {
    color: COLORS.primary,
    fontSize: 17,
    lineHeight: 19,
  },
});
