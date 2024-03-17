"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

// ? Reference component; currently not used

export default function LoginButton() {
    const supabase = createSupabaseBrowserClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/account`
            }
        });
    };

    return <button onClick={handleLogin}>Login</button>;
}
