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

  const tagSearch = searchParams.tag || undefined;

  return (
    <div className="my-10 w-full">
      <ListControls searchParams={searchParams} />
      <div className="space-y-4 mt-4">
        <ul className="space-y-3">
          {data
            .filter((recipe) => {
              if (tagSearch) {
                return recipe.tags.includes(tagSearch);
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
