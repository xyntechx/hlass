import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <section className="bg-campanile flex min-h-[80vh] w-screen flex-col items-center justify-center gap-y-4 bg-contain bg-[95%_50%] bg-no-repeat p-4">
                <h1 className="text-center text-6xl font-bold">
                    Hlass Resources
                </h1>
                <p className="text-center text-gray-600">
                    The one-stop curriculum resource for Haas Undergraduate
                    Students
                </p>

                {/* // TODO: Use route param queries to search classes in /reviews */}
                <input
                    placeholder="Search Class"
                    className="w-[400px] rounded-full border-2 border-black bg-white bg-opacity-30 px-4 py-1 outline-none"
                />
            </section>

            <section className="bg-gradient-radial-blue-ellipse-left flex min-h-[50vh] w-screen flex-row items-center justify-center gap-x-8 p-4">
                <Image
                    src="/class_reviews_hero.png"
                    alt="Class Reviews Hero Image"
                    width={400}
                    height={400}
                />
                <div className="flex w-[400px] flex-col items-center justify-center gap-y-4 text-left">
                    <div className="flex w-full flex-col items-center justify-center">
                        <h1 className="w-full">UNBIASED</h1>
                        <h1 className="w-full text-4xl font-bold">
                            Class Reviews
                        </h1>
                    </div>
                    <p className="w-full text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <ButtonLink url="/reviews" text="Search Classes" />
                </div>
            </section>

            <section className="flex min-h-[50vh] w-screen flex-row items-center justify-center gap-x-8 p-4">
                <div className="flex w-[400px] flex-col items-center justify-center gap-y-4 text-left">
                    <div className="flex w-full flex-col items-center justify-center">
                        <h1 className="w-full">INDUSTRY-SPECIFIC</h1>
                        <h1 className="w-full text-4xl font-bold">
                            Curriculum Maps
                        </h1>
                    </div>
                    <p className="w-full text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <ButtonLink url="/maps" text="See Pathways" />
                </div>
                <Image
                    src="/curriculum_maps_hero.png"
                    alt="Curriculum Maps Hero Image"
                    width={400}
                    height={400}
                />
            </section>

            <section className="bg-gradient-radial-yellow-ellipse-right flex min-h-[50vh] w-screen flex-row items-center justify-center gap-x-8 p-4">
                <Image
                    src="/enrollment_guide_hero.png"
                    alt="Enrollment Guide Hero Image"
                    width={400}
                    height={400}
                />
                <div className="flex w-[400px] flex-col items-center justify-center gap-y-4 text-left">
                    <div className="flex w-full flex-col items-center justify-center">
                        <h1 className="w-full">COMPREHENSIVE</h1>
                        <h1 className="w-full text-4xl font-bold">
                            Enrollment Guide
                        </h1>
                    </div>
                    <p className="w-full text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <ButtonLink url="/guide" text="Find Guidebooks" />
                </div>
            </section>

            <section className="flex min-h-[50vh] w-screen items-center justify-center p-4">
                <div className="bg-gradient-blue-yellow flex h-fit w-4/5 flex-col items-center justify-center gap-y-8 rounded-md border border-transparent p-8">
                    <h1 className="text-center">ABOUT US</h1>
                    <h1 className="w-[600px] text-center text-4xl font-bold">
                        A centralized platform of class resources for Haas
                        students
                    </h1>
                    <ButtonLink url="/about" text="Learn More" />
                </div>
            </section>
        </>
    );
}

const ButtonLink = ({ url, text }: { url: string; text: string }) => {
    return (
        <Link
            href={url}
            className="rounded-full border-2 border-primary-blue bg-primary-blue px-8 py-1 text-white transition-shadow hover:shadow-lg"
        >
            {text}
        </Link>
    );
};
