// searchContext.tsx
"use client";
import React, {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";
import { ISearch } from "@/Types";

// Define the type for the context value
export interface SearchContextValue {
	searchState: ISearch;
	setSearchState: Dispatch<SetStateAction<ISearch>>;
}

// Create the initial context with default values
const SearchContext = createContext<SearchContextValue | undefined>(
	undefined
);

// Create a provider component to wrap your app with
export const SearchContextProvider = ({ children }) => {
	const [searchState, setSearchState] = useState<ISearch>({
		category: null,
		alpha: null,
		page: null,
	});

	return (
		<SearchContext.Provider value={{ searchState, setSearchState }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => useContext(SearchContext);
