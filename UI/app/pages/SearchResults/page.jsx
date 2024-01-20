"use client";

import { ItemQueryProvider } from "@/app/contexts/QueryContext";
import { ItemResults } from "./ItemResults";
import ResultsPage from "./ResultsPage";

const SearchResults = () => {
	return (
		<div>
			<ItemQueryProvider>
				<ResultsPage>
					<ItemResults />
				</ResultsPage>
			</ItemQueryProvider>
		</div>
	);
};

export default SearchResults;
