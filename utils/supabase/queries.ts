import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "./server";

export const getUser = cache(async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
});
