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
            className="rounded-full border-2 border-primary-blue bg-primary-blue px-4 py-1 text-white transition-shadow hover:shadow-lg"
        >
            Login
        </button>
    );
}
