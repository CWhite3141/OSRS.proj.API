"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IItemDetails, getItemDetails } from "@/API/OSRS";
import Image from "next/image";
import Loading from "@/Components/Loading/Loading";

export default function Page() {
	const pathname = usePathname();
	const match = pathname.match(/\/Item\/(\d+)/);
	const [itemDetails, setItemDetails] =
		useState<IItemDetails | null>(null);
	let itemID: number | null = null;

	if (match !== null) {
		itemID = Number(match[1]);
	}

	useEffect(() => {
		const query = {
			item: itemID,
		};
		const fetchData = async () => {
			try {
				if (itemID != null) {
					const response = await getItemDetails(query);
					setItemDetails(response);
				}
			} catch (error) {
				console.log(`Error fetching items: ${error}`);
				// Handle the error if needed
			}
		};
		fetchData();
	}, [itemID]);

	console.log(itemDetails);

	return (
		<div className="w-full min-h-screen">
			{itemDetails ? (
				// Render your items here using the 'itemDetails' state
				<div
					id="itemPage"
					className="">
					<div
						id="itemCard"
						className="card flex justify-between w-4/5 h-auto">
						<div className="flex flex-row-reverse">
							<div
								id="itemHeading"
								className="ms-5">
								<h2>
									{itemDetails.item.name}
									{itemDetails.item.members ? (
										<span className="members">&nbsp;(m)</span>
									) : (
										null
									)}
								</h2>
								<p>{itemDetails.item.description}</p>
							</div>
							<div>
								{itemDetails.item.icon ? (
									<Image
										src={itemDetails.item.icon}
										alt={
											itemDetails.item.description ||
											"No description available"
										}
										width={100}
										height={100}
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
						</div>

						<div
							id="itemDetails"
							className="flex flex-col">
							<p>
								Current Price:{" "}
								<span
									className={`${
										itemDetails.item.today.trend === "positive"
											? "positive"
											: itemDetails.item.today.trend === "negative"
											? "negative"
											: "neutral"
									}`}>
									{itemDetails.item.current.price}
								</span>
							</p>
							<p>
								30-day: <span className={``}></span>
							</p>
							<p>
								90-day: <span className={``}></span>
							</p>
							<p>
								180-day: <span className={``}></span>
							</p>
						</div>
					</div>
				</div>
			) : (
				// Render a loading message when items are being fetched
				<Loading />
			)}
		</div>
	);
}
