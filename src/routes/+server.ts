import { parseSkip } from "$lib/index.js";
import { json } from "@sveltejs/kit";
import { base_url, fetchParams } from "./rules.server.js";

export const GET = async (event) => {
  const skip = parseSkip(event.url.searchParams.get("skip"));
  fetchParams.set("skip", skip.toString());

  const result = await fetch(base_url + `/users?${fetchParams.toString()}`);

  if (result.status !== 200) {
    return json({});
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const jsonResult = await result.json();

  return json(jsonResult);
};
