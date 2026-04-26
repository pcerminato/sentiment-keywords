import Link from "next/link";
import FilesList from "./components/files-list";
import Layout from "./components/layout";
import { getJwtToken } from "./utils";
import { redirect } from "next/navigation";

export default async function Home() {
  let data = { results: [] }

  try {
    const jwt = await getJwtToken();
    if (jwt) {
      const res = await fetch("http://localhost:8080/sentiment-list", {
        headers: {
          "Cookie": `jwt-credential=${jwt}`
        },
      });
      data = (res.ok) ? await res.json() : [];
    } else {
      redirect("/login");
    }
  } catch (e) {
    console.error(e);
    redirect("/login");
  }



  return <Layout title="Sentiment advertisement words list">
    <>
      <Link href="/edit-file" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">Create</Link>
      <FilesList filesList={data.results} />
    </>
  </Layout>;
}

