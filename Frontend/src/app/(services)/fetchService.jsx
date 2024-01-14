import axios from "axios";

export async function fetchItemData(itemID) {
  
  const itemURI = `https://services.runescape.com/m=itemdb_rs/api/graph/${itemID}.json`;

    try {
      const response = await axios.get(itemURI);
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      throw error;
    }
  }
