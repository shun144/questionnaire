import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                appear: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                slide: {
                    "0%": {
                        transform: "translateX(-25%)"
                    },
                    "100%": {
                        transform: "translateX(25%)"
                    }
                }
            },
            animation: {
                appear: "appear 1.5s ease 2s 1 forwards",
                slide: "slide 40s ease-in-out infinite alternate",
            },
        },
        screens: {
            'xs': '375px',
            hoverable: { raw: '(hover: hover) and (pointer: fine)' },
            ...defaultTheme.screens,
        },
    },

    plugins: [forms],

    future: {
        hoverOnlyWhenSupported: true,
    },
};
