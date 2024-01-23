"use client";

import React, { useEffect, useState } from "react";
import {
	IItem,
	IItemsResponse,
	IPriceInfo,
	ITrendingInfo,
	getItems,
} from "@/API/OSRS";
import {
	SearchContextValue,
	useSearchContext,
} from "@/Context/SearchContext";
import Image from "next/image";
import Link from "next/link";
import { useLoadingContext } from "@/Context/LoadingContext";
import Loading from "@/Components/Loading/Loading";

export default function Home() {
	const { loadingState, setLoadingState } = useLoadingContext();
	const { searchState, setSearchState } =
		useSearchContext() as SearchContextValue;
	// pageNumber is the index of the items object array of items pages
	const [pageNumber, setPageNumber] = useState<number>(0);
	// Data from the fetchItems return
	const [items, setItems] = useState<IItemsResponse | null>(null);

	const handleClick = (action: string) => {
		setPageNumber((pageNumber) =>
			action === "next" ? pageNumber + 1 : pageNumber - 1
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getItems(searchState);
				setItems(response);
			} catch (error) {
				console.log(`Error fetching items: ${error}`);
				// Handle the error if needed
			} finally {
				setLoadingState(false);
			}
		};
		fetchData();
	}, [searchState, setLoadingState]);

	// useEffect(() => {
	// 	setSearchState((prev) => ({
	// 		...prev,
	// 		page: pageNumber,
	// 	}));
	// }, [pageNumber, setSearchState]);

	useEffect(() => {
		console.log(items);
	}, [items]);

	return (
		<div className="min-h-screen">
			<div>
				<h1>OSRS Grand Exchange Price Service</h1>
				<p>
					Welcome to the OSRS Grand Exchange Price Service! This is a
					WIP and for now you can only search items by alphabetical
					order, but feel free to make a search and then click on an
					item to see more info.
				</p>
			</div>
			{loadingState ? ( // Render "Loading..." if loadingState is true
				<Loading />
			) : items ? (
				// Render your items here using the 'items' state
				<div
					id="itemsList"
					className="flex flex-col">
					<div className="flex flex-wrap justify-evenly">
						{items[pageNumber]?.items?.map((item: IItem) => (
							<Link
								href={`/Item/${item.id}`}
								key={item.id}>
								<div
									className="card hover:bg-Maroon my-5"
									style={{ height: "200px", width: "350px" }}>
									<h3>{item.name}{item.members ? (
										<span className="members">&nbsp;(m)</span>
									) : (
										null
									)}</h3>
									{item.icon ? (
										<Image
											src={item.icon}
											alt={
												item.description ||
												"No description available"
											}
											width={100}
											height={100}
											className="mx-auto"
										/>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="50"
											height="50"
											viewBox="0 0 50 50">
											<rect
												width="100%"
												height="100%"
												fill="#ccc"
											/>
											<text
												x="50%"
												y="50%"
												fill="#000"
												textAnchor="middle"
												alignmentBaseline="middle">
												No image
											</text>
										</svg>
									)}
								</div>
							</Link>
						))}
					</div>
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
			) : (
				// Render a loading message when items are being fetched
				<div></div>
			)}
		</div>
	);
}
