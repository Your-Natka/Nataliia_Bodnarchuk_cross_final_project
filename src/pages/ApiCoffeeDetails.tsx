import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { fetchCoffee, ApiCoffee } from "../api/coffeeApi";
import { RootStackParamList } from "../navigation/navigationTypes";

type ApiCoffeeDetailsRouteProp = RouteProp<
  RootStackParamList,
  "ApiCoffeeDetails"
>;

export default function ApiCoffeeDetailsScreen() {
  const route = useRoute<ApiCoffeeDetailsRouteProp>();
  const navigation = useNavigation();

  const [coffee, setCoffee] = React.useState<ApiCoffee | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { itemId } = route.params;

  React.useEffect(() => {
    const loadCoffee = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCoffee();

        const selectedCoffee = data.find(
          (item) => item.id.toString() === itemId,
        );

        if (!selectedCoffee) {
          setError("Coffee not found.");
          return;
        }

        setCoffee(selectedCoffee);
      } catch {
        setError("Unable to load coffee details.");
      } finally {
        setLoading(false);
      }
    };

    loadCoffee();
  }, [itemId]);

  return (
    <View style={styles.screen}>
      <StatusBar />

      <Header title="Coffee Details" onBack={() => navigation.goBack()} />

      {loading && (
        <View style={styles.center}>
          <Text style={styles.statusText}>Loading...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && coffee && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: coffee.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{coffee.title}</Text>

            <Text style={styles.description}>{coffee.description}</Text>

            <Text style={styles.label}>Ingredients</Text>

            {coffee.ingredients.map((ingredient) => (
              <Text key={ingredient} style={styles.ingredient}>
                • {ingredient}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    paddingBottom: 30,
  },

  imageContainer: {
    height: 220,
    marginHorizontal: dimensions.layout.horizontalPadding,
    borderRadius: dimensions.cards.radius,
    overflow: "hidden",
    backgroundColor: COLORS.quantityBackground,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  info: {
    paddingHorizontal: dimensions.layout.horizontalPadding,
    paddingTop: 18,
  },

  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },

  description: {
    color: COLORS.muted,
    fontSize: dimensions.typography.small,
    lineHeight: 20,
    marginBottom: 20,
  },

  label: {
    color: COLORS.text,
    fontSize: dimensions.typography.body,
    fontWeight: "600",
    marginBottom: 10,
  },

  ingredient: {
    color: COLORS.muted,
    fontSize: dimensions.typography.small,
    lineHeight: 22,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  statusText: {
    color: COLORS.muted,
    fontSize: dimensions.typography.body,
  },

  errorTitle: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },

  errorText: {
    color: COLORS.muted,
    fontSize: dimensions.typography.body,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: dimensions.typography.small,
    fontWeight: "600",
  },
});
