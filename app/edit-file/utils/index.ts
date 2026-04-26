import { Lists, MapList, MapLists } from "@/app/types";

export function flatFormatLists({ lists }: MapLists): Lists {
  const transform = (l: MapList) =>
    Object.keys(l).flatMap((k) => [`<em>${k}</em>`, ...l[k]]);

  return {
    accepted: transform(lists.accepted),
    denied: transform(lists.denied),
  };
}

export { parseHTML } from "./parse-html";
