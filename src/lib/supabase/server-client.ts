import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export function createSupabaseServerClient(component: boolean = false) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookies().get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    if (component) return;
                    cookies().set(name, value, options);
                },
                remove(name: string, options: CookieOptions) {
                    if (component) return;
                    cookies().set(name, "", options);
                },
            },
        },
    );
}

export function createSupabaseServerComponentClient() {
    return createSupabaseServerClient(true);
}
