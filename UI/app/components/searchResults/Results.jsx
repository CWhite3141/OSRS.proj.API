import React from "react";
import { ItemProvider } from "@/app/contexts/ItemContext";

const Results = () => {
	const itemData = ItemProvider; // Destructure itemData from the context
  console.log(itemData)
};

export default Results;
