import { Drink, DrinkOptions } from "../types";

export function buildOptionLabel(drink: Drink, options: DrinkOptions): string {
  const parts: string[] = [];

  if (options.size) {
    parts.push(options.size);
  }

  if (options.milk && options.milk !== "Regular") {
    parts.push(`${options.milk} milk`);
  }

  if (options.sugar !== undefined) {
    parts.push(`${options.sugar} sugar`);
  }

  if (options.teaType) {
    parts.push(options.teaType);
  }

  if (options.lemon) {
    parts.push("Lemon");
  }

  if (options.honey) {
    parts.push("Honey");
  }

  if (options.whippedCream) {
    parts.push("Whipped cream");
  }

  return parts.length > 0 ? parts.join(" • ") : drink.name;
}
