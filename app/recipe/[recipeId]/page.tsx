import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Recipe } from "../../models/recipes";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { recipeId: string };
}): Promise<Metadata> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("recipes")
    .select("name, description")
    .eq("id", params.recipeId);
  const recipe = data ? data[0] : undefined;

  const description = recipe?.description || "";
  const title = recipe?.name;

  return {
    title,
    description,
    publisher: "Pirate Recipe",
    openGraph: {
      title: `${title} | Pirate Recipe`,
      description: description,
      siteName: "Pirate Recipe",
    },
  };
}

const RecipePage = async ({ params }: { params: { recipeId: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error: recipeError } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.recipeId);
  if (recipeError) {
    console.log("Error loading recipe!");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log("aaa", user, error);
  const userId = user?.id;

  const recipeData: Recipe | undefined = data ? data[0] : undefined;
  if (!recipeData) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <Link href="/">
          <Button variant="secondary">Go Back</Button>
        </Link>
        {userId === recipeData.author_id && (
          <Link href={`/recipe-form/?recipeId=${params.recipeId}`}>
            <Button>Edit Recipe</Button>
          </Link>
        )}
      </div>
      <h1 className="text-3xl font-bold">{recipeData.name}</h1>
      <div className="flex gap-x-1">
        {recipeData.tags?.map((tag, index) => (
          <div
            key={index}
            className="border rounded-lg px-1 capitalize text-sm border-black w-fit"
          >
            {tag}
          </div>
        ))}
      </div>
      <p className="my-4">{recipeData.description}</p>
      <div className="border border-black p-2.5 space-y-2 mb-6">
        {recipeData.yield && <p className="">YIELD: {recipeData.yield}</p>}
        <div className="text-center flex gap-x-4 mx-auto w-fit">
          <div>
            <p className="text-gray-500">COOK TIME</p>
            <p>
              {recipeData.active_cook_time ? recipeData.active_cook_time : "-"}
            </p>
          </div>
          <div className="h-auto border-r-2 border-slate-400" />
          <div>
            <p className="text-gray-500">PASSIVE TIME</p>
            <p>
              {recipeData.passive_cook_time
                ? recipeData.passive_cook_time
                : "-"}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Ingredients</h2>
        {recipeData.ingredients && recipeData.ingredients.length > 0 && (
          <table className="table-auto">
            <tbody>
              {recipeData.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="pr-8">{ingredient.amount}</td>
                  <td> {ingredient.ingredient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h2 className="text-2xl font-bold">Instructions</h2>
        {recipeData.instructions && recipeData.instructions.length > 0 && (
          <ol className="list-decimal list-inside">
            {recipeData.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        )}
        {recipeData.notes && recipeData.notes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold">Notes</h2>
            <ol className="list-decimal list-inside">
              {recipeData.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
