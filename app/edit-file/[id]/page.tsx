import { redirect } from "next/navigation";

import Layout from "@/app/components/layout";
import { getJwtToken } from "@/app/utils";
import { Result, ResponseData } from "@/app/types";
import { TablesView } from "@/app/components/tables-view";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  let result = {} as Result;
  let error;
  try {
    const jwt = await getJwtToken();
    if (jwt) {
      const { id } = await params;
      const res = await fetch(`http://localhost:8080/sentiment-list/${id}`, {
        credentials: 'include',
        headers: {
          "Cookie": `jwt-credential=${jwt}`
        },
      });
      const data: ResponseData<Result> = await res.json();
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
    <TablesView lists={result.lists} error={error} />
  </Layout >;
}

