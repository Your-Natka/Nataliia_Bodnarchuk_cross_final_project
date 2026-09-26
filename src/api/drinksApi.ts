import { Drink } from "../types";

const API_URL = "http://localhost:3000/api";

export async function fetchDrinks(): Promise<Drink[]> {
  const response = await fetch(`${API_URL}/drinks`);

  if (!response.ok) {
    throw new Error(`Failed to fetch drinks: ${response.status}`);
  }

  return response.json();
}

export async function fetchDrinkById(id: string): Promise<Drink> {
  const response = await fetch(`${API_URL}/drinks/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch drink: ${response.status}`);
  }

  return response.json();
}
