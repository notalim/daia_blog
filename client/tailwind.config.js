/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{jsx,css}",
        "./index.html",
        "./src/@/components/ui/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "subtle-purple": "#FAF5FF",
                "background-purple": "#F3F3FD",
                "dim-purple": "#BBA9DD",
                "lavender-purple": "#E5E1F5",
                "hover-dim-purple": "#D7CEED",
                "mid-purple": "#8971B7",
                "hover-mid-purple": "#50398B",

                "full-purple": "#563890",
                "hover-full-purple": "#352358",

                "peach": "#F8AF91",
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
