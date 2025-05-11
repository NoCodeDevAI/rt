import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#eef6ff",
					100: "#d8eaff",
					200: "#b8daff",
					300: "#8ac5ff",
					400: "#54a6ff",
					500: "#2c82ff",
					600: "#1a6af9",
					700: "#1355ea",
					800: "#1644bd",
					900: "#173b94",
					950: "#12276a",
				},
				secondary: {
					50: "#f4f7fb",
					100: "#e9eff7",
					200: "#cedeed",
					300: "#a3c3dc",
					400: "#71a3c7",
					500: "#4f85b3",
					600: "#3b6b97",
					700: "#30557a",
					800: "#2b4866",
					900: "#273e57",
					950: "#172436",
				},
				accent: {
					50: "#f0fbf8",
					100: "#d0f4ea",
					200: "#a3e9d7",
					300: "#6dd7be",
					400: "#39bda0",
					500: "#25a085",
					600: "#1a826c",
					700: "#186858",
					800: "#175347",
					900: "#16453c",
					950: "#0a2722",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				}
			},
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};
