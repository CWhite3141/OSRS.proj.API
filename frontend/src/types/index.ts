export interface ISearch {
	category: number | null;
	alpha: string | null;
	page: number | null;
}

export interface ISearchQuery extends ISearch {
	search: string | null;
}
