import { NavigatorScreenParams } from "@react-navigation/native";
import { PaymentMethod } from "../types";

export type RootStackParamList = {
  Welcome: undefined;

  AppDrawer: NavigatorScreenParams<DrawerParamList>;

  DrinkDetails: {
    drinkId: string;
  };

  ApiCoffeeDetails: {
    itemId: string;
  };

  Checkout: undefined;

  Payment: undefined;

  Confirmation: {
    paymentMethod: PaymentMethod;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Cafe: undefined;
};
