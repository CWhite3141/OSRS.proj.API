import { ISearch } from "@/Types";
import axios from "axios";


const BaseURI = "https://localhost:5237";
const GetItemsURI = "/OSRSGe/GetItems";
// const GetItemDetailsURI = "/OSRSGe/GetItemDetails";

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
	items: [
		item: IItem,
	];
}

export interface IItem {
	item: {
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
}

export function getItems(search: ISearch) {
	axios
		// .request(OPTIONS)
		.post(`${BaseURI}${GetItemsURI}`, search, {
			headers: {
				Accept: "text/plain",
				"Content-Type": "application/json",
			},
		})
		.then(function ({ data }: { data: IItemsResponse }) {
			console.log(data);
			// return data;
		})
		.catch(function (error: any) {
			console.log(`Error in getItems() request: ${error}`);
		});
}
