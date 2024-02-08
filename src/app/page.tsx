import Link from "next/link";

export default function Home() {
  return (
    <main className="p-12">
      <h1 className="text-4xl text-center mt-5">
        Tools
      </h1>
      <div className="grid grid-cols-1  gap-5 container max-w-md mt-5 mx-auto place-items-center">
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800 w-full h-full">Category Footer Builder</Link>
      </div>
    </main>
  );
}
