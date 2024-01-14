'use client'
import React, { useState } from "react";

const Bookmarks = () => {
	const [isOpened, setIsOpened] = useState(false);
	const handleToggle = () => {
		setIsOpened(!isOpened);
	};
	const bookmarks= ["Folder One", "Item 1", "Item 2"];

	return (
		<div //prettier-ignore
			className="absolute top-1/2 -translate-y-1/2 right-10 cursor-pointer"
			onClick={handleToggle}>
			<p
				className={
					isOpened
						? `text-Black rounded-t-md font-bold text-2xl  px-2 py-1 border border-b-0 border-Black bg-SlateGray hover:bg-opacity-90 hover:bg-LightSlateGray hover:text-SteelBlue`
						: `text-SteelBlue font-bold text-2xl hover:underline px-2 py-1`
				}>
				Bookmarks
			</p>
			{isOpened && (
				<ul className="absolute w-full border border-Black rounded-b-md">
					<li className="ps-2 py-1 bg-SlateGray hover:bg-LightSlateGray">Add Bookmark</li>
					<li className="ps-2 py-1 bg-SlateGray hover:bg-LightSlateGray">Add Folder</li>
					{bookmarks.map((bookmark, index) => (
						<li
							key={index}
							className="ps-2 py-1 bg-SlateGray hover:bg-LightSlateGray last-of-type:rounded-b-md">
							{bookmark}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Bookmarks
