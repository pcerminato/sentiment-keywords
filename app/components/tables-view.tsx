"use client"
import { useRouter } from 'next/navigation';
import { ResponseData, Lists, MapLists, ErrorMessage } from "@/app/types";
import WordsTable from "./words-table";
import { useState } from "react";
import { flatFormatLists } from "../edit-file/utils";

export function TablesView({ lists, error }: { lists: Lists, error?: ErrorMessage<Lists> }) {
  const [AILists, setAILists] = useState<Lists>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAICall = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/ai`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({ lists: { ...lists } }),
        headers: {
          "Content-type": "application/json"
        }
      });
      const data: ResponseData<MapLists> = await res.json();
      if (res.ok && data.count === 1) {
        const ml: MapLists = data.results[0];
        setAILists(flatFormatLists(ml))
      } else if (res.status === 401) {
        router.push("/login?error=refresh");
      } else {
        error = { message: data.message || "error" }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return <>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:py-4">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit original</button>
      <button
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-2 px-4 rounded disabled"
        onClick={handleAICall}
        disabled={loading}
      >{loading ? "Loading..." : "Improve with AI"}</button>
    </div>
    {error ? (<p>Error message: {error.message}</p>) : null}
    <div className="flex flex-col gap-2 flex-row sm:gap-4 sm:items-start">
      <WordsTable
        accepted={lists.accepted}
        denied={lists.denied}
        caption="original"
      />
      {AILists ? (
        <WordsTable
          accepted={AILists.accepted}
          denied={AILists.denied}
          caption="AI enriched"
        />) : null}
    </div>
  </>
}