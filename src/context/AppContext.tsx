import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { Drink, OrderMode, PaymentMethod } from "../types";

interface AppContextValue {
  orderMode: OrderMode;
  paymentMethod: PaymentMethod;
  selectedDrink: Drink | null;
  favorites: string[];

  setOrderMode: (mode: OrderMode) => void;
  setPaymentMethod: (method: PaymentMethod) => void;

  selectDrink: (drink: Drink) => void;

  toggleFavorite: (drinkId: string) => void;

  resetOrder: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [orderMode, setOrderMode] = useState<OrderMode>("dine-in");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);

  const selectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  const toggleFavorite = (drinkId: string) => {
    setFavorites((current) =>
      current.includes(drinkId)
        ? current.filter((id) => id !== drinkId)
        : [...current, drinkId],
    );
  };

  const resetOrder = () => {
    setSelectedDrink(null);
    setPaymentMethod("card");
    setOrderMode("dine-in");
    setFavorites([]);
  };

  const value = useMemo<AppContextValue>(
    () => ({
      orderMode,
      paymentMethod,
      selectedDrink,
      favorites,

      setOrderMode,
      setPaymentMethod,

      selectDrink,

      toggleFavorite,

      resetOrder,
    }),
    [orderMode, paymentMethod, selectedDrink, favorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
