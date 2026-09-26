const API_URL = "https://api.sampleapis.com/coffee/hot";

export interface ApiCoffee {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

/**
 * Fetches hot coffee drinks from the public Coffee API.
 */
export const fetchCoffee = async (): Promise<ApiCoffee[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: ApiCoffee[] = await response.json();

  return data;
};
