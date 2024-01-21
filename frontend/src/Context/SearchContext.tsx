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
import { ISearchQuery } from "@/Types";

// Define the type for the context value
export interface SearchContextValue {
	searchState: ISearch;
	setSearchState: Dispatch<SetStateAction<ISearch>>;
}

export interface SearchInputContextValue {
	searchInputState: ISearchQuery;
	setSearchInputState: Dispatch<SetStateAction<ISearchQuery>>;
}

// Create the initial context with default values
const SearchContext = createContext<SearchContextValue | undefined>(
	undefined
);

const SearchInputContext = createContext<
	SearchInputContextValue | undefined
>(undefined);

// Create a provider component to wrap your app with
export const SearchContextProvider = ({ children }) => {
	const [searchState, setSearchState] = useState<ISearch>({
		category: null,
		alpha: null,
		page: null,
	});

	const [searchInputState, setSearchInputState] =
		useState<ISearchQuery>({
			search: null,
			category: null,
			alpha: null,
			page: null,
		});

	return (
		<SearchInputContext.Provider
			value={{ searchInputState, setSearchInputState }}>
			<SearchContext.Provider
				value={{ searchState, setSearchState }}>
				{children}
			</SearchContext.Provider>
		</SearchInputContext.Provider>
	);
};

// SearchContext is for the axios request headers
export const useSearchContext = () => useContext(SearchContext);
// SearchInputContext includes the actual 'search' string
// for matching the response objects to the search query
export const useSearchInputContext = () =>
	useContext(SearchInputContext);
