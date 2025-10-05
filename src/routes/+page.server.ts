import { base_url, fetchParams } from "./rules.server.js";

export const load = async () => {
  fetchParams.set("skip", "0");
  const result = await fetch(base_url + `/users?${fetchParams.toString()}`);

  if (result.status !== 200) {
    return {};
  }

  const jsonResult = await result.json();

  return jsonResult;
};
