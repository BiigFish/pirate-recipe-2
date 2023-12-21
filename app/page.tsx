import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

const Home = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("recipes")
    .select("name, id, category");

  if (error) {
    alert("Error loading recipes!");
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const uniqueValues: Set<string> = new Set<string>();
  data.forEach((recipe) => {
    if (recipe.category) {
      uniqueValues.add(recipe.category);
    }
  });

  return (
    <div className="space-y-4 w-full">
      {data &&
        Array.from(uniqueValues).map((category: string) => (
          <fieldset
            key={category}
            className="border border-black rounded-lg px-4"
          >
            <legend className="text-lg capitalize font-bold">{category}</legend>
            <ul className="space-y-3">
              {data
                .filter((d) => d.category === category)
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
          </fieldset>
        ))}
    </div>
  );
};

export default Home;
