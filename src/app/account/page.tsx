"use client";

import useSession from "@/lib/supabase/use-session";

export default function Account() {
    const user = useSession()?.user;

    return (
        <>
            {user ? (
                <>
                    <p>{`username: ${user?.user_metadata?.full_name}`}</p>
                    <p>{`email: ${user?.email}`}</p>
                </>
            ) : (
                <p>Loading ...</p>
            )}
        </>
    );
}
