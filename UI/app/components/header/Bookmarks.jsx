"use client";
import React, { useState } from "react";
import Link from "next/link";

const Bookmarks = () => {
	const [isBookmarksOpened, setIsBookmarksOpened] = useState(false);
	const handleBookmarksToggle = () => {
		setIsBookmarksOpened(!isBookmarksOpened);
	};

	const bookmarks = [
		{
			folder: "Folder 1",
			items: [
				{ item: "cabbage", id: 420 },
				{ item: "rawhide", id: 69 },
			],
		},
		{
			folder: "Folder 2",
			items: [
				{ item: "apple", id: 123 },
				{ item: "banana", id: 456 },
			],
		},
		// Add more folders as needed
	];

	const [folderStates, setFolderStates] = useState(
		bookmarks.reduce((acc, folder) => {
			acc[folder.folder] = false; // Initialize all folder as closed
			return acc;
		}, {})
	);

	const handleFolderToggle = (folderName) => {
		setFolderStates((prevStates) => ({
			...prevStates,
			[folderName]: !prevStates[folderName], // Toggle the state for the clicked folder
		}));
	};

	const handleLink = () => {
		
	}

	return (
		<div className="absolute top-1/2 -translate-y-1/2 right-10 cursor-pointer z-50">
			<p
				onClick={handleBookmarksToggle}
				className={
					isBookmarksOpened ? `bookmarks-opened` : `bookmarks-closed`
				}>
				Bookmarks
			</p>
			{isBookmarksOpened && (
				<ul className="absolute w-full rounded-b-md z-50">
					{bookmarks.map((folder) => (
						<li
							className="bookmarks-folder"
							key={folder.folder}>
							<p onClick={() => handleFolderToggle(folder.folder)}>
								{folder.folder}
							</p>

							{folderStates[folder.folder] && (
								<ul>
									{folder.items.map((item) => (
										<li
											className="bookmarks-item"
											key={item.id}>
												<Link href={`/pages/ItemDisplay/${item.id}`}>{item.item}</Link>
											
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Bookmarks;
