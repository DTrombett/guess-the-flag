import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import "./globals.css";

const description =
	"Test your skill at guessing flags from all over the world or just specific regions!";
const title = "Guess The Flag";
const font = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

export const metadata: Metadata = {
	applicationName: title,
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	description,
	generator: "next-on-pages",
	icons: { icon: "/favicon.ico" },
	keywords: ["react", "nextjs", "flags", "game"],
	metadataBase: new URL("https://guesstheflag.trombett.org"),
	openGraph: {
		type: "website",
		countryName: "Italy",
		description,
		locale: "it",
		siteName: title,
		title,
		url: "https://guesstheflag.trombett.org",
		emails: "contact@trombett.org",
		// TODO
		// images: "/image.png"
	},
	publisher: "D Trombett",
	title,
	twitter: {
		card: "summary_large_image",
		description,
		creator: "@dtrombett",
		title,
		// TODO
		// images: "/image.png",
	},
};

export const viewport: Viewport = { themeColor: "#27272A" };

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={`${font.className} flex flex-col items-center justify-center min-h-screen p-4 text-white bg-zinc-800`}
		>
			<Suspense>{children}</Suspense>
		</body>
	</html>
);

export default RootLayout;
