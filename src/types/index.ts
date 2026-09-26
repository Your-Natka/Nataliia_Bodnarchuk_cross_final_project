export type Screen =
  | "welcome"
  | "home"
  | "menu"
  | "detail"
  | "cart"
  | "checkout"
  | "payment"
  | "confirmation"
  | "cafe";

export type OrderMode = "dine-in" | "takeaway";

export type PaymentMethod = "card" | "cash";

export type Category = "Coffee" | "Tea" | "Cold Drinks" | "Juice" | "Water";

export type MenuCategory = "All" | "Hot Drinks" | "Cold Drinks" | "Others";

export type HomeCategory = "All" | "Hot Drinks" | "Cold Drinks" | "Others";

export type DrinkSize = "Small" | "Medium" | "Large";

export type MilkType = "Regular" | "Oat" | "Almond";

export type TeaType = "Tea bag" | "Loose leaf";

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  menuCategory: MenuCategory;
  image: string | number;
  popular?: boolean;
  tag?: string;
}

export interface DrinkOptions {
  size?: DrinkSize;
  milk?: MilkType;
  sugar?: number;
  whippedCream?: boolean;
  teaType?: TeaType;
  lemon?: boolean;
  honey?: boolean;
}

export interface CartItem {
  id: string;
  drink: Drink;
  quantity: number;
  options: DrinkOptions;
  optionLabel: string;
}

export interface NavigationProps {
  onNavigate: (screen: Screen) => void;
}
