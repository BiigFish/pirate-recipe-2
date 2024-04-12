import ListControls from "@/components/home/list-controls";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("recipes")
    .select("name, id, tags")
    .order("name", { ascending: true });

  if (error) {
    alert("Error loading recipes!");
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("profiles")
    .select("favs")
    .eq("id", user?.id)
    .single();

  const tagSearch = searchParams.tag || undefined;

  const tagFiltered = data.filter((recipe) => {
    if (tagSearch) {
      return recipe.tags.includes(tagSearch);
    }
    return true;
  });

  const favFiltered = tagFiltered.filter((recipe) => {
    if (userData?.favs) {
      return userData.favs.includes(recipe.id);
    }
    return false;
  });

  return (
    <div className="my-10 w-full">
      <ListControls searchParams={searchParams} />
      <div className="space-y-4 mt-4">
        {favFiltered.length > 0 && (
          <div className="border-b pb-3  border-black">
            <h2 className="text-2xl mb-4">Favourite Recipes</h2>
            <ul className="space-y-3">
              {favFiltered.map((recipe, index) => (
                <li key={index}>
                  <Link
                    href={`recipe/${recipe.id.toString()}`}
                    className="w-fit block text-lg"
                  >
                    {recipe.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="space-y-3">
          {tagFiltered
            .filter((recipe) => {
              if (userData?.favs) return !userData.favs.includes(recipe.id);
              else return true;
            })
            .map((recipe, index) => (
              <li key={index}>
                <Link
                  href={`recipe/${recipe.id.toString()}`}
                  className="w-fit block text-lg"
                >
                  {recipe.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
