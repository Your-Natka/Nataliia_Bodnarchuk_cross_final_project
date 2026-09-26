import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
interface CategoryTabsProps<T extends string> {
  categories: T[];
  activeCategory: T;
  onChange: (category: T) => void;
}
export default function CategoryTabs<T extends string>({
  categories,
  activeCategory,
  onChange,
}: CategoryTabsProps<T>) {
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        {categories.map((category) => {
          const active = category === activeCategory;
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => onChange(category)}
              style={[styles.button, active && styles.activeButton]}
            >
              <Text style={[styles.text, active && styles.activeText]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  content: { flexDirection: "row", gap: 7 },
  button: {
    height: 36,
    minWidth: 58,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.categoryBackground,
  },
  activeButton: { backgroundColor: COLORS.primary },
  text: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "500",
    textAlign: "center",
  },
  activeText: { color: COLORS.white },
});
