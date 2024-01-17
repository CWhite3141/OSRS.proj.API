"use client";

import React, { createContext, useState, useContext } from "react";

export const ItemContext = createContext();

// Custom hook to use the context values
export const useItemContext = () => {
	return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
	const [itemData, setItemData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const updateItemData = (data) => {
		try {
			setItemData(data);
		} catch (error) {
			console.error(`Error: ${error}`);
		}
		if (data.length != 0) setIsLoading(false);
	};

	return (
		<ItemContext.Provider
			value={{
				itemData,
				setItemData,
				isLoading,
				setIsLoading,
				updateItemData,
			}}>
			{children}
		</ItemContext.Provider>
	);
};
