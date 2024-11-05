import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        plugin(function({ addVariant }) {
            addVariant('not-last', '&:not(:last-child)')
        }),
        nextui({
            prefix: 'nextui', // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: 'dark', // default theme from the themes object
            defaultExtendTheme: 'dark', // default theme to extend on custom themes
            layout: {
                radius: {
                    small: '8px',
                    medium: '12px',
                    large: '20px',
                },
                borderWidth: {
                    small: '1px',
                    medium: '1px',
                    large: '2px',
                },
            },
            themes: {
                light: {
                    layout: {},
                    colors: {},
                },
                dark: {
                    layout: {},
                    colors: {
                        background: '#0D0A09',
                        primary: '#EA580B',
                    },
                },
            },
        })
    ],
};
export default config;
