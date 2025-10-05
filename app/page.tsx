import ListControls from "@/components/home/list-controls";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag: string; owner: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("recipes")
    .select("name, id, tags, author_id")
    .order("name", { ascending: true });

  if (error) {
    alert("Error loading recipes!");
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const tagSearch = searchParams.tag || undefined;
  const ownerSearch = searchParams.owner || undefined;

  return (
    <div className="my-10 w-full">
        <ListControls searchParams={searchParams} loggedIn={!!user} />
      <div className="space-y-4 mt-4">
        <ul className="space-y-3">
          {data
            .filter((recipe) => {
              if (tagSearch) {
                if (!recipe.tags.includes(tagSearch)) {
                  return false;
                }
              }
              
              // Filter by owner
              if (ownerSearch === "Mine") {
                if (!user || recipe.author_id !== user.id) {
                  return false;
                }
              }
              
              return true;
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
