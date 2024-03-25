"use client";

import Link from "next/link";
import useSession from "@/lib/supabase/use-session";
import Login from "./buttons/login";
import Account from "./buttons/account";
import Logout from "./buttons/logout";

const Topnav = () => {
    const user = useSession()?.user;

    return (
        <nav className="flex w-screen items-center justify-between p-4">
            {/* // TODO: Insert logo */}
            <Link href="/">Hlass Logo</Link>

            <div className="flex items-center justify-center gap-x-8">
                <Link
                    href="/reviews"
                    className="rounded-lg border-2 border-light-blue px-2 py-1 transition-colors hover:border-primary-blue"
                >
                    Class Reviews
                </Link>
                <Link
                    href="/maps"
                    className="rounded-lg border-2 border-light-blue px-2 py-1 transition-colors hover:border-primary-blue"
                >
                    Curriculum Maps
                </Link>
                <Link
                    href="/guide"
                    className="rounded-lg border-2 border-light-blue px-2 py-1 transition-colors hover:border-primary-blue"
                >
                    Enrollment Guide
                </Link>
            </div>

            {user ? <Account /> : <Login />}
        </nav>
    );
};

export default Topnav;
