'use server'
import {fetchItem} from "@/app/api/fetchItem";
import { useItemQueryContext } from "@/app/contexts/QueryContext";


export async function ItemResults() {
	const itemQuery = useItemQueryContext();
	const results = fetchItem(itemQuery);

	return (
		// Return a valid React element
		(!results) ? (
			<div>Loading...</div>
		) : (
			<div>
				{/* Use results to render data */}
				{results && (
					<p>{results}</p>
					// Adjust this part based on the actual structure of your results
				)}
			</div>
		)
	);
}
