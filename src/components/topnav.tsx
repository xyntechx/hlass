"use client";

import Link from "next/link";
import useSession from "@/lib/supabase/use-session";
import Login from "./buttons/login";
import Account from "./buttons/account";

const Topnav = () => {
    const user = useSession()?.user;

    return (
        <nav className="flex w-screen items-center justify-between px-4 py-2 ">
            {/* // TODO: Insert logo */}
            <Link href="/">Hlass Logo</Link>

            <div className="flex items-center justify-center gap-x-8">
                <Link
                    href="/reviews"
                    className="border-b-2 border-b-transparent px-2 py-1 transition-all hover:border-b-primary-blue hover:text-primary-blue"
                >
                    Class Reviews
                </Link>
                <Link
                    href="/maps"
                    className="border-b-2 border-b-transparent px-2 py-1 transition-all hover:border-b-primary-blue hover:text-primary-blue"
                >
                    Curriculum Maps
                </Link>
                <Link
                    href="/guide"
                    className="border-b-2 border-b-transparent px-2 py-1 transition-all hover:border-b-primary-blue hover:text-primary-blue"
                >
                    Enrollment Guide
                </Link>
            </div>

            {user ? <Account /> : <Login />}
        </nav>
    );
};

export default Topnav;
