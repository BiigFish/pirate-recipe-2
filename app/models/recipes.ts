export interface Recipe {
  id: string;
  name: string;
  description: string;
  yield: string;
  active_cook_time: string;
  passive_cook_time: string;
  instructions: string[];
  notes: string[];
  ingredients: Ingredient[];
  author_id: string;
  tags: string[];
}

export interface Ingredient {
  amount: string;
  ingredient: string;
}

export const Tags = [
  "Breakfast",
  "Meal",
  "Snack",
  "Dessert",
  "Drink",
  "Soup",
  "Baking",
  "Sauce",
];
