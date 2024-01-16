import axios from "axios";

const apiBaseURL = "https://localhost:5237";
const getItemURI = "/OSRSGe/GetItems";

const fetchItem = (search) => {
  const category = search.category;
  const alpha = search.item.slice(0, 1);
  const page = search.page;

  const requestData = {
    category: category,
    alpha: alpha,
    page: page,
  };

  return axios
    .post(`${apiBaseURL}${getItemURI}`, requestData, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
			// return an array of objects
			/*
			[
				{
					
				},
			]
			*/
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default fetchItem;
