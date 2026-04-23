import Link from "next/link"

type FilesListType = {
  name: string,
  id: string,
}

export default function FilesList({ filesList }: { filesList: FilesListType[] }) {
  if (filesList?.length === 0) {
    return <div className="flex items-center justify-center w-full">
      <Link href="/edit-file" className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 hover:underline">Start adding files</Link>
    </div>
  }

  return <div className="flex flex-col w-full border-x-1 border-t-1 border-zinc-200 rounded-sm shadow-md">
    {filesList?.map((f) =>
      <div key={f.id} className="flex flex-1 items-center bg-white border-b-1 border-zinc-200">
        <Link href={`/edit-file/${f.id}`} className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 hover:ring hover:ring-zinc-400 w-full h-full py-4 px-8">
          {f.name}
        </Link>
      </div>
    )}
  </div>
}