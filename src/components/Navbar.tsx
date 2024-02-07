import Link from "next/link"

type Props = {}

const Navbar = () => {
  return (
    <nav className="flex mx-auto gap-x-5 px-24 py-3 border-b">
        <Link className="bg-black text-white hover:text-gray-300 p-2 text-md rounded-sm" href="/">Home</Link>
        <Link className="bg-black text-white hover:text-gray-300 p-2 text-md rounded-sm" href="/category-footer">Category Footer builder</Link>
    </nav>
  )
}

export default Navbar