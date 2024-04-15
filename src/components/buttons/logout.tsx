"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export default function Logout() {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-full border-red-500 bg-red-500 px-10 py-2 text-white transition-shadow hover:shadow-lg"
        >
            Logout
        </button>
    );
}
