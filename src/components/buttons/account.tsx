import Link from "next/link";

export default function Account() {
    return (
        <Link
            href="/account"
            className="flex w-[100px] items-center justify-center rounded-lg border-2 border-primary-blue bg-primary-blue py-1 text-white transition-shadow hover:shadow-lg"
        >
            My Profile
        </Link>
    );
}
