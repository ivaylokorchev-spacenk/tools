import Link from "next/link";

export default function Home() {
  return (
    <main className="p-12">
      <h1 className="text-4xl text-center mt-5">
        SpaceNK Tools
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 container max-w-md mt-5 mx-auto">
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
        <Link href="/category-footer" className="bg-gray-700 p-5 text-center text-white hover:bg-gray-800">Category Footer Builder</Link>
      </div>
    </main>
  );
}
