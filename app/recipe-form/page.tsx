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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return (
      <div className="w-full">
        <h1 className="text-2xl font-bold my-2">Error: Not logged in</h1>
        <Button asChild>
          <Link href="login">Log In</Link>
        </Button>
      </div>
    );

  const fetchRecipe = async () => {
    const { data, error: recipeError } = await supabase
      .from("recipes")
      .select("*")
      .match({ id: searchParams.recipeId, author_id: user?.id });
    if (recipeError) {
      console.log("Error loading recipe!");
    }
    if (!data || !data[0]) {
      console.log("Recipe not found!");
      return undefined;
    }
    return data[0] as Recipe;
  };

  let recipeData: Recipe | undefined = undefined;
  if (searchParams.recipeId) {
    recipeData = await fetchRecipe();
  }

  if (!recipeData && searchParams.recipeId) {
    return (
      <div className="w-full">
        <h1 className="text-2xl font-bold my-2">Error: Recipe not found</h1>
        <Button variant="secondary" asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Button variant="secondary" asChild>
        <Link href={recipeData ? `recipe/${searchParams.recipeId}` : "/"}>
          Go Back
        </Link>
      </Button>
      <h1 className="text-2xl font-bold my-2">Recipe Form Page</h1>
      <RecipeForm editRecipe={recipeData} userId={user.id} />
    </div>
  );
};

export default RecipeFormPage;
