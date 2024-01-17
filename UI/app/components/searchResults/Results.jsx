'use client'
import React from "react";
import { useItemContext } from "@/app/contexts/ItemContext";



const Results = () => {
	const { itemData, isLoading } = useItemContext();

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (itemData) {
    return (
      <div>
        <h2>Welcome to the Results Page!!</h2>
        {/* Render your itemData here */}
      </div>
    );
  }

  // Handle the case when itemData is null (optional)
  return <h2>No data available</h2>;
  
};

export default Results;
