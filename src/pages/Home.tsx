import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { fetchDrinks } from "../api/drinksApi";
import { useTheme } from "../context/ThemeContext";

import StatusBar from "../components/StatusBar";
import Icon from "../components/Icon";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import DrinkCard from "../components/DrinkCard";
import BottomNavigation from "../components/BottomNavigation";

import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { categories, drinkCategories } from "../constants/categories";

import { Category, HomeCategory, Screen, Drink } from "../types";

interface HomeScreenProps {
  cartCount: number;
  onNavigate: (screen: Screen) => void;
  onMenuOpen: () => void;
  onDrinkSelect: (drink: Drink) => void;
  favorites: string[];
  onToggleFavorite: (drinkId: string) => void;
}

export default function HomeScreen({
  cartCount,
  onNavigate,
  onDrinkSelect,
  onMenuOpen,
  favorites,
  onToggleFavorite,
}: HomeScreenProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<HomeCategory>("All");

  const [apiDrinks, setApiDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { width } = useWindowDimensions();

  useTheme();

  const scrollViewRef = useRef<ScrollView>(null);

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  const popularCardWidth = Math.min(
    dimensions.images.popularCard.maxWidth,
    Math.max(
      dimensions.images.popularCard.minWidth,
      (width - horizontalPadding * 2) * 0.42,
    ),
  );

  /*
   * LOAD DRINKS FROM REST API
   */
  useEffect(() => {
    const loadDrinks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDrinks();

        console.log("DRINKS FROM API:", data.length);
        console.log("FIRST DRINK:", data[0]);

        setApiDrinks(data);
      } catch {
        setError("Unable to load drinks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDrinks();
  }, []);

  /*
   * SEARCH CATEGORY
   *
   * The search input is the single source of truth.
   *
   * Example:
   * "Tea" → selected search category = Tea
   */
  const selectedSearchCategory = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return null;
    }

    return (
      drinkCategories.find((category) => category.toLowerCase() === query) ??
      null
    );
  }, [search]);

  /*
   * SEARCH MODE
   */
  const isSearchCategoryActive = selectedSearchCategory !== null;

  /*
   * SEARCH DROPDOWN
   *
   * Show categories only when the search input
   * is focused and no category has been selected.
   */
  const showSearchDropdown = searchFocused && !selectedSearchCategory;

  /*
   * DRINK PRESS
   */
  const handleDrinkPress = useCallback(
    (drink: Drink) => {
      setSearch("");
      setSearchFocused(false);

      onDrinkSelect(drink);
    },
    [onDrinkSelect],
  );

  /*
   * FAVORITE
   */
  const handleFavoriteToggle = useCallback(
    (drinkId: string) => {
      onToggleFavorite(drinkId);
    },
    [onToggleFavorite],
  );

  /*
   * HOME CATEGORY
   */
  const handleCategoryChange = useCallback((category: HomeCategory) => {
    setActiveCategory(category);
    setSearch("");
    setSearchFocused(false);

    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    });
  }, []);

  /*
   * SEARCH CATEGORY
   *
   * We only write the selected category
   * into the SearchBar.
   *
   * Example:
   * click Tea
   * → search = "Tea"
   * → selectedSearchCategory = "Tea"
   */
  const handleSearchCategorySelect = useCallback((category: Category) => {
    setSearch(category);
    setSearchFocused(false);

    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    });
  }, []);

  /*
   * CART
   */
  const handleCartPress = useCallback(() => {
    onNavigate("cart");
  }, [onNavigate]);

  /*
   * POPULAR DRINKS
   */
  const popularDrinks = useMemo(() => {
    return apiDrinks
      .filter((drink) => drink.popular === true || favorites.includes(drink.id))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [apiDrinks, favorites]);

  /*
   * SEARCH CATEGORY DRINKS
   *
   * IMPORTANT:
   * We use drink.category.
   *
   * Therefore Iced Tea is included in Tea,
   * even though its menuCategory is Cold Drinks.
   */
  const categoryDrinks = useMemo(() => {
    if (!selectedSearchCategory) {
      return [];
    }

    return apiDrinks
      .filter((drink) => drink.category === selectedSearchCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [apiDrinks, selectedSearchCategory]);

  /*
   * MAIN CATALOG
   */
  const displayedDrinks = useMemo(() => {
    /*
     * SEARCH CATEGORY
     */
    if (selectedSearchCategory) {
      return categoryDrinks;
    }

    /*
     * ALL
     */
    if (activeCategory === "All") {
      return [...apiDrinks].sort((a, b) => a.name.localeCompare(b.name));
    }

    /*
     * HOT / COLD / OTHERS
     */
    return apiDrinks
      .filter((drink) => drink.menuCategory === activeCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activeCategory, apiDrinks, categoryDrinks, selectedSearchCategory]);

  /*
   * CATALOG TITLE
   */
  const catalogTitle = selectedSearchCategory ?? activeCategory;

  return (
    <View style={styles.screen}>
      <StatusBar />

      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
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
      <View
        style={[
          styles.greeting,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <Text style={styles.greetingTitle}>Good morning!</Text>

        <Text style={styles.greetingText}>What would you like today?</Text>
      </View>

      {/* SEARCH */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onFocus={() => setSearchFocused(true)}
      />

      {/* SEARCH CATEGORY FILTER */}
      {showSearchDropdown && (
        <View
          style={[
            styles.searchDropdown,
            {
              marginHorizontal: horizontalPadding,
            },
          ]}
        >
          <Text style={styles.searchDropdownTitle}>
            Choose a drink category
          </Text>

          <View style={styles.searchCategoryList}>
            {drinkCategories.map((category) => (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => handleSearchCategorySelect(category)}
                style={styles.searchCategoryItem}
              >
                <View style={styles.searchCategoryIcon}>
                  <Icon name="search" size={14} color={COLORS.primary} />
                </View>

                <Text style={styles.searchCategoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* CATEGORY TABS */}
      {!isSearchCategoryActive && (
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      {/* MAIN CONTENT */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={!loading && !error ? [1] : undefined}
        contentContainerStyle={styles.content}
      >
        {/* 0 — POPULAR */}
        {!loading && !error && !isSearchCategoryActive ? (
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
                    style={[
                      styles.popularCard,
                      {
                        width: popularCardWidth,
                      },
                    ]}
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
        ) : (
          <View style={styles.emptyScrollHeader} />
        )}

        {/* 1 — STICKY CATALOG HEADER */}
        {!loading && !error ? (
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
        ) : (
          <View style={styles.emptyScrollHeader} />
        )}

        {/* 2 — CATALOG / STATUS */}
        {!loading && !error ? (
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

                  <Text style={styles.emptyText}>Try another category.</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            {loading ? (
              <Text style={styles.apiStatus}>Loading drinks...</Text>
            ) : (
              <Text style={styles.apiError}>{error}</Text>
            )}
          </View>
        )}

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

  searchDropdown: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EEF0ED",
    borderRadius: 8,
    backgroundColor: COLORS.white,
    zIndex: 20,
    elevation: 5,
  },

  searchDropdownTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  searchCategoryList: {
    gap: 2,
  },

  searchCategoryItem: {
    minHeight: 38,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
  },

  searchCategoryIcon: {
    width: 28,
    height: 28,
    marginRight: 9,
    borderRadius: 14,
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
  },

  searchCategoryText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
  },

  content: {
    paddingBottom: 90,
  },

  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
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

  emptyScrollHeader: {
    height: 0,
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

  apiStatus: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 10,
  },

  apiError: {
    color: "#B42318",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },

  bottomSpace: {
    height: 70,
  },
});
