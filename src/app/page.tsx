import Topnav from "@/components/topnav";

export default function Home() {
    return (
        <main className="flex w-screen min-h-screen flex-col items-center justify-center p-4">
            <Topnav />
            <h1>This is the homepage for Hlass</h1>
        </main>
    );
}
