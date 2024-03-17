import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import LoginButton from "./login";
import LogoutButton from "./logout";

export default async function Topnav() {
    const {
        data: { session },
        error,
    } = await createSupabaseServerComponentClient().auth.getSession();

    const user = session?.user;

    return <>{user ? <LogoutButton /> : <LoginButton />}</>;
}
