"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ItemStats from "../../../components/itemPage/ItemStats";
import ItemChart from "../../../components/itemPage/ItemChart";

const ItemDisplay = () => {
	const router = useRouter();
	const { id } = router.query ?? {};

	console.log(`Router query: ${id}`);
	return (
		<div>
			<ItemStats item={id} />
			<ItemChart item={id} />
		</div>
	);
};

export default ItemDisplay;
