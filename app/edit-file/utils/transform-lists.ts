import { Lists, MapLists } from "@/app/types";

// utility used only by flatFormatLists()
const transform = (l: Lists) =>
  Object.keys(l).flatMap((k) => [`<em>${k}</em>`, ...l[k]]);

/* Transforms the lists.
* The server response is MapLists. This function transforms/formats
* the data into a data structure that the UI can read.
* Notice that the function has the flexibility to transform any key,
* beyond accepted/denied.
*/
export const flatFormatLists = ({ lists }: MapLists): Lists =>
  Object.keys(lists).reduce((res, k) => ({
    [k]: transform(lists[k]),
    ...res,
  }), {});
