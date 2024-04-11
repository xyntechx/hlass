import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-blue": "hsl(209, 100%, 20%)",
                "secondary-blue": "hsl(209, 100%, 70%)",
                "primary-yellow": "hsl(58, 100%, 70%)",
                dim: "hsl(0, 0%, 0%, 50%)",
            },
            backgroundImage: {
                "gradient-radial-blue-ellipse-left":
                    "radial-gradient(200px 200px at 2% 50%, hsl(209, 100%, 70%) 0%, hsl(0, 0%, 100%) 100%)",
                "gradient-radial-yellow-ellipse-right":
                    "radial-gradient(200px 200px at 98% 50%, hsl(58, 100%, 70%) 0%, hsl(0, 0%, 100%) 100%)",
                "gradient-blue-yellow":
                    "linear-gradient(280deg, rgba(255, 252, 188, 0.42) 4.46%, rgba(221, 247, 255, 0.57) 91.22%, rgba(221, 247, 255, 0.57) 91.22%)",
                campanile: "url('/campanile.png')",
            },
        },
    },
    plugins: [],
};
export default config;
