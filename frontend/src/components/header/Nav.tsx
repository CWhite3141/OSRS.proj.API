"use client";
import React from "react";
import Search from "./Search";
import Home from "./Home";

const Nav = () => {
	return (
		<div //prettier-ignore
			className="bg-Sienna w-full sticky top-0"
			style={{
				height: "100px",
				borderBottom: "1px solid black",
				boxShadow: "0px 1px 5px black",
			}}>
			<Home />
			<Search />
		</div>
	);
};

export default Nav;
