"use client";
import React, { useState } from "react";
import fetchItem from "@/app/api/fetchItem";
import { useItemContext } from "@/app/contexts/ItemContext";
import { useRouter } from "next/navigation";

const Search = () => {
	const [search, setSearch] = useState({
		category: 1,
		item: "",
		page: 0,
	});

	const handleInput = (event) => {
		setSearch({
			...search,
			[event.target.name]: event.target.value,
		});
	};
	const { updateItemData, isLoading } = useItemContext();

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		router.push("/pages/SearchResults/");
		try {
			const response = await fetchItem(search);
			updateItemData(response);
		} catch (error) {
			console.error(`Error fetching item data: ${error.message}`);
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="absolute flex top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/3">
				<input //prettier-ignore
					className="text-Maroon font-semibold w-full ps-2 py-1 h-10 rounded-l-md shadow-md border-r-2 outline-none"
					type="text"
					onChange={handleInput}
					name="item"
					id="item"
					placeholder="Enter Item Name..."
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
