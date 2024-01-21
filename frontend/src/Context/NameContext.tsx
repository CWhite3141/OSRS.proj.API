"use client";

import { createContext, useContext, useState } from "react";

const nameContext = createContext({});

interface Props {
	children: React.ReactNode;
}

export const NameContextProvider = ({ children }: Props) => {
	const [Name, setName] = useState<string>("Ashish");

	return (
		<nameContext.Provider value={{ Name }}>
			{children}
		</nameContext.Provider>
	);
};

export const useNameContext = () => useContext(nameContext);
