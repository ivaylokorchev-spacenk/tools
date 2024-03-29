import CategoryFooterBuilder from "@/components/CategoryFooterBuilder/CategoryFooterBuilder";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Tools - Category Footer Builder",
  description: "Category Footer Builder",
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between px-24 py-10 bg-white">
        <Toaster />
        <CategoryFooterBuilder />      
    </main>
  );
}
