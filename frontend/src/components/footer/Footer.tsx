import React from "react";
import Copy from "./Copy";

const Footer = () => {
	return (
		<footer
			className="bg-Sienna w-full flex justify-center align-bottom"
			style={{
				height: "100px",
				borderTop: "1px solid black",
				boxShadow: "1px 0px 5px black",
			}}>
        <div className="">
        <Copy />
        </div>
			
		</footer>
	);
};

export default Footer;
