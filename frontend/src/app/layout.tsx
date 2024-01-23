import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Header/Nav";
import Footer from "@/Components/Footer/Footer";
import { SearchContextProvider } from "@/Context/SearchContext";
import { LoadingContextProvider } from "@/Context/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "OSRS Grand Exchange Price Service",
	description: "An Old School Runescape Grand Exchange Item Price History Lookup Service. Developed by Curtis White and Dylan Beebe.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} flex flex-col w-full min-h-screen`}>
				<SearchContextProvider>
					<LoadingContextProvider>
						<Nav />
						<main className="container flex-grow w-full mx-auto">
							{children}
						</main>
						<Footer />
					</LoadingContextProvider>
				</SearchContextProvider>
			</body>
		</html>
	);
}
