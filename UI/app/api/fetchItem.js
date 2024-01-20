import axios from "axios";

const apiBaseURL = "https://localhost:5237";
const getItemURI = "/OSRSGe/GetItems";

export const fetchItem = (itemQuery) => {

  return axios
    .post(`${apiBaseURL}${getItemURI}`, itemQuery, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      
      console.log(`Success: fetchItem() returns: ${response.data}`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error: fetchItem() returns: ${error}`);
      throw error;
    });
};

