import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/header/Nav";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ItemProvider } from "./contexts/ItemContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "OSRS GE Stonkz",
	description:
		"This is a simple app that displays the price history for F2P and P2P items available on the Grand Exchange.",
};

export default function RootLayout({ children }) {
	return (
		<ThemeProvider>
			<html lang="en">
				<body className={inter.className}>
					<ItemProvider>
						<Nav />
						{children}
					</ItemProvider>
				</body>
			</html>
		</ThemeProvider>
	);
}
