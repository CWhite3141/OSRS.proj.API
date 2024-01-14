
import "./globals.css";
import Nav from "./(components)/Nav/Nav";
import Item from "./(components)/Item/Item";


export const metadata = {
	title: "OSRS Dashboard",
	description: "Created by Curtis and Dylan",
};

export default function RootLayout() {
	return (
		<html lang="en">
			<body className="bg-white">
				<Nav />
				<Item />
			</body>
		</html>
	);
}
