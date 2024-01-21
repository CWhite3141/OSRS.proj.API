"use client";

import React, { useEffect, useState } from "react";
import { IPriceInfo, ITrendingInfo, getItems } from "@/API/OSRS";
import {
	SearchContextValue,
	useSearchContext,
} from "@/Context/SearchContext";

export default function Home() {
	const { searchState, setSearchState } =
		useSearchContext() as SearchContextValue;
	const [pageNumber, setPageNumber] = useState(1);

	const handleClick = (action: string) => {
		setPageNumber((pageNumber) =>
			action === "next" ? pageNumber + 1 : pageNumber - 1
		);
	};

	useEffect(() => {
		console.log(searchState);
		getItems(searchState);
	}, [searchState]);

	useEffect(() => {
		setSearchState((prev) => ({
			...prev,
			page: pageNumber,
		}));
	}, [pageNumber, setSearchState]);

	return (
		<div className="">
			<div
				id="pageNumberButtons"
				className="flex justify-around w-full">
				<button
					className="bg-Brown rounded-md px-2 py-1 mt-5"
					onClick={() => handleClick("prev")}>
					Prev
				</button>
				<button
					className="bg-Brown rounded-md px-2 py-1 mt-5"
					onClick={() => handleClick("next")}>
					Next
				</button>
			</div>
		</div>
	);
}
