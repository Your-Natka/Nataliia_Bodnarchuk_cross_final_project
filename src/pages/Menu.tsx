import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { fetchDrinks } from "../api/drinksApi";
import { menuCategories } from "../constants/categories";
import { Drink, MenuCategory, Screen } from "../types";

interface MenuScreenProps {
  onBack: () => void;
  cartCount: number;
  onNavigate: (screen: Screen) => void;
  onDrinkSelect: (drink: Drink) => void;
}

export default function MenuScreen({
  onBack,
  cartCount,
  onNavigate,
  onDrinkSelect,
}: MenuScreenProps) {
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDrinks() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchDrinks();

        if (isMounted) {
          setDrinks(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load menu");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDrinks();

    return () => {
      isMounted = false;
    };
  }, []);

  const listedDrinks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return drinks
      .filter((drink) => {
        const matchesCategory =
          activeCategory === "All" || drink.menuCategory === activeCategory;

        const matchesSearch =
          query.length === 0 || drink.name.toLowerCase().startsWith(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [drinks, activeCategory, search]);

  const handleCategoryChange = (category: MenuCategory) => {
    setActiveCategory(category);
    setSearch("");
  };

  const isSearching = search.trim().length > 0;

  return (
    <View style={styles.screen}>
      <StatusBar />

      <Header
        title="Menu"
        onBack={onBack}
        showCart
        cartCount={cartCount}
        onCart={() => onNavigate("cart")}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search drinks..."
      />

      <CategoryTabs
        categories={menuCategories}
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.content}
      >
        {/* STICKY CATEGORY TITLE */}
        <View
          style={[
            styles.sectionTitleContainer,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <Text style={styles.sectionTitle}>
            {isSearching ? "Search results" : activeCategory}
          </Text>
        </View>

        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.statusText}>Loading menu...</Text>
          </View>
        )}

        {!isLoading && error && (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!isLoading && !error && (
          <>
            <View
              style={[styles.list, { paddingHorizontal: horizontalPadding }]}
            >
              {listedDrinks.map((drink) => (
                <MenuCard
                  key={drink.id}
                  drink={drink}
                  onPress={() => {
                    setSearch("");
                    onDrinkSelect(drink);
                  }}
                />
              ))}
            </View>

            {listedDrinks.length === 0 && (
              <View
                style={[styles.empty, { paddingHorizontal: horizontalPadding }]}
              >
                <Text style={styles.emptyText}>No drinks found</Text>
              </View>
            )}
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNavigation
        activeScreen="menu"
        cartCount={cartCount}
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    paddingBottom: 90,
  },

  sectionTitleContainer: {
    paddingVertical: 9,
    backgroundColor: COLORS.bg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.searchBorder,
    zIndex: 10,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: dimensions.typography.body,
    fontWeight: "600",
  },

  list: {
    paddingTop: 9,
    gap: dimensions.spacing.md,
  },

  center: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.body,
  },

  errorText: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.body,
    textAlign: "center",
  },

  empty: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: dimensions.typography.body,
  },

  bottomSpace: {
    height: 20,
  },
});
