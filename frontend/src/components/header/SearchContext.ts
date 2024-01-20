// searchContext.tsx

import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { ISearch } from "@/types";

// Create the initial context with default values
const SearchContext = createContext<
	| {
			searchState: ISearch;
			setSearchState: Dispatch<SetStateAction<ISearch>>;
	  }
	| undefined
>(undefined);

// Create a provider component to wrap your app with
export const SearchProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
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

// Custom hook to use the search context in components
export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error(
			"useSearch must be used within a SearchProvider"
		);
	}
	return context;
};
