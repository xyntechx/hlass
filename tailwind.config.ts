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
                "gradient-green-blue":
                    "linear-gradient(275deg, rgb(106.4, 247.11, 189.25) 7.5%, rgba(181.3, 242.98, 246.92, 0.6) 100%)",
                "gradient-yellow-orange":
                    "linear-gradient(275deg,rgba(255,202.88,68.86,0.54)0.99%,rgba(255,237.57,64.6,0.46)100%)",
                "gradient-red-pink":
                    "linear-gradient(275deg, rgba(254.85,7.45,9.95,0.4) 10.34%, rgba(249.41,168.74,221.98,0.5) 99%)",
                "gradient-radial-blue-ellipse-left":
                    "radial-gradient(200px 200px at 2% 50%, hsl(209, 100%, 70%) 0%, hsl(0, 0%, 100%) 100%)",
                "gradient-radial-yellow-ellipse-right":
                    "radial-gradient(200px 200px at 98% 50%, hsl(58, 100%, 70%) 0%, hsl(0, 0%, 100%) 100%)",
                "gradient-blue-yellow":
                    "linear-gradient(280deg, rgba(255, 252, 188, 0.42) 4.46%, rgba(221, 247, 255, 0.57) 91.22%, rgba(221, 247, 255, 0.57) 91.22%)",
                campanile: "url('/campanile.png')",
            },
            spacing: {
                '1/3': '33.333%',
            },
        },
    },
    plugins: [],
};
export default config;
