"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export default function Logout() {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-full border-2 border-red-500 bg-red-500 px-4 py-1 text-white transition-shadow hover:shadow-lg"
        >
            Logout
        </button>
    );
}
