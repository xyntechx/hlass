"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function Login() {
    const supabase = createSupabaseBrowserClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/account`,
            },
        });
    };

    return (
        <button
            onClick={handleLogin}
            className="w-[100px] rounded-lg border-2 border-primary-blue bg-primary-blue py-1 text-white"
        >
            Login
        </button>
    );
}
