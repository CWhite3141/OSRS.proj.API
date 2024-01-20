"use client";
import React, { createContext, useState, useContext } from "react";

export const ItemQueryContext = createContext();

export const ItemQueryProvider = ({ children }) => {
	const [itemQuery, setItemQuery] = useState({
		category: 1,
		alpha: "a",
		page: 0,
	});

	const updateItemQuery = (query) => {
		try {
			setItemQuery(query);
		} catch (error) {
			console.error(`Error: ${error}`);
		}
		console.log(
			`Update: query: ${query.category}${query.alpha}${query.page}`
		);
	};

	return (
		<ItemQueryContext.Provider
			value={{
				itemQuery,
				setItemQuery,
				updateItemQuery,
			}}>
			{children}
		</ItemQueryContext.Provider>
	);
};

// Custom hook to use the context values
export const useItemQueryContext = () => {
	return useContext(ItemQueryContext);
};
