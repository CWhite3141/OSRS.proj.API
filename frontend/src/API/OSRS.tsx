import { ISearch } from "@/Types";
import axios from "axios";

const BaseURI = "https://localhost:5237";
const GetItemsURI = "/OSRSGe/GetItems";
const GetItemDetailsURI = "/OSRSGe/GetItemDetails";

export interface ITrendingInfo {
	trend: string | null;
	change: string | null;
}

export interface IPriceInfo {
	trend: string | null;
	price: string | null;
}

export interface IItemsResponse {
	total: number;
	items: [];
}

export interface IItem {
	icon: string | null;
	iconLarge: string | null;
	id: number | null;
	type: string | null;
	typeIcon: string | null;
	name: string | null;
	description: string | null;
	day30: ITrendingInfo;
	day90: ITrendingInfo;
	current: IPriceInfo;
	today: IPriceInfo;
	members: boolean | null;
}

export interface IItemDetails {
	item: IItem
}

// export const getItems = (search: ISearch) => {
// 	axios
// 		// .request(OPTIONS)
// 		.post(`${BaseURI}${GetItemsURI}`, search, {
// 			headers: {
// 				Accept: "text/plain",
// 				"Content-Type": "application/json",
// 			},
// 		})
// 		.then(function ({ data }: { data: IItemsResponse | null}) {
// 			console.log(data);
// 			return data

// 		})
// 		.catch(function (error: any) {
// 			console.log(`Error in getItems() request: ${error}`);
// 		});

// }

export const getItems = async (
	search: ISearch
): Promise<IItemsResponse | null> => {
	if (search === null) {
		return null;
	}
	try {
		const response = await axios.post(
			`${BaseURI}${GetItemsURI}`,
			search,
			{
				headers: {
					Accept: "text/plain",
					"Content-Type": "application/json",
				},
			}
		);

		console.log("Success");
		return response.data;
	} catch (error) {
		console.log(`Error in getItems() request: ${error}`);
		// You might want to handle the error or return something specific here
		return null;
	}
};

export const getItemDetails = async (
	query: {}
): Promise<IItemDetails | null> => {
	if (query === null) {
		return null;
	}
	try {
		const response = await axios.post(
			`${BaseURI}${GetItemDetailsURI}`,
			query,
			{
				headers: {
					Accept: "text/plain",
					"Content-Type": "application/json",
				},
			}
		);
		console.log("Successful getItemDetails request");
		return response.data;
	} catch (error) {
		console.log(`Error in getItems() request: ${error}`);
		// You might want to handle the error or return something specific here
		return null;
	}
};
