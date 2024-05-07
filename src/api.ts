import { API_URL } from "./constants";

export const fetchData = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
