import Link from "next/link";

export default function Account() {
    return (
        <Link
            href="/account"
            className="flex items-center justify-center rounded-full border-2 border-primary-blue bg-primary-blue px-4 py-1 text-white transition-shadow hover:shadow-lg"
        >
            My Profile
        </Link>
    );
}
