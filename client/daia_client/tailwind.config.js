/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{jsx,css}", // this will match all .jsx and .css files in your src directory
        "./index.html", // include this if you have any Tailwind classes in your HTML
    ],
    theme: {
        extend: {
            colors: {
                custom: {
                    50: "#f3f3fc",
                    100: "#c1c1c1",
                    200: "#f2f2fc",
                    300: "#000000",
                    400: "#f0f1fc",
                    500: "#f2f3fc",
                    600: "#ffffff",
                    700: "#f1f2fc",
                    800: "#eff0fc",
                    900: "#edeffb",
                },
            },
            fontFamily: {
                sans: ["Futura", "sans-serif"],
            },
        },
    },
    plugins: [],
};
