import Link from "next/link";
import { cookies } from "next/headers";
import FilesList from "./components/files-list";
import Layout from "./components/layout";

export default async function Home() {
  let data = { results: [] }

  try {

    const reqCookies = await cookies();

    const jwt = reqCookies.get("jwt-credential")?.value;

    const res = await fetch("http://localhost:8080/sentiment-list", {
      headers: {
        "authorization": `Bearer ${jwt}`
      }
    });
    data = (res.ok) ? await res.json() : [];
  } catch (e) {
    console.error(e)
  }



  return <Layout title="Sentiment advertisement words list">
    <>
      <Link href="/edit-file" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">Create</Link>
      <FilesList filesList={data.results} />
    </>
  </Layout>;
}

