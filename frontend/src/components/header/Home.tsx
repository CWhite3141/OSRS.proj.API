"use client";
import React, { useState } from "react";
import Link from "next/link";

const Home = () => {
	const [hovered, setHovered] = useState(false);
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-10">
			<Link href="/">
				<svg //prettier-ignore
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					width="36px"
					height="36px"
					viewBox="0 0 21 21">
					<g //prettier-ignore
						id="Page-1"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd">
						<g
							transform="translate(-381.000000, -720.000000)"
							className={hovered ? `fill-Maroon` : `fill-Black`}>
							<g
								id="icons"
								transform="translate(56.000000, 160.000000)">
								<path d="M339.875,578.013 L336.6875,578.013 L336.6875,574.013 L330.3125,574.013 L330.3125,578.013 L327.125,578.013 L327.125,568.799 L333.369375,562.809 L339.875,568.819 L339.875,578.013 Z M341.94475,568.013 L333.47025,560 L325,567.999 L325,580.013 L332.4375,580.013 L332.4375,576.013 L334.5625,576.013 L334.5625,580.013 L342,580.013 L342,579.983 L342,568.013 L341.94475,568.013 Z"></path>
							</g>
						</g>
					</g>
				</svg>
			</Link>
		</div>
	);
};

export default Home;
