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
            className="w-[100px] rounded-lg border-2 border-red-500 bg-red-500 py-1 text-white"
        >
            Logout
        </button>
    );
}