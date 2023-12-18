import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Recipe } from "../models/recipes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeForm from "./recipe-form";

const RecipeFormPage = async ({
  searchParams,
}: {
  searchParams: { recipeId: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const fetchRecipe = async () => {
    const { data, error: recipeError } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", searchParams.recipeId);
    if (recipeError) {
      alert("Error loading recipe!");
    }
    if (!data || !data[0]) {
      alert("Recipe not found!");
      return undefined;
    }
    return data[0] as Recipe;
  };

  let recipeData: Recipe | undefined = undefined;
  if (searchParams.recipeId) {
    recipeData = await fetchRecipe();
  }

  return (
    <div>
      <Button variant="secondary" asChild>
        <Link href={recipeData ? `/${searchParams.recipeId}` : "/"}>
          Go Back
        </Link>
      </Button>
      <h1 className="text-2xl font-bold my-2">Recipe Form Page</h1>
      <RecipeForm editRecipe={recipeData} />
    </div>
  );
};

export default RecipeFormPage;
