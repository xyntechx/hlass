import Link from "next/link";

const ThankYouPage = () => {
    return (
        <>
            <h1 className="p-4 text-4xl font-bold">Thank You!</h1>
            <p className="text-l p-4 font-bold">
                Your review has been submitted successfully.
            </p>
            <Link
                href="/reviews"
                className="flex items-center justify-center rounded-full border-2 border-primary-blue bg-primary-blue px-4 py-1 text-white transition-shadow hover:shadow-lg"
            >
                Return To Reviews
            </Link>
        </>
    );
};

export default ThankYouPage;
