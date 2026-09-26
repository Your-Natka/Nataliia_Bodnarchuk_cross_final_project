import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "../pages/Home";
import MenuScreen from "../pages/Menu";
import CartScreen from "../pages/Cart";

import {
  DrawerParamList,
  MainTabParamList,
  RootStackParamList,
} from "./navigationTypes";

import { Drink, Screen } from "../types";
import { useAppContext } from "../context/AppContext";
import { SCREENS } from "../constants/screens";
import { RootState, AppDispatch } from "../store/store";
import { removeItem, updateQuantity } from "../store/cartSlice";

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreenAdapter} />
      <Tab.Screen name={SCREENS.MENU} component={MenuScreenAdapter} />
      <Tab.Screen name={SCREENS.CART} component={CartScreenAdapter} />
    </Tab.Navigator>
  );
}

function HomeScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { favorites, toggleFavorite, selectDrink } = useAppContext();

  const cart = useSelector((state: RootState) => state.cart.items);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (screen: Screen) => {
    switch (screen) {
      case "home":
        navigation.navigate(SCREENS.HOME);
        break;

      case "menu":
        navigation.navigate(SCREENS.MENU);
        break;

      case "cart":
        navigation.navigate(SCREENS.CART);
        break;

      case "cafe":
        navigation.dispatch(DrawerActions.jumpTo("Cafe"));
        break;

      default:
        break;
    }
  };

  const handleDrinkSelect = (drink: Drink) => {
    selectDrink(drink);

    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate(SCREENS.DRINK_DETAILS, {
        drinkId: drink.id,
      });
    }
  };

  const handleApiCoffeeSelect = (itemId: string) => {
    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate("ApiCoffeeDetails", {
        itemId,
      });
    }
  };

  return (
    <HomeScreen
      cartCount={cartCount}
      onNavigate={handleNavigate}
      onMenuOpen={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
      onDrinkSelect={handleDrinkSelect}
      onApiCoffeeSelect={handleApiCoffeeSelect}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

function MenuScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { selectDrink } = useAppContext();

  const cart = useSelector((state: RootState) => state.cart.items);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (screen: Screen) => {
    switch (screen) {
      case "home":
        navigation.navigate(SCREENS.HOME);
        break;

      case "cart":
        navigation.navigate(SCREENS.CART);
        break;

      case "cafe":
        navigation.dispatch(DrawerActions.jumpTo("Cafe"));
        break;

      default:
        break;
    }
  };

  const handleDrinkSelect = (drink: Drink) => {
    selectDrink(drink);

    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate(SCREENS.DRINK_DETAILS, {
        drinkId: drink.id,
      });
    }
  };

  return (
    <MenuScreen
      onBack={() => {
        navigation.navigate(SCREENS.HOME);
      }}
      cartCount={cartCount}
      onNavigate={handleNavigate}
      onDrinkSelect={handleDrinkSelect}
    />
  );
}

function CartScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { orderMode } = useAppContext();

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <CartScreen
      items={cart}
      mode={orderMode}
      onBack={() => {
        navigation.navigate(SCREENS.HOME);
      }}
      onCheckout={() => {
        navigation.getParent()?.getParent()?.navigate(SCREENS.CHECKOUT);
      }}
      onUpdateQuantity={(index, quantity) => {
        dispatch(
          updateQuantity({
            index,
            quantity,
          }),
        );
      }}
      onRemove={(index) => {
        dispatch(removeItem(index));
      }}
    />
  );
}
