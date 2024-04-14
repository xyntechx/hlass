"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import useSession from "@/lib/supabase/use-session";
import { useEffect, useState } from "react";

export default function Account() {
    const user = useSession()?.user;
    const supabase = createSupabaseBrowserClient();

    const [gradYear, setGradYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const getUserData = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("grad_year")
                .eq("id", user!.id);

            if (!error) {
                setGradYear(data[0].grad_year && data[0].grad_year);
            }
        };

        if (user) getUserData();
    }, [user]);

    const handleUpdateGradYear = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .update({ grad_year: Number(gradYear) })
            .eq("id", user?.id);
    };

    if (user) {
        return (
            <section className="flex min-h-screen w-full flex-col items-center justify-start">
                <h1 className="p-10 text-center text-4xl font-bold">
                    My Account
                </h1>

                <div className="flex w-full flex-col items-center justify-center gap-y-2 px-4 md:w-1/2">
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Full Name</p>
                        <p>{user?.user_metadata?.full_name}</p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Berkeley Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-start">
                        <p className="w-[200px] text-dim">Graduation Year</p>
                        <input
                            type="text"
                            value={gradYear}
                            onChange={(e) =>
                                setGradYear(Number(e.currentTarget.value))
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleUpdateGradYear()
                            }
                            onBlur={() => handleUpdateGradYear()}
                            className="w-[60px] rounded-md border p-1 text-center outline-none focus:border-black"
                        />
                    </div>
                </div>

                <h1 className="w-full px-4 pt-10 text-left text-xl font-semibold tracking-wide md:w-1/2">
                    BOOKMARKED CLASSES
                </h1>

                <div className="flex w-full flex-col items-center justify-center gap-y-4 p-4 md:w-1/2">
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM CLASS
                    </div>
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM CLASS
                    </div>
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM CLASS
                    </div>
                </div>

                <h1 className="w-full px-4 pt-10 text-left text-xl font-semibold tracking-wide md:w-1/2">
                    MY REVIEWS
                </h1>

                <div className="flex w-full flex-col items-center justify-center gap-y-4 p-4 md:w-1/2">
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM REVIEW
                    </div>
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM REVIEW
                    </div>
                    <div className="w-full rounded-md border p-4">
                        LOREM IPSUM REVIEW
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section className="flex h-full w-full flex-col items-center justify-center">
                <p>No user found</p>
            </section>
        );
    }
}
