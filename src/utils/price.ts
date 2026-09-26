import { Drink, DrinkOptions } from "../types";

export function getDrinkPrice(
  drink: Drink,
  options: DrinkOptions = {},
): number {
  let price = drink.price;

  if (options.size === "Medium") {
    price += 0.5;
  }

  if (options.size === "Large") {
    price += 1;
  }

  if (options.milk === "Oat" || options.milk === "Almond") {
    price += 0.5;
  }

  if (options.whippedCream) {
    price += 0.5;
  }

  if (options.honey) {
    price += 0.3;
  }

  return Number(price.toFixed(2));
}

export function getCartItemTotal(
  drink: Drink,
  options: DrinkOptions,
  quantity: number,
): number {
  return Number((getDrinkPrice(drink, options) * quantity).toFixed(2));
}
