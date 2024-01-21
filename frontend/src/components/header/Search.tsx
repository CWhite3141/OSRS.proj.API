"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ISearchQuery } from "@/Types";
import {
	SearchContextValue,
	SearchInputContextValue,
	useSearchContext,
	useSearchInputContext,
} from "@/Context/SearchContext";

const Search = () => {
	// const router = useRouter();
	const [search, setSearch] = useState<ISearchQuery>({
		search: "",
		category: 1,
		alpha: "",
		page: 1,
	});

	const handleInput = (e: FormEvent<HTMLInputElement>) => {
		const inputValue = e.currentTarget.value;
		setSearch((prev) => ({
			...prev,
			search: inputValue,
			alpha: inputValue.charAt(0),
		}));
	};

	// Load the setSearchInputState and searchInputState from SearchContext
	const { searchInputState, setSearchInputState } =
		useSearchInputContext() as SearchInputContextValue;
	useEffect(() => {
		setSearchInputState(search);
		console.log(searchInputState);
	}, [search]);

	// Load the setSearchState from SearchContext
	const { setSearchState } =
		useSearchContext() as SearchContextValue;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log(search);
		console.log(searchInputState);
		setSearchState((prev) => ({
			...prev,
			category: search.category,
			alpha: search.alpha,
			page: search.page,
		}));
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="relative flex top-1/2 left-1/2 translate-y-2/3 -translate-x-1/2 w-1/3">
				<input //prettier-ignore
					className="text-Maroon font-semibold w-full ps-2 py-1 h-10 rounded-l-md shadow-md border-r-2 outline-none"
					type="text"
					onChange={handleInput}
					name="search"
					id="search"
					placeholder="Type a letter A - Z . . ."
				/>

				<button
					className="bg-Maroon hover:bg-Brown first-line: h-10 px-2 py-1 rounded-r-md shadow-md "
					style={{ fontVariant: "small-caps" }}>
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
