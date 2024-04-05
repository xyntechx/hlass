import Link from 'next/link';

const ThankYouPage = () => {
    return (
        <>
            <h1 className="text-4xl font-bold p-4">Thank You!</h1>
            <p className="text-l font-bold p-4">Your review has been submitted successfully.</p>
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