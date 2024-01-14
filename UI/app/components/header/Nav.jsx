"use client";
import React from "react";
import Search from "./Search";
import Bookmarks from "./Bookmarks";
import Home from "./Home";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
	return (
		<div //prettier-ignore
			className="bg-Sienna w-full relative"
			style={{
				height: "100px",
				borderBottom: "1px solid black",
				boxShadow: "0px 1px 5px black",
			}}>
			<Home />
			<ThemeToggle />
			<Search />
			<Bookmarks />
		</div>
	);
};

export default Nav;
