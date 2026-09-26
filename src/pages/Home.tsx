import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { ApiCoffee, fetchCoffee } from "../api/coffeeApi";
import { useTheme } from "../context/ThemeContext";

import ApiCoffeeCard from "../components/ApiCoffeeCard";
import StatusBar from "../components/StatusBar";
import Icon from "../components/Icon";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import DrinkCard from "../components/DrinkCard";
import BottomNavigation from "../components/BottomNavigation";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { categories, drinks } from "../data/drinks";

import { HomeCategory, Screen, Drink } from "../types";

interface HomeScreenProps {
  cartCount: number;
  onNavigate: (screen: Screen) => void;
  onMenuOpen: () => void;
  onDrinkSelect: (drink: Drink) => void;
  onApiCoffeeSelect: (itemId: string) => void;
  favorites: string[];
  onToggleFavorite: (drinkId: string) => void;
}

export default function HomeScreen({
  cartCount,
  onNavigate,
  onDrinkSelect,
  onMenuOpen,
  onApiCoffeeSelect,
  favorites,
  onToggleFavorite,
}: HomeScreenProps) {
  const { width } = useWindowDimensions();

  const { theme } = useTheme();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const popularCardWidth = Math.min(
    dimensions.images.popularCard.maxWidth,
    Math.max(
      dimensions.images.popularCard.minWidth,
      (width - horizontalPadding * 2) * 0.42,
    ),
  );

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<HomeCategory>("All");

  const [apiDrinks, setApiDrinks] = useState<ApiCoffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * API COFFEE
   */
  useEffect(() => {
    const loadCoffee = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCoffee();
        setApiDrinks(data);
      } catch {
        setError("Unable to load drinks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCoffee();
  }, []);

  /*
   * STABLE CALLBACKS
   *
   * These callbacks are passed directly to memoized DrinkCard components.
   * They keep the same reference between renders unless their dependencies change.
   */

  const handleDrinkPress = useCallback(
    (drink: Drink) => {
      setSearch("");
      onDrinkSelect(drink);
    },
    [onDrinkSelect],
  );

  const handleFavoriteToggle = useCallback(
    (drinkId: string) => {
      onToggleFavorite(drinkId);
    },
    [onToggleFavorite],
  );

  const handleCategoryChange = useCallback((category: HomeCategory) => {
    setActiveCategory(category);
    setSearch("");
  }, []);

  const handleCartPress = useCallback(() => {
    onNavigate("cart");
  }, [onNavigate]);

  const handleApiCoffeePress = useCallback(
    (itemId: string) => {
      onApiCoffeeSelect(itemId);
    },
    [onApiCoffeeSelect],
  );

  /*
   * POPULAR DRINKS
   */
  const popularDrinks = useMemo(() => {
    return drinks
      .filter((drink) => drink.popular === true || favorites.includes(drink.id))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [favorites]);

  /*
   * SEARCH
   */
  const searchResults = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return [];
    }

    return drinks
      .filter((drink) => drink.name.toLowerCase().startsWith(query))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  /*
   * MAIN CATALOG
   */
  const displayedDrinks = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (query) {
      return searchResults;
    }

    if (activeCategory === "All") {
      return [...drinks].sort((a, b) => a.name.localeCompare(b.name));
    }

    return drinks
      .filter((drink) => drink.menuCategory === activeCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activeCategory, search, searchResults]);

  const catalogTitle = search.trim() ? "Search results" : activeCategory;

  return (
    <View style={styles.screen}>
      <StatusBar />

      {/* HEADER */}
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuOpen}
          style={styles.iconButton}
        >
          <Icon name="menu" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.logo}>Drinkly</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCartPress}
          style={styles.iconButton}
        >
          <Icon name="cart" size={18} color={COLORS.primary} />

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* GREETING */}
      <View style={[styles.greeting, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.greetingTitle}>Good morning!</Text>

        <Text style={styles.greetingText}>What would you like today?</Text>
      </View>

      {/* SEARCH */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* CATEGORY TABS */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />

      {/* MAIN CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={search.trim() ? [] : [1]}
        contentContainerStyle={styles.content}
      >
        {/* POPULAR */}
        {!search.trim() && (
          <View style={styles.popularSection}>
            <View
              style={[
                styles.sectionHeader,
                {
                  paddingHorizontal: horizontalPadding,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Popular</Text>
            </View>

            <View style={styles.popularViewport}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.popularList,
                  {
                    paddingHorizontal: horizontalPadding,
                  },
                ]}
              >
                {popularDrinks.map((drink) => (
                  <View
                    key={drink.id}
                    style={[styles.popularCard, { width: popularCardWidth }]}
                  >
                    <DrinkCard
                      drink={drink}
                      variant="popular"
                      isFavorite={favorites.includes(drink.id)}
                      onToggleFavorite={handleFavoriteToggle}
                      onPress={handleDrinkPress}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* STICKY CATALOG HEADER */}
        <View
          style={[
            styles.catalogHeader,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          <Text style={styles.catalogTitle}>{catalogTitle}</Text>
        </View>

        {/* CATALOG */}
        <View
          style={[
            styles.catalogSection,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          <View style={styles.list}>
            {displayedDrinks.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                variant="horizontal"
                isFavorite={favorites.includes(drink.id)}
                onToggleFavorite={handleFavoriteToggle}
                onPress={handleDrinkPress}
              />
            ))}

            {displayedDrinks.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No drinks found</Text>

                <Text style={styles.emptyText}>Try another search.</Text>
              </View>
            )}
          </View>

          {/* API COFFEE */}
          <View
            style={[
              styles.apiSection,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            <Text style={styles.catalogTitle}>From API</Text>

            {loading && <Text style={styles.apiStatus}>Loading...</Text>}

            {error && <Text style={styles.apiError}>{error}</Text>}

            {!loading && !error && (
              <FlatList
                data={apiDrinks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ApiCoffeeCard
                    coffee={item}
                    onPress={() => handleApiCoffeePress(item.id.toString())}
                  />
                )}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation
        activeScreen="home"
        cartCount={cartCount}
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    paddingBottom: dimensions.spacing.xxxl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconButton: {
    width: dimensions.buttons.icon,
    height: dimensions.buttons.icon,
    borderRadius: 5,
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    color: COLORS.primary,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: dimensions.typography.tiny,
    fontWeight: "700",
    textAlign: "center",
  },

  greeting: {
    paddingBottom: 12,
  },

  greetingTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "500",
  },

  greetingText: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 3,
    paddingBottom: 12,
  },

  content: {
    paddingBottom: 90,
  },

  popularSection: {
    marginBottom: 0,
  },

  popularViewport: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
  },

  popularList: {
    gap: dimensions.layout.cardGap,
    paddingBottom: dimensions.spacing.xxl,
  },

  popularCard: {
    minWidth: 0,
  },

  catalogHeader: {
    backgroundColor: COLORS.white,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0ED",
    zIndex: 10,
  },

  catalogTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },

  catalogSection: {
    paddingTop: 9,
  },

  sectionHeader: {
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },

  list: {
    gap: dimensions.spacing.sm,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 6,
  },

  apiSection: {
    marginTop: 24,
  },

  apiStatus: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 10,
  },

  apiError: {
    color: "#B42318",
    fontSize: 13,
    marginTop: 10,
  },

  bottomSpace: {
    height: 70,
  },
});
