"use client";
import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

const LoadingContext = createContext<
	LoadingContextValue | undefined
>(undefined);

interface LoadingContextValue {
	loadingState: boolean;
	setLoadingState: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContextProvider = ({ children }) => {
	const [loadingState, setLoadingState] = useState<boolean>(false);

	const contextValue: LoadingContextValue = {
		loadingState,
		setLoadingState,
	};

	return (
		<LoadingContext.Provider value={contextValue}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoadingContext = () => useContext(LoadingContext);
