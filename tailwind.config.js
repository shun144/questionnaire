import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                appear: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                slide: {
                    "0%": {
                        transform: "translateX(-25%)",
                    },
                    "100%": {
                        transform: "translateX(25%)",
                    },
                },
            },
            animation: {
                appear: "appear 1.5s ease 2s 1 forwards",
                slide: "slide 40s ease-in-out infinite alternate",
            },
            height: {
                "1/12": "8.33%",
                "2/12": "16.67%",
                "3/12": "25%",
                "4/12": "33.33%",
                "5/12": "41.67%",
                "6/12": "50%",
                "7/12": "58.33%",
                "8/12": "66.67%",
                "9/12": "75%",
                "10/12": "83.33%",
                "11/12": "91.67%",
                "12/12": "100%",
            },
        },
        screens: {
            xs: "375px",
            hoverable: { raw: "(hover: hover) and (pointer: fine)" },
            ...defaultTheme.screens,
        },
    },

    plugins: [
        forms,
        function ({ addUtilities, theme }) {
            const topValues = theme("spacing");

            const customTopUtilities = Object.entries(topValues).reduce(
                (acc, [key, value]) => {
                    acc[`.react-flow__panel.top.panel-top-${key}`] = {
                        top: value,
                    };
                    return acc;
                },
                {}
            );
            // ユーティリティを追加
            addUtilities(customTopUtilities, ["responsive"]);
        },
    ],

    future: {
        hoverOnlyWhenSupported: true,
    },
};
