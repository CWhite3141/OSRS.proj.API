"use client";
import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
	const [itemData, setItemData] = useState([]);

	const updateItemData = (data) => {
		setItemData(data);
	};

	return (
		<ItemContext.Provider value={{ itemData, updateItemData }}>
			{children}
		</ItemContext.Provider>
	);
};

export const useItemContext = () => {
	return useContext(ItemContext);
};
