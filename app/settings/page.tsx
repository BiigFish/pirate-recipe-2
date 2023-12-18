import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user?.id);
  const profile = data ? data[0] : undefined;

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };
  return user ? (
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-bold my-2">Settings</h1>
      <div className="flex gap-x-4">
        <p className="font-bold">Email:</p>
        <p>{user.email}</p>
      </div>
      {/* <div className="flex gap-x-4">
        <p className="font-bold">Username:</p>
        <p>{profile?.username}</p>
      </div> */}
      <Button type="button" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  ) : (
    <div className="w-full">
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </div>
  );
};

export default SettingsPage;
