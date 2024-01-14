"use client";
import React from 'react'

const Search = () => {
  return (
    <div className="absolute flex top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/3">
			<input //prettier-ignore
				className="text-Maroon font-semibold w-full ps-2 py-1 h-10 rounded-l-md shadow-md border-r-2 outline-none"
				type="text"
				name="search"
				id="search"
				placeholder="GE Item Lookup..."
			/>

			<button
				className="bg-Maroon hover:bg-Brown first-line: h-10 px-2 py-1 rounded-r-md shadow-md "
				style={{ fontVariant: "small-caps" }}>
				Search
			</button>
		</div>
  )
}

export default Search
