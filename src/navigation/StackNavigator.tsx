import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import WelcomeScreen from "../pages/Welcome";
import DrinkDetailsScreen from "../pages/DrinkDetails";
import DrawerNavigator from "./DrawerNavigator";
import CheckoutScreen from "../pages/Checkout";
import PaymentMethodScreen from "../pages/PaymentMethod";
import OrderConfirmationScreen from "../pages/OrderConfirmation";
import ApiCoffeeDetailsScreen from "../pages/ApiCoffeeDetails";

import { drinks } from "../data/drinks";
import { OrderMode, PaymentMethod, CartItem } from "../types";
import { RootStackParamList } from "./navigationTypes";
import { useAppContext } from "../context/AppContext";
import { SCREENS } from "../constants/screens";
import { RootState, AppDispatch } from "../store/store";
import { addItem, clearCart } from "../store/cartSlice";
import { buildOptionLabel } from "../utils/options";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreenAdapter} />

      <Stack.Screen name={SCREENS.APP_DRAWER} component={DrawerNavigator} />

      <Stack.Screen
        name={SCREENS.DRINK_DETAILS}
        component={DrinkDetailsScreenAdapter}
      />

      <Stack.Screen
        name="ApiCoffeeDetails"
        component={ApiCoffeeDetailsScreen}
      />

      <Stack.Screen name={SCREENS.CHECKOUT} component={CheckoutScreenAdapter} />

      <Stack.Screen name={SCREENS.PAYMENT} component={PaymentScreenAdapter} />

      <Stack.Screen
        name={SCREENS.CONFIRMATION}
        component={ConfirmationScreenAdapter}
      />
    </Stack.Navigator>
  );
}

function WelcomeScreenAdapter() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { setOrderMode } = useAppContext();

  const handleChooseMode = (mode: OrderMode) => {
    setOrderMode(mode);

    navigation.navigate(SCREENS.APP_DRAWER, {
      screen: "MainTabs",
      params: {
        screen: "Home",
      },
    });
  };

  return <WelcomeScreen onChoose={handleChooseMode} />;
}

function DrinkDetailsScreenAdapter() {
  const route = useRoute<RouteProp<RootStackParamList, "DrinkDetails">>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const drinkId = route.params?.drinkId;

  const drink = drinks.find((item) => item.id === drinkId);

  if (!drink) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Drink not found</Text>

        <Text style={styles.errorText}>
          Sorry, this drink is not available.
        </Text>

        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.errorButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = (
    selectedDrink: typeof drink,
    options: Parameters<
      NonNullable<
        React.ComponentProps<typeof DrinkDetailsScreen>["onAddToCart"]
      >
    >[1],
    quantity: Parameters<
      NonNullable<
        React.ComponentProps<typeof DrinkDetailsScreen>["onAddToCart"]
      >
    >[2],
  ) => {
    const item: CartItem = {
      id: `${selectedDrink.id}-${Date.now()}`,
      drink: selectedDrink,
      quantity,
      options,
      optionLabel: buildOptionLabel(selectedDrink, options),
    };

    dispatch(addItem(item));

    navigation.navigate(SCREENS.APP_DRAWER, {
      screen: "MainTabs",
      params: {
        screen: "Cart",
      },
    });
  };

  return (
    <DrinkDetailsScreen
      drink={drink}
      onBack={handleBack}
      onAddToCart={handleAddToCart}
    />
  );
}

function CheckoutScreenAdapter() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { orderMode, setOrderMode, setPaymentMethod } = useAppContext();

  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <CheckoutScreen
      items={cart}
      mode={orderMode}
      onBack={() => navigation.goBack()}
      onChangeOrderMode={setOrderMode}
      onConfirm={(method) => {
        setPaymentMethod(method);

        navigation.navigate(SCREENS.CONFIRMATION, {
          paymentMethod: method,
        });
      }}
    />
  );
}

function PaymentScreenAdapter() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { paymentMethod, setPaymentMethod } = useAppContext();

  return (
    <PaymentMethodScreen
      selectedMethod={paymentMethod}
      onBack={() => navigation.goBack()}
      onContinue={(method) => {
        setPaymentMethod(method);
        navigation.goBack();
      }}
    />
  );
}

function ConfirmationScreenAdapter() {
  const route = useRoute<RouteProp<RootStackParamList, "Confirmation">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const { setPaymentMethod } = useAppContext();

  const paymentMethod = route.params.paymentMethod;

  const handleHome = () => {
    setPaymentMethod(paymentMethod);

    dispatch(clearCart());

    navigation.navigate(SCREENS.APP_DRAWER, {
      screen: "MainTabs",
      params: { screen: "Home" },
    });
  };

  return <OrderConfirmationScreen onHome={handleHome} />;
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8F8FC",
  },

  errorTitle: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#176B55",
  },

  errorText: {
    marginBottom: 24,
    fontSize: 16,
    textAlign: "center",
    color: "#527565",
  },

  errorButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#176B55",
  },

  errorButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
