/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{jsx,css}", // this will match all .jsx and .css files in your src directory
        "./index.html", // include this if you have any Tailwind classes in your HTML
    ],
    theme: {
        extend: {
            colors: {
                'primary': '',
                'secondary': '',
                "subtle-purple": "#FAF5FF",
                "background-purple": "#F3F3FD",
                "dim-purple": "#BBA9DD;",
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
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    plugins: [],
};
