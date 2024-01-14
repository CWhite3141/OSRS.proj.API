import React from "react";
import ItemPriceChart from "./ItemPriceChart";

const Item = () => {
	return (
		<div className="bg-white">
			<div>
				<h1>Welcome to the Item Page!</h1>
			</div>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<ItemPriceChart />
			</div>
		</div>
	);
};

export default Item;
