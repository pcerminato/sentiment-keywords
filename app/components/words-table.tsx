import { parseHTML } from "../edit-file/utils";

export default function WordsTable({ accepted = [], denied = [], caption }: { accepted: string[], denied: string[], caption?: string }) {
  const maxLen = Math.max(accepted.length, denied.length);
  let i = 0;
  let trs = [];

  while (i < maxLen) {
    trs.push(<tr key={accepted[i] + denied[i]}>
      <td className="px-4 py-2 text-gray-700">{parseHTML(accepted[i]) ?? ""}</td>
      <td className="px-4 py-2 text-gray-700">{parseHTML(denied[i]) ?? ""}</td>
    </tr>);
    i++
  }

  if (!trs.length) {
    return null;
  }

  return <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
      {caption ? (
        <caption className="caption-top">{caption}</caption>
      ) : null}
      <thead className="bg-gray-50">
        <tr className="hover:bg-gray-50">
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-lef">Accepted</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-lef">Denied</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {trs}
      </tbody>
    </table>
  </div>
}