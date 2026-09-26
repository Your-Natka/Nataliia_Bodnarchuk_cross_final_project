import { Drink, HomeCategory, MenuCategory } from "../types";

export const drinks: Drink[] = [
  {
    id: "c1",
    name: "Latte",
    description: "Espresso with steamed milk and a light layer of foam",
    price: 3.5,
    category: "Coffee",
    menuCategory: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "c2",
    name: "Iced Latte",
    description: "Espresso with cold milk served over ice",
    price: 4.0,
    category: "Coffee",
    menuCategory: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "c3",
    name: "Americano",
    description: "Rich espresso blended with hot water",
    price: 3.0,
    category: "Coffee",
    menuCategory: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "c4",
    name: "Mocha",
    description: "Espresso with chocolate and steamed milk",
    price: 3.8,
    category: "Coffee",
    menuCategory: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "c5",
    name: "Cappuccino",
    description: "Espresso with steamed milk and creamy foam",
    price: 3.5,
    category: "Coffee",
    menuCategory: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1534234757579-8ad69d218ad4?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "t1",
    name: "Tea",
    description: "Classic hot tea served fresh",
    price: 3.6,
    category: "Tea",
    menuCategory: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "cd1",
    name: "Cold Brew",
    description: "Smooth cold brewed coffee served over ice",
    price: 4.5,
    category: "Cold Drinks",
    menuCategory: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: "cd2",
    name: "Lemonade",
    description: "Fresh lemon with sparkling mineral water",
    price: 3.8,
    category: "Cold Drinks",
    menuCategory: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1621690233197-8a3ccb918e72?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: "j1",
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 4.0,
    category: "Juice",
    menuCategory: "Others",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: "w1",
    name: "Still Water",
    description: "Chilled still mineral water",
    price: 1.5,
    category: "Water",
    menuCategory: "Others",
    image:
      "https://images.unsplash.com/photo-1553564552-02656d6a2390?w=400&h=400&fit=crop&auto=format",
  },
];

export const categories: HomeCategory[] = [
  "All",
  "Hot Drinks",
  "Cold Drinks",
  "Others",
];

export const menuCategories: MenuCategory[] = [
  "All",
  "Hot Drinks",
  "Cold Drinks",
  "Others",
];
