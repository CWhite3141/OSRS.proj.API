'use client'
import React, { useEffect, useState } from "react";
import {fetchItemData} from "@/app/(services)/fetchService";

const ItemPriceChart = () => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchItemData(21787);
				setDailyData(data.daily);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
		};
		fetchData();
	}, []);
	return (
		<div>
			<ul>
				{dailyData.map((value, index) => (
					<li key={index}>{value}</li>
				))}
			</ul>
		</div>
	);
};

export default ItemPriceChart;
