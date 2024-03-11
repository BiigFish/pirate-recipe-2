import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

const Home = async () => {
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

  return (
    <div className="space-y-4 w-full my-10">
      <ul className="space-y-3">
        {data.map((recipe, index) => (
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
  );
};

export default Home;
