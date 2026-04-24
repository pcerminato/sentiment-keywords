import { redirect } from "next/navigation";
import WordsTable from "@/app/components/words-table";
import Layout from "@/app/components/layout";
import { getJwtToken } from "@/app/utils";
import { Result, ResponseData } from "@/app/types";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  let result = {} as Result;
  let error;
  try {
    const jwt = await getJwtToken();
    if (jwt) {
      const { id } = await params;
      const res = await fetch(`http://localhost:8080/sentiment-list/${id}`, {
        headers: {
          "authorization": `Bearer ${jwt}`
        }
      });
      const data: ResponseData = await res.json();
      if (res.ok && data.count === 1) {
        result = data.results[0]
      } else {
        error = { message: data.message || "error" }
      }
    } else {
      redirect("/login");
    }
  } catch (e) {
    console.error(e);
    redirect("/login");
  }

  return <Layout title="Edit a List">
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:py-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit original</button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Improve with AI</button>
      </div>
      {error ? (<p>Error message: {error.message}</p>) : null}
      <WordsTable
        accepted={result.lists.accepted}
        denied={result.lists.denied}
        caption="original"
      />
    </>
  </Layout >;
}

