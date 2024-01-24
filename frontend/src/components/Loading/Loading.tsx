"use client";
import React from "react";

const Loading = () => {
	return (
		<div className="relative mx-auto mt-20" style={{width: "200px", height: "200px"}}>
			<svg
				className="circular-loader"
				viewBox="25 25 50 50">
				<circle
					className="loader-path stroke-Maroon"
					cx="50"
					cy="50"
					r="20"
					fill="none"
					stroke-width="2"
				/>
			</svg>
		</div>
	);
};

export default Loading;
