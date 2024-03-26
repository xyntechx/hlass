"use client";

import Link from "next/link";
import useSession from "@/lib/supabase/use-session";
import Login from "./buttons/login";
import Account from "./buttons/account";

const Topnav = () => {
    const user = useSession()?.user;

    return (
        <nav className="flex w-screen items-center justify-between p-4">
            {/* // TODO: Insert logo */}
            <Link href="/">Hlass Logo</Link>

            <div className="flex items-center justify-center gap-x-8">
                <NavLink url="/reviews" text="Class Reviews" />
                <NavLink url="/maps" text="Curriculum Maps" />
                <NavLink url="/guide" text="Enrollment Guide" />
            </div>

            {user ? <Account /> : <Login />}
        </nav>
    );
};

export default Topnav;

const NavLink = ({ url, text }: { url: string; text: string }) => {
    return (
        <Link
            href={url}
            className="border-b-2 border-b-transparent px-2 py-1 transition-all hover:border-b-primary-blue hover:text-primary-blue"
        >
            {text}
        </Link>
    );
};
