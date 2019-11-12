import axios from "axios";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "http://3.95.225.208:3000/get/brain/";

export const getData = async () => {
  return await axios.get(proxyUrl + url + "all", { crossdomain: true });
};

export const getAge = async () => {
  return await axios.get(proxyUrl + url + "age", { crossdomain: true });
};

export const getGender = async () => {
  return await axios.get(proxyUrl + url + "gender", { crossdomain: true });
};
