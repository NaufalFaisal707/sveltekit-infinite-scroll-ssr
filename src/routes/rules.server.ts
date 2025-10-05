const QUERY_LIMIT = 25;

export const base_url = "https://dummyjson.com";

export const fetchParams = new URLSearchParams();
fetchParams.append("limit", QUERY_LIMIT.toString());
fetchParams.append("select", "firstName,lastName,email,image,address,company");
