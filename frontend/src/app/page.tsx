"use client";
import { getItems } from "@/API/OSRS";
import {
	SearchContextValue,
	useSearchContext,
} from "@/Context/SearchContext";
import { useEffect } from "react";

export default function Home() {
	const { searchState } = useSearchContext() as SearchContextValue;
	useEffect(() => {
		console.log(searchState)
		getItems(searchState);
	}, [searchState]);

	// const page: number = 0
	// const pages: [{}] = 
	// const elements = 

	return (
		<div>
			<h2>Hello world!</h2>
		</div>
	);
}
