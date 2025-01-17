/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		"postcss-import": {},
		"tailwindcss/nesting": {},
		"postcss-flexbugs-fixes": {},
		"postcss-preset-env": {
			autoprefixer: {
				flexbox: "no-2009",
			},
			stage: 3,
			features: {
				"custom-properties": false,
			},
		},
		"@fullhuman/postcss-purgecss": {
			content: [
				"./pages/**/*.{js,ts,jsx,tsx,mdx}",
				"./components/**/*.{js,ts,jsx,tsx,mdx}",
				"./app/**/*.{js,ts,jsx,tsx,mdx}",
			],
			defaultExtractor: (/** @type {string} */ content) =>
				content.match(/[\w-/:]+(?<!:)/g) || [],
			safelist: ["html", "body"],
		},
		"tailwindcss": {},
		"autoprefixer": {},
	},
};

export default config;
