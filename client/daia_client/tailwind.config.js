/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{jsx,css}", 
        "./index.html", 
    ],
    theme: {
        extend: {
            colors: {
                primary: "",
                secondary: "",
                "subtle-purple": "#FAF5FF",
                "background-purple": "#F3F3FD",
                "full-purple": "#563890",
                "hover-full-purple": "#352358",
                "dim-purple": "#BBA9DD;",
                "input-background": "#EAF0F7",
                "input-text": "#667085",
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
