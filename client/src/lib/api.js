import axios from "axios";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://yts.am/api/v2/list_movies.json";
export const getData = async () => {
  return await axios.get(proxyUrl + url, { crossdomain: true });
};
