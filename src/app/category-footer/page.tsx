import CategoryFooterBuilder from "@/components/CategoryFooterBuilder/CategoryFooterBuilder";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-white">
        <Toaster />
        <CategoryFooterBuilder />      
    </main>
  );
}
