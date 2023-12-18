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
  category: Category;
  author_id: string;
}

export interface Ingredient {
  amount: string;
  ingredient: string;
}

export enum Category {
  BREAKFAST = "Breakfast",
  MEAL = "Meal",
  SNACK = "Snack",
  DESSERT = "Dessert",
  DRINK = "Drink",
  SOUP = "Soup",
  BAKING = "Baking",
  OTHER = "Other",
}
