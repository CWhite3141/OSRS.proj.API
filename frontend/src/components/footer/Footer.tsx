import React from "react";
import Copy from "./Copy";

const Footer = () => {
	return (
		<footer
			className="bg-Sienna flex flex-col w-full mt-10"
			style={{
				height: "100px",
				borderTop: "1px solid black",
				boxShadow: "1px 0px 5px black",
			}}>
				<div className="h-full"></div>
			<Copy />
		</footer>
	);
};

export default Footer;
