import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex w-screen flex-col items-center justify-end gap-y-10 px-4 pt-10">
            <nav className="flex w-full flex-col items-center justify-center gap-x-[200px] gap-y-10 md:flex-row md:items-start">
                <div className="flex flex-col items-center justify-center gap-y-1">
                    <p className="w-full text-center font-bold md:text-left">
                        CREATED BY
                    </p>
                    <Image
                        src="/hbsa.png"
                        alt="HBSA Logo"
                        width={161}
                        height={63}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-y-1">
                    <p className="w-full text-center font-bold md:text-left">
                        RESOURCES
                    </p>
                    <FooterLink url="/reviews" text="Class Reviews" />
                    <FooterLink url="/maps" text="Curriculum Maps" />
                    <FooterLink url="/guide" text="Enrollment Guide" />
                </div>

                <div className="flex flex-col items-center justify-center gap-y-1">
                    <p className="w-full text-center font-bold md:text-left">
                        CONTACT
                    </p>
                    <FooterLink url="/about" text="About Us" />
                    {/* // TODO: Email??? */}
                    <FooterLink url="mailto:" text="Email" />
                    <FooterLink
                        url="https://www.berkeleyhbsa.org/"
                        text="HBSA Website"
                    />
                </div>
            </nav>

            <div className=" h-[10px] w-screen bg-gradient-blue-yellow"></div>
        </footer>
    );
};

export default Footer;

const FooterLink = ({ url, text }: { url: string; text: string }) => {
    return (
        <Link
            href={url}
            className="w-full text-center hover:text-primary-blue md:text-left"
        >
            {text}
        </Link>
    );
};
