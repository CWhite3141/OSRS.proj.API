"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { ISearchQuery } from "@/Types";
import {
	SearchContextValue,
	SearchInputContextValue,
	useSearchContext,
	useSearchInputContext,
} from "@/Context/SearchContext";
import { useLoadingContext } from "@/Context/LoadingContext";
import { useRouter } from "next/navigation";

const Search = () => {
	const router = useRouter();
	const [search, setSearch] = useState<ISearchQuery>({
		search: "",
		category: 1,
		alpha: "",
		page: null,
	});

	const handleInput = (e: FormEvent<HTMLInputElement>) => {
		let inputValue = e.currentTarget.value;

		// validate entry is string, then setSearch(entry)
		if (typeof inputValue === "string") {
			inputValue = inputValue.toLowerCase();
			setSearch((prev) => ({
				...prev,
				search: inputValue,
				alpha: inputValue.charAt(0),
			}));
		}
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

	const { loadingState, setLoadingState } = useLoadingContext();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoadingState(true);
		// console.log(search);
		console.log(searchInputState);
		setSearchState((prev) => ({
			...prev,
			category: search.category,
			alpha: search.alpha,
			page: search.page,
		}));
		router.push("/");
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="relative flex top-1/2 left-1/2 translate-y-2/3 -translate-x-1/2 w-1/3">
				<input //prettier-ignore
					className="search-input text-Maroon font-semibold w-full ps-2 py-1 h-10 rounded-l-md outline-none"
					type="text"
					onChange={handleInput}
					name="search"
					id="search"
					placeholder="Type a letter A - Z . . ."
				/>

				<button
					className="search-button bg-Maroon hover:bg-Brown first-line: h-10 px-2 py-1 rounded-r-md font-bold"
					style={{ fontVariant: "small-caps" }}>
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
